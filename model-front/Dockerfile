FROM node:20-alpine AS build-stage

# 컨테이너 내부의 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치를 위해 패키지 파일 먼저 복사
COPY package*.json ./

# 라이브러리 설치
RUN npm install

# 나머지 React 소스코드 전체를 컨테이너로 복사
COPY . .

# 배포용 정적 파일 생성 (dist 또는 build 폴더가 생성됨)
RUN npm run build


# === 2단계: 실행 스테이지 (가볍고 빠른 Nginx 웹 서버로 구동) ===
FROM nginx:alpine

# 1단계 빌드 스테이지에서 완성된 정적 결과물(dist)만 Nginx의 웹 서빙 경로로 쏙 복사
# ※ 프로젝트가 CRA 기반이라면 /app/dist 대신 /app/build 로 변경해 주세요.
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx의 기본 80번 포트를 외부로 개방
EXPOSE 80

# Nginx 서버를 백그라운드가 아닌 전면(foreground)에서 상시 구동
CMD ["nginx", "-g", "daemon off;"]