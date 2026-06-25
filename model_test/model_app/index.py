from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ModelController import router as tips_router
from IrisController import router as iris_router

app = FastAPI()

origins = [
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True 
)

app.include_router(tips_router)
app.include_router(iris_router)