package com.iot.sensor;

import com.iot.sensor.model.SensorDevice;
import com.iot.sensor.repository.ISensorDeviceRepository;
import com.iot.sensor.repository.mongodb.MongoDBSensorDeviceRepository;
import com.iot.sensor.repository.postgresql.PostgreSQLSensorDeviceRepository;
import com.iot.sensor.service.SensorDeviceService;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;

/**
 * Main application class demonstrating Repository Pattern.
 * Can switch between PostgreSQL and MongoDB implementations without modifying business logic.
 */
public class Main {
    
    // Database configuration - change these to match your setup
    private static final String POSTGRESQL_URL = "jdbc:postgresql://localhost:5432/iot_db";
    private static final String POSTGRESQL_USER = "postgres";
    private static final String POSTGRESQL_PASSWORD = "password";
    
    private static final String MONGODB_URI = "mongodb://localhost:27017";
    private static final String MONGODB_DATABASE = "iot_db";
    
    // Repository type: "POSTGRESQL" or "MONGODB"
    private static final String REPOSITORY_TYPE = "POSTGRESQL"; // Change to "MONGODB" to switch
    
    public static void main(String[] args) {
        System.out.println("=== IoT Sensor Device Management System ===");
        System.out.println("Repository Type: " + REPOSITORY_TYPE);
        System.out.println();
        
        try {
            // Initialize repository based on type
            ISensorDeviceRepository repository = initializeRepository();
            
            // Create service with repository (business logic doesn't change)
            SensorDeviceService service = new SensorDeviceService(repository);
            
            // Demonstrate CRUD operations
            demonstrateCRUDOperations(service);
            
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Initialize repository based on REPOSITORY_TYPE.
     * This demonstrates the Repository Pattern - switching implementations without changing business logic.
     */
    private static ISensorDeviceRepository initializeRepository() throws SQLException {
        if ("POSTGRESQL".equalsIgnoreCase(REPOSITORY_TYPE)) {
            System.out.println("Initializing PostgreSQL repository...");
            Connection connection = DriverManager.getConnection(POSTGRESQL_URL, POSTGRESQL_USER, POSTGRESQL_PASSWORD);
            return new PostgreSQLSensorDeviceRepository(connection);
        } else if ("MONGODB".equalsIgnoreCase(REPOSITORY_TYPE)) {
            System.out.println("Initializing MongoDB repository...");
            com.mongodb.client.MongoClient mongoClient = MongoClients.create(MONGODB_URI);
            MongoDatabase database = mongoClient.getDatabase(MONGODB_DATABASE);
            return new MongoDBSensorDeviceRepository(database);
        } else {
            throw new IllegalArgumentException("Invalid repository type: " + REPOSITORY_TYPE);
        }
    }
    
    /**
     * Demonstrate CRUD operations on SensorDevice
     */
    private static void demonstrateCRUDOperations(SensorDeviceService service) {
        System.out.println("--- CRUD Operations Demo ---\n");
        
        // CREATE
        System.out.println("1. Creating sensor devices...");
        SensorDevice device1 = new SensorDevice(null, "Temperature Sensor 01", "Temperature", 
                                                "Building A, Room 101", "Active", 25.5, "Celsius", "SENSOR-001");
        SensorDevice device2 = new SensorDevice(null, "Humidity Sensor 01", "Humidity", 
                                                "Building B, Room 205", "Active", 65.0, "Percent", "SENSOR-002");
        
        device1 = service.createSensorDevice(device1);
        device2 = service.createSensorDevice(device2);
        System.out.println("Created: " + device1);
        System.out.println("Created: " + device2);
        System.out.println();
        
        // READ (All)
        System.out.println("2. Reading all sensor devices...");
        List<SensorDevice> allDevices = service.getAllSensorDevices();
        System.out.println("Total devices: " + allDevices.size());
        allDevices.forEach(device -> System.out.println("  - " + device));
        System.out.println();
        
        // READ (ById)
        System.out.println("3. Reading sensor device by ID...");
        String deviceId = device1.getId();
        service.getSensorDeviceById(deviceId).ifPresent(device -> {
            System.out.println("Found device: " + device);
        });
        System.out.println();
        
        // UPDATE
        System.out.println("4. Updating sensor device...");
        device1.setLastReading(26.8);
        device1.setStatus("Maintenance");
        SensorDevice updatedDevice = service.updateSensorDevice(device1);
        System.out.println("Updated device: " + updatedDevice);
        System.out.println();
        
        // DELETE
        System.out.println("5. Deleting sensor device...");
        boolean deleted = service.deleteSensorDevice(device2.getId());
        System.out.println("Device deleted: " + deleted);
        System.out.println();
        
        // Final state
        System.out.println("6. Final state of all devices...");
        List<SensorDevice> finalDevices = service.getAllSensorDevices();
        System.out.println("Remaining devices: " + finalDevices.size());
        finalDevices.forEach(device -> System.out.println("  - " + device));
    }
}

