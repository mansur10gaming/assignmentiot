# IoT Sensor Device Management - Java Application

## Overview
This Java application demonstrates the **Repository Pattern** for managing sensor devices in an IoT system. The application supports both PostgreSQL and MongoDB databases, and can switch between them without modifying business logic.

## Project Structure
```
java/
├── src/main/java/com/iot/sensor/
│   ├── model/
│   │   └── SensorDevice.java          # Entity class
│   ├── repository/
│   │   ├── ISensorDeviceRepository.java                    # Repository interface
│   │   ├── postgresql/
│   │   │   └── PostgreSQLSensorDeviceRepository.java       # PostgreSQL implementation
│   │   └── mongodb/
│   │       └── MongoDBSensorDeviceRepository.java          # MongoDB implementation
│   ├── service/
│   │   └── SensorDeviceService.java   # Business logic layer
│   └── Main.java                      # Application entry point
├── pom.xml                            # Maven dependencies
└── README.md                          # This file
```

## Requirements
- Java 11 or higher
- Maven 3.6 or higher
- PostgreSQL 12+ (if using PostgreSQL)
- MongoDB 4.4+ (if using MongoDB)

## Dependencies
- PostgreSQL JDBC Driver (42.6.0)
- MongoDB Java Driver (4.11.1)

## Setup Instructions

### 1. Database Setup

#### PostgreSQL Setup:
```sql
CREATE DATABASE iot_db;
-- Then run database/postgresql_schema.sql
```

#### MongoDB Setup:
```bash
# Start MongoDB service
# Then run database/mongodb_schema.js in MongoDB shell
```

### 2. Configure Database Connection

Edit `Main.java` and update the following constants:
```java
private static final String POSTGRESQL_URL = "jdbc:postgresql://localhost:5432/iot_db";
private static final String POSTGRESQL_USER = "postgres";
private static final String POSTGRESQL_PASSWORD = "your_password";

private static final String MONGODB_URI = "mongodb://localhost:27017";
private static final String MONGODB_DATABASE = "iot_db";
```

### 3. Select Repository Type

In `Main.java`, set the repository type:
```java
private static final String REPOSITORY_TYPE = "POSTGRESQL"; // or "MONGODB"
```

### 4. Build and Run

```bash
# Navigate to java directory
cd java

# Build the project
mvn clean compile

# Run the application
mvn exec:java
```

## Repository Pattern Implementation

The Repository Pattern allows switching between database implementations without changing business logic:

1. **Interface**: `ISensorDeviceRepository` defines the contract
2. **Implementations**: 
   - `PostgreSQLSensorDeviceRepository` - PostgreSQL implementation
   - `MongoDBSensorDeviceRepository` - MongoDB implementation
3. **Service Layer**: `SensorDeviceService` uses the interface, not concrete implementations
4. **Main Class**: Initializes the appropriate repository based on configuration

## CRUD Operations

The application demonstrates:
- **Create**: Add new sensor devices
- **Read**: Retrieve sensor devices (all or by ID)
- **Update**: Modify existing sensor devices
- **Delete**: Remove sensor devices

## Features

- ✅ Repository Pattern with Interface + Polymorphism
- ✅ Support for PostgreSQL and MongoDB
- ✅ Switch between databases without code changes
- ✅ Clean separation of concerns
- ✅ Well-documented code

## Notes

- The `SensorDevice` entity contains: `id` (required) and at least 3 additional attributes: `deviceName`, `sensorType`, `location`, `status`, `lastReading`, `unit`, `deviceId`
- Both repository implementations follow the same interface contract
- Business logic in `SensorDeviceService` remains unchanged regardless of database choice

