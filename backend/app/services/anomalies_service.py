from app.services.posts_service import fetch_posts
from app.models.anomaly import Anomaly
from collections import defaultdict, Counter
from typing import List, Optional
import difflib

TITLE_LENGTH_THRESHOLD = 15
SIMILARITY_THRESHOLD = 0.8
REASON_SHORT_TITLE = "Title shorter than 15 characters"
REASON_DUPLICATE_TITLE = "Duplicate title by same user"
REASON_SIMILAR_TITLES = "User has >5 similar titles"

async def find_anomalies(userId: Optional[int] = None) -> List[Anomaly]:
    posts = await fetch_posts()
    if userId is not None:
        posts = [p for p in posts if p.userId == userId]

    if not posts:
        return []

    anomalies = []
    user_titles = defaultdict(list)
    for post in posts:
        user_titles[post.userId].append(post.title)

    # Find duplicate titles by user
    duplicate_titles = {
        uid: [t for t, c in Counter(titles).items() if c > 1]
        for uid, titles in user_titles.items()
    }

    # Find users with >5 similar titles
    users_with_similar = set()
    for uid, titles in user_titles.items():
        similar_count = 0
        n = len(titles)
        for i in range(n):
            for j in range(i + 1, n):
                if difflib.SequenceMatcher(None, titles[i], titles[j]).ratio() > SIMILARITY_THRESHOLD:
                    similar_count += 1
        if similar_count > 5:
            users_with_similar.add(uid)

    for post in posts:
        reasons = []
        if len(post.title) < TITLE_LENGTH_THRESHOLD:
            reasons.append(REASON_SHORT_TITLE)
        if post.title in duplicate_titles[post.userId]:
            reasons.append(REASON_DUPLICATE_TITLE)
        if post.userId in users_with_similar:
            reasons.append(REASON_SIMILAR_TITLES)
        if reasons:
            anomalies.append(Anomaly(userId=post.userId, id=post.id, title=post.title, reasons=reasons))
    return anomalies
