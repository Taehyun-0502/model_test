# 파이썬 공식 실행 환경 중 가볍고 안정적인 slim 이미지 사용
FROM python:3.13-slim

# 컨테이너 내부의 작업 디렉토리 설정 [cite: 193]
WORKDIR /app

# 라이브러리 목록 파일을 먼저 복사
COPY requirements.txt .

# 파이썬 의존성 패키지들을 가비지 파일 없이 깔끔하게 설치
RUN pip install --no-cache-dir -r requirements.txt

# FastAPI 소스코드 전체를 컨테이너 내부로 복사 [cite: 154]
COPY . .

# FastAPI 기본 포트 8000 개방 [cite: 52]
EXPOSE 8000

# 프로덕션 운영 환경의 정석: Gunicorn이 관리자 역할을 하고, Uvicorn 워커 4개가 비동기 요청을 분산 처리 [cite: 45, 51]
CMD ["gunicorn", "index:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]