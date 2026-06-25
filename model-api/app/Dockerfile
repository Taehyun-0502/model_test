# === 1단계: 빌드 스테이지 (자바 코드를 컴파일하여 실행 파일 생성) ===
FROM gradle:8-jdk21 AS build-stage

# 컨테이너 내부의 작업 디렉토리 설정
WORKDIR /app

# Gradle 빌드에 필요한 환경 파일들을 먼저 복사 (캐싱 효율화)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# 실제 자바 소스코드 폴더 복사
COPY src src

# Gradle 명령어로 테스트를 거쳐 단독 실행 가능한 .jar 파일 빌드
RUN ./gradlew clean bootJar


# === 2단계: 실행 스테이지 (가벼운 JRE 환경에서 JAR 파일 실행) ===
# 지원 중단된 openjdk 대신 공식 eclipse-temurin의 가벼운 slim 이미지 사용
FROM eclipse-temurin:21-jre-slim

WORKDIR /app

# 1단계 빌드 스테이지에서 생성된 완제품 .jar 파일만 실행 스테이지로 복사
COPY --from=build-stage /app/build/libs/*.jar app.jar

# Spring Boot 기본 포트 8080 개방
EXPOSE 8080

# 서버 구동 명령어 실행
CMD ["java", "-jar", "app.jar"]