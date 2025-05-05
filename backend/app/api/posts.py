from fastapi import APIRouter, HTTPException
from app.services.posts_service import fetch_posts
from app.models.post import Post
from typing import List

router = APIRouter(prefix="/posts", tags=["posts"])

@router.get("/", response_model=List[Post])
async def get_posts():
    try:
        return await fetch_posts()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
