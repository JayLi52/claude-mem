import React, { useEffect, useCallback } from 'react';
import { useRecallStats } from '../hooks/useRecallStats';
import { RecallStatsAgeBucket } from '../types';
import { formatDate } from '../utils/formatters';

interface RecallStatsViewProps {
  project: string;
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="stat-card" style={accent ? ({ '--stat-accent': accent } as React.CSSProperties) : undefined}>
      <div className="stat-value" style={accent ? { color: accent } : undefined}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

const SOURCE_LABELS: Record<string, string> = {
  search: 'Search',
  semantic_inject: 'Semantic',
  context_inject: 'Context',
  detail: 'Detail',
  timeline: 'Timeline',
};

const TYPE_COLORS: Record<string, string> = {
  feature: '#1a7f37',
  bugfix: '#cf222e',
  discovery: '#0969da',
  change: '#8250df',
  decision: '#bc4c00',
  refactor: '#0550ae',
  security_alert: '#cf222e',
  security_note: '#bf8700',
  sensitive: '#57606a',
  session_summary: '#9a6700',
};

function hexToRgba(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function Pill({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="recall-pill"
      style={{ color, background: hexToRgba(color, 0.1), borderColor: hexToRgba(color, 0.25) }}
    >
      {text}
    </span>
  );
}

function bucketTone(bucket: RecallStatsAgeBucket): { color: string; label: string } {
  if (bucket.total === 0) return { color: '#8b949e', label: 'empty' };
  const rate = (bucket.recalled / bucket.total) * 100;
  const recent = bucket.label === '≤7d' || bucket.label === '8-30d';
  if (rate >= 30) return { color: '#1a7f37', label: 'good' };
  if (recent) return rate >= 10 ? { color: '#bf8700', label: 'warn' } : { color: '#cf222e', label: 'bad' };
  return { color: '#8b949e', label: 'aged' };
}

export function RecallStatsView({ project }: RecallStatsViewProps) {
  const { data, isLoading, error, fetchStats } = useRecallStats();

  const refresh = useCallback(() => {
    fetchStats(project || undefined);
  }, [fetchStats, project]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading && !data) {
    return <div className="recall-stats-loading">Loading recall stats…</div>;
  }

  if (error) {
    return (
      <div className="recall-stats-error">
        <p>Failed to load recall stats: {error}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  if (!data) return null;

  const { summary, items, age_buckets } = data;
  const recallRate = summary.total > 0
    ? ((summary.recalled / summary.total) * 100).toFixed(1) + '%'
    : '0%';

  return (
    <div className="recall-stats-view">
      <div className="recall-stats-header">
        <h2>Recall Statistics</h2>
        <button className="recall-refresh-btn" onClick={refresh} disabled={isLoading}>
          {isLoading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      <div className="recall-stats-summary">
        <StatCard label="Total Memories" value={summary.total} />
        <StatCard label="Recalled" value={summary.recalled} accent="#0969da" />
        <StatCard label="Recall Rate" value={recallRate} accent="#1a7f37" />
        <StatCard label="Total Recalls" value={summary.total_recalls} />
        <StatCard label="Max Recalls" value={summary.max_recalls} accent="#bf8700" />
      </div>

      {age_buckets && age_buckets.length > 0 && (
        <div className="recall-age-panel">
          <div className="recall-age-panel-header">
            <h3>Utilization by memory age</h3>
            <span className="recall-age-panel-hint">
              Low on recent buckets → retrieval is missing good memories · Low on old buckets → prune candidates
            </span>
          </div>
          <div className="recall-age-rows">
            {age_buckets.map((bucket) => {
              const tone = bucketTone(bucket);
              const rate = bucket.total > 0 ? (bucket.recalled / bucket.total) * 100 : 0;
              return (
                <div key={bucket.label} className={`recall-age-row${bucket.total === 0 ? ' is-empty' : ''}`}>
                  <div className="recall-age-row-label">{bucket.label}</div>
                  <div className="recall-age-bar">
                    {bucket.total > 0 && (
                      <div
                        className="recall-age-bar-fill"
                        style={{ width: `${Math.min(rate, 100)}%`, background: tone.color }}
                      />
                    )}
                  </div>
                  <div className="recall-age-row-rate" style={{ color: tone.color }}>
                    {bucket.total > 0 ? rate.toFixed(1) + '%' : '—'}
                  </div>
                  <div className="recall-age-row-detail">
                    {bucket.total > 0
                      ? `${bucket.recalled} / ${bucket.total} recalled · ${bucket.total_recalls} recalls`
                      : 'no memories'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="recall-stats-empty">
          <p>No recall data yet. Trigger some searches or context injections to start collecting stats.</p>
        </div>
      ) : (
        <div className="recall-stats-table-wrap">
          <table className="recall-stats-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Project</th>
                <th>Type</th>
                <th>Recalls</th>
                <th>Last Source</th>
                <th>Last Recalled</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="col-id">{item.id}</td>
                  <td className="col-title">{item.title || '(untitled)'}</td>
                  <td className="col-project">{item.project}</td>
                  <td className="col-type">
                    <Pill text={item.type} color={TYPE_COLORS[item.type] || '#57606a'} />
                  </td>
                  <td className="col-count">
                    <span className="recall-count-badge">{item.recall_count}</span>
                  </td>
                  <td className="col-source">
                    {item.last_recall_source ? (SOURCE_LABELS[item.last_recall_source] || item.last_recall_source) : '—'}
                  </td>
                  <td className="col-date">
                    {item.last_recalled_at_epoch
                      ? formatDate(item.last_recalled_at_epoch)
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
