# Multi-stage build for Spring Boot application
# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-17 AS builder

# Set working directory
WORKDIR /app

# Copy pom.xml first for better caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Production image
FROM openjdk:17-jdk-slim AS production

# Set working directory
WORKDIR /app

# Create non-root user
RUN groupadd -g 1001 spring && useradd -u 1001 -g spring spring

# Install curl for health checks (optional)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy the WAR file from builder stage
COPY --from=builder /app/target/*.war app.war

# Create uploads directory with proper permissions
RUN mkdir -p /app/uploads && chown -R spring:spring /app

# Switch to non-root user
USER spring

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV SPRING_PROFILES_ACTIVE=docker

# Start the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.war"]