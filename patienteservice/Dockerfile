FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy gradle files
COPY gradle gradle
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .

# Download dependencies
RUN ./gradlew build --no-daemon || return 0

# Copy source code
COPY src src

# Build application
RUN ./gradlew build --no-daemon

# Expose port
EXPOSE 8081

# Run application
CMD ["java", "-jar", "build/libs/patienteservice-1.0.0.jar"]
