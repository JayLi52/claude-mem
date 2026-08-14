// SPDX-License-Identifier: Apache-2.0

import { logger } from '../../utils/logger.js';
import type { SessionStore } from '../sqlite/SessionStore.js';
import type { RecallSource } from '../sqlite/types.js';

interface PendingRecall {
  count: number;
  source: RecallSource;
  atEpoch: number;
}

/**
 * Batches device-local recall statistics writes. Recall sites (search,
 * injection, detail fetch) call record() on every surfaced observation;
 * entries accumulate in memory and flush to SQLite after a trailing debounce,
 * so a burst of searches becomes one transaction instead of N updates.
 *
 * Best-effort by design: record() never throws into the caller's read path,
 * and flush failures are logged and dropped rather than retried — recall
 * counts are pruning heuristics, not source-of-truth content.
 */
export class RecallTracker {
  private pending = new Map<number, PendingRecall>();
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private stopped = false;

  constructor(
    private readonly getStore: () => SessionStore | null,
    private readonly debounceMs = 1500
  ) {}

  /** Record that the given observations were surfaced to an agent. */
  record(ids: Array<number | null | undefined>, source: RecallSource): void {
    try {
      if (this.stopped || ids.length === 0) return;
      const now = Date.now();
      let added = false;
      for (const id of ids) {
        if (typeof id !== 'number' || !Number.isFinite(id)) continue;
        const existing = this.pending.get(id);
        if (existing) {
          existing.count += 1;
          existing.source = source; // latest surface wins
          existing.atEpoch = now;
        } else {
          this.pending.set(id, { count: 1, source, atEpoch: now });
        }
        added = true;
      }
      if (added) this.scheduleFlush();
    } catch (error) {
      // record() is called from read paths — swallow everything.
      try {
        logger.debug('RECALL', 'record() failed (non-blocking)', {}, error instanceof Error ? error : new Error(String(error)));
      } catch { /* logging must never propagate into a read path */ }
    }
  }

  private scheduleFlush(): void {
    try {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      const timer = setTimeout(() => {
        this.debounceTimer = null;
        this.flush();
      }, this.debounceMs);
      (timer as { unref?: () => void }).unref?.();
      this.debounceTimer = timer;
    } catch { /* swallow — see record() */ }
  }

  /** Flush accumulated counts to SQLite. Never throws. */
  flush(): void {
    if (this.pending.size === 0) return;
    const store = this.getStore();
    if (!store) return; // store not ready — keep pending for the next flush
    const recalls = Array.from(this.pending.entries()).map(([id, r]) => ({
      id,
      count: r.count,
      source: r.source as string,
      atEpoch: r.atEpoch,
    }));
    this.pending.clear();
    try {
      const updated = store.recordObservationRecalls(recalls);
      logger.debug('RECALL', 'Flushed recall stats', { entries: recalls.length, updated });
    } catch (error) {
      try {
        logger.error('RECALL', 'Recall stats flush failed (dropped)', { entries: recalls.length }, error instanceof Error ? error : new Error(String(error)));
      } catch { /* swallow */ }
    }
  }

  /** Stop accepting records and flush whatever is pending. */
  stop(): void {
    this.stopped = true;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    this.flush();
  }
}
