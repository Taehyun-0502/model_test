from fastapi import APIRouter
from pydantic import BaseModel
import IrisService

router = APIRouter(
    tags=["iris model"]
)

class IrisRequest(BaseModel):
    sepal_length: float
    sepal_width: float
    petal_length: float
    petal_width: float

@router.post("/api2/iris")
def iris(req: IrisRequest): 
    print("받은 데이터:", req)
    try:
        predicted_species = IrisService.predict(req.model_dump())
        return {
            "message": "success",
            "predicted_species": predicted_species
        }
    except Exception as e:
        print(f"예측 과정 중 에러 발생: {e}")
        return {
            "message": "error",
            "error": str(e)
        }
