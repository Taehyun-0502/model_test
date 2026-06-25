# pyrefly: ignore [missing-import]
import joblib
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
from tensorflow.keras import layers, models
import pandas as pd
# pyrefly: ignore [missing-import]
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
    
    
# app = FastAPI()

# class PredictRequest(BaseModel):
#     text: str

# class PredictResponse(BaseModel):
#     result:str
#     score:float

# @app.post("/api2/tips",response_model = PredictResponse)
# def predict(req: PredictRequest):
#     return PredictResponse(
#         result = f"분석결과 : {req.text}",
#         score=0.92
#     )

# def m1():
#     print('test')
#     model = tf.keras.models.load_model("./model/tips_dnn_model.keras")
#     print("model 등록")
#     scaler = joblib.load("./model/scaler.pkl")
#     encoded_columns = joblib.load("./model/encoded_columns.pkl")
    

#     virtual_data = pd.DataFrame({
#     'total_bill': [25.0, 18.5, 42.0],
#     'sex': ['Female', 'Male', 'Female'],
#     'smoker': ['No', 'Yes', 'No'],
#     'day': ['Sat', 'Thur', 'Sun'],
#     'time': ['Dinner', 'Lunch', 'Dinner'],
#     'size': [2, 3, 4]
#     })
#     virtual_data_encoded = pd.get_dummies(virtual_data)
#     virtual_data_encoded = virtual_data_encoded.reindex(columns=encoded_columns, fill_value=0)
#     # 2. 가져온 인코딩 컬럼 리스트(encoded_columns) 기준으로 컬럼 순서를 정렬하고,
#     # virtual_data에 없는 누락된 컬럼은 0으로 채워줍니다.

#     data = scaler.transform(virtual_data_encoded)
#     print(data[:5])

    




m1()