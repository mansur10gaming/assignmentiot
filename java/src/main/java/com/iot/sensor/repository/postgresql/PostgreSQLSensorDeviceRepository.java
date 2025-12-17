package com.iot.sensor.repository.postgresql;

import com.iot.sensor.model.SensorDevice;
import com.iot.sensor.repository.ISensorDeviceRepository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * PostgreSQL implementation of ISensorDeviceRepository.
 * Performs CRUD operations on PostgreSQL database.
 */
public class PostgreSQLSensorDeviceRepository implements ISensorDeviceRepository {
    
    private final Connection connection;
    
    public PostgreSQLSensorDeviceRepository(Connection connection) {
        this.connection = connection;
    }
    
    @Override
    public SensorDevice create(SensorDevice sensorDevice) {
        String sql = "INSERT INTO sensor_devices (id, device_name, sensor_type, location, status, last_reading, unit, device_id) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            String id = sensorDevice.getId() != null ? sensorDevice.getId() : UUID.randomUUID().toString();
            
            stmt.setString(1, id);
            stmt.setString(2, sensorDevice.getDeviceName());
            stmt.setString(3, sensorDevice.getSensorType());
            stmt.setString(4, sensorDevice.getLocation());
            stmt.setString(5, sensorDevice.getStatus());
            stmt.setDouble(6, sensorDevice.getLastReading() != null ? sensorDevice.getLastReading() : 0.0);
            stmt.setString(7, sensorDevice.getUnit());
            stmt.setString(8, sensorDevice.getDeviceId());
            
            stmt.executeUpdate();
            sensorDevice.setId(id);
            return sensorDevice;
        } catch (SQLException e) {
            throw new RuntimeException("Error creating sensor device in PostgreSQL", e);
        }
    }
    
    @Override
    public Optional<SensorDevice> findById(String id) {
        String sql = "SELECT * FROM sensor_devices WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return Optional.of(mapResultSetToSensorDevice(rs));
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new RuntimeException("Error finding sensor device by ID in PostgreSQL", e);
        }
    }
    
    @Override
    public List<SensorDevice> findAll() {
        String sql = "SELECT * FROM sensor_devices ORDER BY device_name";
        List<SensorDevice> devices = new ArrayList<>();
        
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                devices.add(mapResultSetToSensorDevice(rs));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error finding all sensor devices in PostgreSQL", e);
        }
        
        return devices;
    }
    
    @Override
    public SensorDevice update(SensorDevice sensorDevice) {
        String sql = "UPDATE sensor_devices SET device_name = ?, sensor_type = ?, location = ?, " +
                     "status = ?, last_reading = ?, unit = ?, device_id = ? WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, sensorDevice.getDeviceName());
            stmt.setString(2, sensorDevice.getSensorType());
            stmt.setString(3, sensorDevice.getLocation());
            stmt.setString(4, sensorDevice.getStatus());
            stmt.setDouble(5, sensorDevice.getLastReading() != null ? sensorDevice.getLastReading() : 0.0);
            stmt.setString(6, sensorDevice.getUnit());
            stmt.setString(7, sensorDevice.getDeviceId());
            stmt.setString(8, sensorDevice.getId());
            
            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected == 0) {
                throw new RuntimeException("Sensor device not found for update");
            }
            
            return sensorDevice;
        } catch (SQLException e) {
            throw new RuntimeException("Error updating sensor device in PostgreSQL", e);
        }
    }
    
    @Override
    public boolean deleteById(String id) {
        String sql = "DELETE FROM sensor_devices WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, id);
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            throw new RuntimeException("Error deleting sensor device from PostgreSQL", e);
        }
    }
    
    @Override
    public boolean existsById(String id) {
        String sql = "SELECT COUNT(*) FROM sensor_devices WHERE id = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return rs.getInt(1) > 0;
            }
            return false;
        } catch (SQLException e) {
            throw new RuntimeException("Error checking sensor device existence in PostgreSQL", e);
        }
    }
    
    private SensorDevice mapResultSetToSensorDevice(ResultSet rs) throws SQLException {
        SensorDevice device = new SensorDevice();
        device.setId(rs.getString("id"));
        device.setDeviceName(rs.getString("device_name"));
        device.setSensorType(rs.getString("sensor_type"));
        device.setLocation(rs.getString("location"));
        device.setStatus(rs.getString("status"));
        device.setLastReading(rs.getDouble("last_reading"));
        device.setUnit(rs.getString("unit"));
        device.setDeviceId(rs.getString("device_id"));
        return device;
    }
}

