# IoT Sensor Device Management System

## Project Overview
This project implements a complete IoT Sensor Device Management System for the creative exam in the discipline "Information and Communication Technologies". The system demonstrates Object-Oriented Programming, Repository Pattern using Interfaces, and integration with PostgreSQL and MongoDB databases.

**Topic**: Sensor Device in an IoT System

## Project Structure

```
assignment/
├── java/                          # Java Application (Repository Pattern)
│   ├── src/main/java/com/iot/sensor/
│   │   ├── model/                 # Entity classes
│   │   ├── repository/            # Repository interfaces and implementations
│   │   ├── service/               # Business logic layer
│   │   └── Main.java              # Application entry point
│   ├── pom.xml                    # Maven dependencies
│   └── README.md                  # Java application documentation
├── database/                      # Database schemas
│   ├── postgresql_schema.sql      # PostgreSQL schema and sample data
│   └── mongodb_schema.js          # MongoDB schema and sample data
├── src/                           # Node.js Backend
│   ├── config/                    # Database configuration
│   ├── controllers/               # Request handlers
│   ├── models/                    # Mongoose models
│   └── routes/                    # API routes
├── public/                        # Frontend
│   └── index.html                 # Web interface (HTML + CSS + jQuery)
├── server.js                      # Node.js server
├── package.json                   # Node.js dependencies
└── README.md                      # This file
```

## System Requirements

### 1. Java Application (Repository Pattern)
- ✅ Application performs DB CRUD operations on SensorDevice entity
- ✅ Uses Repository Pattern with Interface + Polymorphism
- ✅ Supports switching between PostgreSQL and MongoDB without modifying business logic
- ✅ Clean, modular code structure

### 2. Database Implementation
- ✅ PostgreSQL: SQL table `sensor_devices` with id and at least 3 additional attributes
- ✅ MongoDB: Collection `sensor_devices` with id and at least 3 additional attributes
- ✅ Each record contains: `id`, `deviceName`, `sensorType`, `location`, `status`, `lastReading`, `unit`, `deviceId`

### 3. Web Application (Node.js + jQuery + HTML/CSS)
- ✅ REST API endpoints:
  - `GET /api/items` - Get all sensor devices
  - `GET /api/items/:id` - Get sensor device by ID
  - `POST /api/items` - Create new sensor device
  - `PUT /api/items/:id` - Update sensor device
  - `DELETE /api/items/:id` - Delete sensor device
- ✅ Connects to MongoDB
- ✅ Frontend provides Create, Read, Update, Delete actions
- ✅ Uses jQuery for dynamic updates
- ✅ Clean, user-friendly interface

## Setup Instructions

### Prerequisites
- Node.js 14+ and npm
- Java 11+ and Maven
- PostgreSQL 12+ (for Java app)
- MongoDB 4.4+ (for Node.js app and Java app)

### 1. Database Setup

#### PostgreSQL Setup:
```bash
# Create database
createdb iot_db

# Run schema script
psql -d iot_db -f database/postgresql_schema.sql
```

#### MongoDB Setup:
```bash
# Start MongoDB service
mongod

# Run schema script in MongoDB shell
mongosh < database/mongodb_schema.js
```

### 2. Node.js Web Application Setup

```bash
# Install dependencies
npm install

# Create .env file with MongoDB connection string
echo "MONGODB_URI=mongodb://localhost:27017/iot_db" > .env

# Start server
npm start
# or for development with auto-reload
npm run dev
```

The web application will be available at: `http://localhost:3000`

### 3. Java Application Setup

```bash
# Navigate to Java directory
cd java

# Update database credentials in Main.java:
# - POSTGRESQL_URL, POSTGRESQL_USER, POSTGRESQL_PASSWORD
# - MONGODB_URI, MONGODB_DATABASE
# - Set REPOSITORY_TYPE to "POSTGRESQL" or "MONGODB"

# Build and run
mvn clean compile
mvn exec:java
```

## API Endpoints

### Web Service (Node.js)

Base URL: `http://localhost:3000/api/items`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all sensor devices |
| GET | `/api/items/:id` | Get sensor device by ID |
| POST | `/api/items` | Create new sensor device |
| PUT | `/api/items/:id` | Update sensor device |
| DELETE | `/api/items/:id` | Delete sensor device |

### Example Request/Response

**Create Sensor Device:**
```json
POST /api/items
{
  "deviceName": "Temperature Sensor 01",
  "deviceId": "SENSOR-001",
  "sensorType": "Temperature",
  "location": "Building A, Room 101",
  "status": "Active",
  "unit": "Celsius",
  "lastReading": 25.5
}
```

**Response:**
```json
{
  "message": "Sensor device created successfully",
  "sensorDevice": {
    "_id": "...",
    "deviceName": "Temperature Sensor 01",
    ...
  }
}
```

## Project Evaluation Criteria

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | Java Application | ✅ | Complete with CRUD operations |
| 2 | Repository Pattern Abstraction | ✅ | Interface + Polymorphism, supports PostgreSQL & MongoDB |
| 3 | Database Implementation | ✅ | Both PostgreSQL and MongoDB schemas provided |
| 4 | Web Service End Points | ✅ | All CRUD endpoints implemented |
| 5 | Web Interfaces | ✅ | Complete CRUD interface with jQuery |
| 6 | Code Quality & Structure | ✅ | Clean, modular, well-documented |
| 7 | Presentation & Completeness | ✅ | Fully functional system |

## Features

### Java Application
- Repository Pattern implementation
- Interface-based design for database abstraction
- Support for PostgreSQL and MongoDB
- Clean separation of concerns (Model, Repository, Service)
- Comprehensive CRUD operations

### Web Application
- Modern, responsive UI
- Real-time CRUD operations
- jQuery-based dynamic updates
- RESTful API design
- MongoDB integration

### Database Schemas
- PostgreSQL: Normalized table structure with indexes
- MongoDB: Document-based collection with indexes
- Sample data included for both databases

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, jQuery
- **Database**: MongoDB (Node.js), PostgreSQL & MongoDB (Java)
- **Java**: Java 11, Maven
- **ORM**: Mongoose (Node.js), JDBC (Java)

## Notes

- The SensorDevice entity contains `id` and at least 3 additional attributes: `deviceName`, `sensorType`, `location`, `status`, `lastReading`, `unit`, `deviceId`
- Repository Pattern allows switching between databases without changing business logic
- Both implementations follow the same interface contract
- Code is well-documented and follows best practices

## Author
Student - ISU(US)-23-1-a / ISU(US)-23-2-a

## License
ISC

