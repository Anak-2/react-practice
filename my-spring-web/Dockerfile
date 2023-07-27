# Step 1: 기반 이미지 설정
FROM openjdk:17

# Step 2: 작업 디렉토리 생성
WORKDIR /app

# Step 3: 호스트의 Spring 프로젝트 jar 파일 복사
COPY target/myspringweb-0.0.1-SNAPSHOT.jar /app/myspringweb-0.0.1-SNAPSHOT.jar

# Step 4: 8098 포트 노출
EXPOSE 8098

# Step 5: Spring Boot 어플리케이션 실행
CMD ["java", "-jar", "myspringweb-0.0.1-SNAPSHOT.jar"]