import httpx
from app.models.post import Post
from typing import List

JSONPLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/posts"

async def fetch_posts() -> List[Post]:
    async with httpx.AsyncClient() as client:
        response = await client.get(JSONPLACEHOLDER_URL)
        response.raise_for_status()
        posts_data = response.json()
        return [Post(**post) for post in posts_data]
