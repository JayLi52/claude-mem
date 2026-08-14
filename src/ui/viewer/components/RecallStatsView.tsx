import React, { useEffect, useCallback } from 'react';
import { useRecallStats } from '../hooks/useRecallStats';
import { formatDate } from '../utils/formatters';

interface RecallStatsViewProps {
  project: string;
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="stat-card">
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

  const { summary, items } = data;
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
                  <td className="col-type">{item.type}</td>
                  <td className="col-count">{item.recall_count}</td>
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
