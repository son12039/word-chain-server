# Alpine 기반 OpenJDK 이미지를 사용하여 Maven 설치
FROM openjdk:17-jdk-alpine

# Update the package list and install Maven using apk (Alpine package manager)
RUN apk update && apk add maven

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Build the application
RUN mvn clean install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/your-application.jar"]
