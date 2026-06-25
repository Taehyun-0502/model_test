from fastapi import APIRouter
from ModelController import router as tips_router
from IrisController import router as iris_router

# Combine routers for backward compatibility or direct imports
router = APIRouter()
router.include_router(tips_router)
router.include_router(iris_router)
