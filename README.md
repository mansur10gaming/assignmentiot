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

##Author
Abilmansur Aitbay
