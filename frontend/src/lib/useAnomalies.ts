import { Anomaly, fetchAnomalies } from '@/api/anomalies';
import { useCallback, useEffect, useState } from 'react';

export interface UseAnomaliesOptions {
  userId?: number;
  sortKey?: keyof Anomaly;
  sortDirection?: 'asc' | 'desc';
}

export function useAnomalies(options: UseAnomaliesOptions = {}) {
  const { userId, sortKey = 'userId', sortDirection = 'asc' } = options;
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetchAnomalies(userId)
      .then(setAnomalies)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedAnomalies = [...anomalies].sort((a, b) => {
    if (!sortKey) return 0;
    if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return { anomalies: sortedAnomalies, loading, error, refetch: fetchData };
}
