// MongoDB Database Schema and Sample Data for IoT Sensor Device Management System
// Database: iot_db
// Collection: sensor_devices

// Connect to MongoDB (run in MongoDB shell: mongosh)
// use iot_db

// Create collection (MongoDB creates collections automatically, but we can ensure it exists)
db.createCollection("sensor_devices");

// Create indexes for better query performance
db.sensor_devices.createIndex({ "deviceId": 1 }, { unique: true });
db.sensor_devices.createIndex({ "sensorType": 1 });
db.sensor_devices.createIndex({ "status": 1 });
db.sensor_devices.createIndex({ "location": 1 });

// Insert sample sensor devices
db.sensor_devices.insertMany([
    {
        deviceName: "Temperature Sensor 01",
        sensorType: "Temperature",
        location: "Building A, Room 101",
        status: "Active",
        lastReading: 25.5,
        unit: "Celsius",
        deviceId: "SENSOR-001",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        deviceName: "Humidity Sensor 01",
        sensorType: "Humidity",
        location: "Building B, Room 205",
        status: "Active",
        lastReading: 65.0,
        unit: "Percent",
        deviceId: "SENSOR-002",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        deviceName: "Motion Sensor 01",
        sensorType: "Motion",
        location: "Building C, Entrance",
        status: "Active",
        lastReading: 1.0,
        unit: "Boolean",
        deviceId: "SENSOR-003",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        deviceName: "Light Sensor 01",
        sensorType: "Light",
        location: "Building A, Room 102",
        status: "Inactive",
        lastReading: 450.0,
        unit: "Lux",
        deviceId: "SENSOR-004",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);

// Query to verify data
// db.sensor_devices.find().pretty();

// Query examples:
// Find all active sensors: db.sensor_devices.find({ status: "Active" }).pretty();
// Find by deviceId: db.sensor_devices.find({ deviceId: "SENSOR-001" }).pretty();
// Find by sensor type: db.sensor_devices.find({ sensorType: "Temperature" }).pretty();

