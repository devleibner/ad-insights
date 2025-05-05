export interface UserSummary {
  userId: number;
  unique_word_count: number;
  unique_words: string[];
}

export interface SummaryResponse {
  top_users: UserSummary[];
  common_words: string[];
}

export async function fetchSummary(): Promise<SummaryResponse> {
  const res = await fetch('/summary');
  if (!res.ok) throw new Error('Failed to fetch summary');
  return res.json();
}
