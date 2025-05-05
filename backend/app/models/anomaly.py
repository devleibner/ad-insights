from pydantic import BaseModel
from typing import List

class Anomaly(BaseModel):
    userId: int
    id: int
    title: str
    reasons: List[str]
