from pydantic import BaseModel
from typing import List, Dict

class UserSummary(BaseModel):
    userId: int
    unique_word_count: int
    unique_words: List[str]

class SummaryResponse(BaseModel):
    top_users: List[UserSummary]
    common_words: List[str]
