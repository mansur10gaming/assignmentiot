package com.iot.sensor.service;

import com.iot.sensor.model.SensorDevice;
import com.iot.sensor.repository.ISensorDeviceRepository;

import java.util.List;
import java.util.Optional;

/**
 * Service class for SensorDevice business logic.
 * Uses repository interface, allowing switching between PostgreSQL and MongoDB
 * without modifying this code (Repository Pattern).
 */
public class SensorDeviceService {
    
    private final ISensorDeviceRepository repository;
    
    public SensorDeviceService(ISensorDeviceRepository repository) {
        this.repository = repository;
    }
    
    /**
     * Create a new sensor device
     */
    public SensorDevice createSensorDevice(SensorDevice sensorDevice) {
        if (sensorDevice.getDeviceName() == null || sensorDevice.getDeviceName().trim().isEmpty()) {
            throw new IllegalArgumentException("Device name is required");
        }
        if (sensorDevice.getSensorType() == null || sensorDevice.getSensorType().trim().isEmpty()) {
            throw new IllegalArgumentException("Sensor type is required");
        }
        if (sensorDevice.getLocation() == null || sensorDevice.getLocation().trim().isEmpty()) {
            throw new IllegalArgumentException("Location is required");
        }
        if (sensorDevice.getDeviceId() == null || sensorDevice.getDeviceId().trim().isEmpty()) {
            throw new IllegalArgumentException("Device ID is required");
        }
        
        return repository.create(sensorDevice);
    }
    
    /**
     * Get sensor device by ID
     */
    public Optional<SensorDevice> getSensorDeviceById(String id) {
        return repository.findById(id);
    }
    
    /**
     * Get all sensor devices
     */
    public List<SensorDevice> getAllSensorDevices() {
        return repository.findAll();
    }
    
    /**
     * Update an existing sensor device
     */
    public SensorDevice updateSensorDevice(SensorDevice sensorDevice) {
        if (sensorDevice.getId() == null || sensorDevice.getId().trim().isEmpty()) {
            throw new IllegalArgumentException("Sensor device ID is required for update");
        }
        
        if (!repository.existsById(sensorDevice.getId())) {
            throw new RuntimeException("Sensor device not found");
        }
        
        return repository.update(sensorDevice);
    }
    
    /**
     * Delete a sensor device by ID
     */
    public boolean deleteSensorDevice(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("Sensor device ID is required for deletion");
        }
        
        return repository.deleteById(id);
    }
}

