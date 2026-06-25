import os
import joblib
import pandas as pd
import tensorflow as tf 
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model", "tips_dnn_model.keras")
SCALER_PATH = os.path.join(BASE_DIR, "model", "scaler.pkl")
ENCODED_COLS_PATH = os.path.join(BASE_DIR, "model", "encoded_columns.pkl")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("ModelService: 모델 로드 완료")

    scaler = joblib.load(SCALER_PATH)
    print("ModelService: 스케일러 로드 완료")

    encoded_columns = joblib.load(ENCODED_COLS_PATH)
    print("ModelService: 인코딩 컬럼 리스트 로드 완료")
except Exception as e:
    print(f"ModelService: 로드 중 오류 발생: {e}")
    model, scaler, encoded_columns = None, None, None

def predict(data: dict):
    if model is None or scaler is None or encoded_columns is None:
        raise ValueError("모델 또는 전처리가 실패 했습니다")

    input_df = pd.DataFrame([{
        'total_bill': float(data.get('total_bill', 0.0)),
        'sex': data.get('sex', 'Male'),
        'smoker': 'Yes' if data.get('smoker') is True or data.get('smoker') == 'true' or data.get('smoker') == 'Yes' else 'No',
        'day': data.get('day', 'Sun'),
        'time': data.get('time', 'Dinner'),
        'size': int(data.get('size', 2))
    }])

    input_encoded = pd.get_dummies(input_df)
    input_encoded = input_encoded.reindex(columns=encoded_columns, fill_value=0)
    input_scaled = scaler.transform(input_encoded)

    prediction = model.predict(input_scaled)
    predicted_tip = float(prediction[0][0])
    
    print("예측된 팁:", predicted_tip)
    return predicted_tip
