from fastapi import APIRouter, HTTPException
from app.services.summary_service import get_summary
from app.models.summary import SummaryResponse

router = APIRouter(prefix="/summary", tags=["summary"])

@router.get("/", response_model=SummaryResponse)
async def summary():
    try:
        return await get_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
