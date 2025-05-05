from app.services.posts_service import fetch_posts
from app.models.summary import SummaryResponse, UserSummary
from collections import Counter, defaultdict
from typing import List
import re

WORD_RE = re.compile(r"\b\w+\b")

async def get_summary() -> SummaryResponse:
    # Fetch all posts
    posts = await fetch_posts()

    # Map each userId to their unique word set and collect all words
    user_word_set: dict[int, set[str]] = defaultdict(set)
    all_words: List[str] = []

    for post in posts:
        # Extract normalized words from title
        words = [w.lower() for w in WORD_RE.findall(post.title)]
        user_word_set[post.userId].update(words)
        all_words.extend(words)

    # Build summaries per user
    user_summaries: List[UserSummary] = []
    for uid, words in user_word_set.items():
        user_summaries.append(
            UserSummary(
                userId=uid,
                unique_word_count=len(words),
                unique_words=sorted(words),
            )
        )

    # Sort and select top 3 users
    user_summaries.sort(key=lambda x: x.unique_word_count, reverse=True)
    top_users = user_summaries[:3]

    # Compute most frequent words across all titles
    word_counts = Counter(all_words)
    common_words = [word for word, _ in word_counts.most_common()]

    return SummaryResponse(
        top_users=top_users,
        common_words=common_words  
    )
