import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { SessionStore } from '../../src/services/sqlite/SessionStore.js';
import { RecallTracker } from '../../src/services/worker/RecallTracker.js';

function obs(overrides: Partial<Parameters<SessionStore['storeObservation']>[2]> = {}) {
  return {
    type: 'discovery',
    title: 'Test Observation',
    subtitle: 'Test Subtitle',
    facts: ['fact1'],
    narrative: 'Test narrative content',
    concepts: ['concept1'],
    files_read: [],
    files_modified: [],
    ...overrides,
  };
}

describe('SessionStore recall stats', () => {
  let store: SessionStore;

  beforeEach(() => {
    store = new SessionStore(':memory:');
  });

  afterEach(() => {
    store.close();
  });

  // observations.memory_session_id is an enforced FK to sdk_sessions.
  function session(memorySessionId: string): string {
    const id = store.createSDKSession(`content-${memorySessionId}`, 'project', 'prompt');
    store.updateMemorySessionId(id, memorySessionId);
    return memorySessionId;
  }

  function insertObservation(title: string): number {
    const mem = session(`mem-${title}`);
    return store.storeObservation(mem, 'project', obs({ title, narrative: `narrative ${title}` }), 1, 0, Date.now()).id;
  }

  describe('schema migration', () => {
    it('adds recall stats columns on a fresh database', () => {
      const cols = store.db.query('PRAGMA table_info(observations)').all() as Array<{ name: string }>;
      const names = cols.map(c => c.name);
      expect(names).toContain('recall_count');
      expect(names).toContain('last_recalled_at_epoch');
      expect(names).toContain('last_recall_source');
    });

    it('records schema version 50', () => {
      const row = store.db.prepare('SELECT version FROM schema_versions WHERE version = 50').get();
      expect(row).toBeTruthy();
    });

    it('is idempotent across re-instantiation on the same database file', () => {
      // Re-running the constructor against an already-migrated store must not
      // throw or duplicate columns.
      expect(() => {
        // @ts-expect-error — invoking the private migration directly for the test.
        store.addObservationRecallStatsColumns();
      }).not.toThrow();
      const cols = store.db.query('PRAGMA table_info(observations)').all() as Array<{ name: string }>;
      const recallCols = cols.filter(c => c.name === 'recall_count');
      expect(recallCols.length).toBe(1);
    });

    it('defaults recall_count to 0 for pre-existing rows', () => {
      const id = insertObservation('fresh');
      const row = store.db.prepare('SELECT recall_count, last_recalled_at_epoch, last_recall_source FROM observations WHERE id = ?').get(id) as {
        recall_count: number | null;
        last_recalled_at_epoch: number | null;
        last_recall_source: string | null;
      };
      expect(row.recall_count).toBe(0);
      expect(row.last_recalled_at_epoch).toBeNull();
      expect(row.last_recall_source).toBeNull();
    });
  });

  describe('recordObservationRecalls', () => {
    it('increments recall_count and stamps source/timestamp', () => {
      const id = insertObservation('recalled');
      const atEpoch = Date.now();

      const updated = store.recordObservationRecalls([{ id, count: 1, source: 'search', atEpoch }]);

      expect(updated).toBe(1);
      const row = store.db.prepare('SELECT recall_count, last_recalled_at_epoch, last_recall_source FROM observations WHERE id = ?').get(id) as {
        recall_count: number;
        last_recalled_at_epoch: number;
        last_recall_source: string;
      };
      expect(row.recall_count).toBe(1);
      expect(row.last_recalled_at_epoch).toBe(atEpoch);
      expect(row.last_recall_source).toBe('search');
    });

    it('accumulates counts across multiple calls and keeps the latest source', () => {
      const id = insertObservation('multi');

      store.recordObservationRecalls([{ id, count: 2, source: 'search', atEpoch: 1000 }]);
      store.recordObservationRecalls([{ id, count: 3, source: 'detail', atEpoch: 2000 }]);

      const row = store.db.prepare('SELECT recall_count, last_recalled_at_epoch, last_recall_source FROM observations WHERE id = ?').get(id) as {
        recall_count: number;
        last_recalled_at_epoch: number;
        last_recall_source: string;
      };
      expect(row.recall_count).toBe(5);
      expect(row.last_recalled_at_epoch).toBe(2000);
      expect(row.last_recall_source).toBe('detail');
    });

    it('silently skips unknown ids and non-positive counts', () => {
      const id = insertObservation('known');
      const updated = store.recordObservationRecalls([
        { id, count: 1, source: 'search', atEpoch: Date.now() },
        { id: 999999, count: 1, source: 'search', atEpoch: Date.now() },
        { id, count: 0, source: 'search', atEpoch: Date.now() },
      ]);
      expect(updated).toBe(1);
    });

    it('returns 0 for an empty batch', () => {
      expect(store.recordObservationRecalls([])).toBe(0);
    });
  });

  describe('sync isolation', () => {
    it('does not touch synced_at or sync_rev when recording recalls', () => {
      const id = insertObservation('synced');
      // Simulate an already-synced canonical row.
      store.db.prepare('UPDATE observations SET synced_at = ?, sync_rev = ? WHERE id = ?')
        .run('2026-01-01T00:00:00.000Z', '1', id);

      store.recordObservationRecalls([{ id, count: 4, source: 'search', atEpoch: Date.now() }]);

      const row = store.db.prepare('SELECT synced_at, sync_rev, recall_count FROM observations WHERE id = ?').get(id) as {
        synced_at: string | null;
        sync_rev: string | null;
        recall_count: number;
      };
      expect(row.synced_at).toBe('2026-01-01T00:00:00.000Z');
      expect(row.sync_rev).toBe('1');
      expect(row.recall_count).toBe(4);
    });
  });
});

describe('RecallTracker', () => {
  let store: SessionStore;
  let tracker: RecallTracker;

  beforeEach(() => {
    store = new SessionStore(':memory:');
    tracker = new RecallTracker(() => store, 10);
  });

  afterEach(() => {
    tracker.stop();
    store.close();
  });

  function insertObservation(title: string): number {
    const sdkId = store.createSDKSession(`content-${title}`, 'project', 'prompt');
    store.updateMemorySessionId(sdkId, `mem-${title}`);
    return store.storeObservation(`mem-${title}`, 'project', obs({ title, narrative: `narrative ${title}` }), 1, 0, Date.now()).id;
  }

  function recallCount(id: number): number {
    const row = store.db.prepare('SELECT recall_count FROM observations WHERE id = ?').get(id) as { recall_count: number };
    return row.recall_count;
  }

  it('coalesces a burst of records into one flush', async () => {
    const id = insertObservation('burst');

    tracker.record([id], 'search');
    tracker.record([id], 'search');
    tracker.record([id], 'detail');

    await new Promise(resolve => setTimeout(resolve, 40));

    expect(recallCount(id)).toBe(3);
    const row = store.db.prepare('SELECT last_recall_source FROM observations WHERE id = ?').get(id) as { last_recall_source: string };
    expect(row.last_recall_source).toBe('detail');
  });

  it('flush() writes pending counts synchronously', () => {
    const id = insertObservation('sync-flush');

    tracker.record([id], 'context_inject');
    tracker.record([id], 'context_inject');
    tracker.flush();

    expect(recallCount(id)).toBe(2);
    // A second flush with nothing pending is a no-op.
    tracker.flush();
    expect(recallCount(id)).toBe(2);
  });

  it('ignores invalid ids without throwing', () => {
    const id = insertObservation('valid');
    expect(() => tracker.record([id, null, undefined, NaN, Infinity], 'search')).not.toThrow();
    tracker.flush();
    expect(recallCount(id)).toBe(1);
  });

  it('drops records after stop() and flushes what was pending', () => {
    const id = insertObservation('stop');

    tracker.record([id], 'search');
    tracker.stop();
    expect(recallCount(id)).toBe(1);

    tracker.record([id], 'search');
    tracker.flush();
    expect(recallCount(id)).toBe(1);
  });
});
