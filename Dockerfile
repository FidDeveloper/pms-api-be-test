# syntax=docker/dockerfile:1

FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy pom.xml first to leverage Docker cache for dependencies
COPY pom.xml .

# Download dependencies before copying source code
RUN mvn dependency:go-offline -B

# Copy source code
COPY src src
COPY .mvn .mvn
COPY mvnw mvnw
RUN chmod +x mvnw

# Build application
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
