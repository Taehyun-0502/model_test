import os
import joblib
import pandas as pd
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR,"model","iris_model.keras")

SCALER_PATH = os.path.join(BASE_DIR,"model","scaler_iris.joblib")

ENCODED_PATH = os.path.join(BASE_DIR,"model","iris_classes.joblib")

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    # 붓꽃 품종 이름(예: ['setosa', 'versicolor', 'virginica'])이 들어있는 리스트입니다.
    iris_classes = joblib.load(ENCODED_PATH) 
    print("IrisService: 모든 파일 로드 완료")
except Exception as e:
    print(f"IrisService: 로드 중 오류 발생: {e}")
    model, scaler, iris_classes = None, None, None
def predict(data : dict):
    if model is None or scaler is None or iris_classes is None:
        raise ValueError("모델 또는 전처리기가 정상적으로 로드되지 않았습니다.")
    input_df = pd.DataFrame([data])
    
    # 2. 스케일링 수행 (숫자로 된 표 데이터를 정규화)
    input_scaled = scaler.transform(input_df)
    # 3. 모델에 대입하여 품종별 확률 분포 예측
    prediction = model.predict(input_scaled)
    # 4. 가장 확률이 높은 품종의 인덱스 번호 추출
    import numpy as np
    predicted_idx = np.argmax(prediction[0])
    # 5. 인덱스를 이용해 원래 품종 이름(글자)으로 변환
    predicted_species = iris_classes[predicted_idx]
    print("예측된 품종명:", predicted_species)
    return predicted_species

    