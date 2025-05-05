from fastapi import APIRouter, HTTPException
from app.services.anomalies_service import find_anomalies
from app.models.anomaly import Anomaly
from typing import List, Optional

router = APIRouter(prefix="/anomalies", tags=["anomalies"])

@router.get("/", response_model=List[Anomaly])
async def get_anomalies(userId: Optional[int] = None):
    try:
        return await find_anomalies(userId=userId)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
