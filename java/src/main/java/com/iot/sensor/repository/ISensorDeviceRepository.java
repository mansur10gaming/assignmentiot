package com.iot.sensor.repository;

import com.iot.sensor.model.SensorDevice;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for SensorDevice CRUD operations.
 * This interface allows switching between PostgreSQL and MongoDB implementations
 * without modifying business logic (Repository Pattern).
 */
public interface ISensorDeviceRepository {
    
    /**
     * Create a new sensor device
     * @param sensorDevice The sensor device to create
     * @return The created sensor device with generated ID
     */
    SensorDevice create(SensorDevice sensorDevice);
    
    /**
     * Find a sensor device by ID
     * @param id The ID of the sensor device
     * @return Optional containing the sensor device if found
     */
    Optional<SensorDevice> findById(String id);
    
    /**
     * Get all sensor devices
     * @return List of all sensor devices
     */
    List<SensorDevice> findAll();
    
    /**
     * Update an existing sensor device
     * @param sensorDevice The sensor device to update
     * @return The updated sensor device
     */
    SensorDevice update(SensorDevice sensorDevice);
    
    /**
     * Delete a sensor device by ID
     * @param id The ID of the sensor device to delete
     * @return true if deleted successfully, false otherwise
     */
    boolean deleteById(String id);
    
    /**
     * Check if a sensor device exists by ID
     * @param id The ID to check
     * @return true if exists, false otherwise
     */
    boolean existsById(String id);
}

