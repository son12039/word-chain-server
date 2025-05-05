# Use an official Java runtime as a parent image
FROM openjdk:17-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

# Install dependencies (optional, for Maven)
RUN apt-get update && apt-get install -y maven

# Build the application
RUN mvn clean install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/your-application.jar"]
