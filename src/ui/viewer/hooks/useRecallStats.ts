import { useState, useCallback } from 'react';
import { RecallStatsResponse } from '../types';
import { API_ENDPOINTS } from '../constants/api';

export function useRecallStats() {
  const [data, setData] = useState<RecallStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (project?: string) => {
    setIsLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (project) params.append('project', project);

    try {
      const response = await fetch(`${API_ENDPOINTS.RECALL_STATS}?${params}`);
      if (!response.ok) throw new Error(`Failed: ${response.statusText}`);
      const result = await response.json() as RecallStatsResponse;
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchStats };
}
