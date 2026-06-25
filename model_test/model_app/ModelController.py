from fastapi import APIRouter
from pydantic import BaseModel
import ModelService

router = APIRouter(
    tags=["tips model"]
)

class TipsRequest(BaseModel):
    total_bill: float
    sex: str
    smoker: bool
    day: str
    time: str
    size: int

@router.post("/api2/tips")
def tips(req: TipsRequest):
    print("받은 데이터:", req)
    try:
        predicted_tip = ModelService.predict(req.model_dump())
        return {
            "message": "success",
            "predicted_tip": predicted_tip
        }
    except Exception as e:
        print(f"예측 과정 중 에러 발생: {e}")
        return {
            "message": "error",
            "error": str(e)
        }
