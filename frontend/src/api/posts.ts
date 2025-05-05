export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('/posts');
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}
