# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/VehicleMicroservice-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port (optional, adjust to your app's port)
EXPOSE 8082

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
