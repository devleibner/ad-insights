export interface Anomaly {
  userId: number;
  id: number;
  title: string;
  reasons: string[];
}

export async function fetchAnomalies(userId?: number): Promise<Anomaly[]> {
  const url = userId ? `/anomalies?userId=${userId}` : '/anomalies';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch anomalies');
  return res.json();
}
