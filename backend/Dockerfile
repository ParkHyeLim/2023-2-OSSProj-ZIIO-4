# backend Dockerfile
FROM openjdk:11-jdk-slim

ARG JAR_PATH=./build/libs

COPY ${JAR_PATH}/*.jar .

# Add wait-for-it.sh to the image
ADD wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

ENTRYPOINT ["/wait-for-it.sh", "ziio_db:3306", "--", "java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]