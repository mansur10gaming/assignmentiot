-- PostgreSQL Database Schema for IoT Sensor Device Management System
-- Database: iot_db

-- Create database (run this separately if needed)
-- CREATE DATABASE iot_db;

-- Connect to database
-- \c iot_db;

-- Create sensor_devices table
CREATE TABLE IF NOT EXISTS sensor_devices (
    id VARCHAR(255) PRIMARY KEY,
    device_name VARCHAR(255) NOT NULL,
    sensor_type VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    last_reading DOUBLE PRECISION DEFAULT 0.0,
    unit VARCHAR(50) NOT NULL DEFAULT 'Celsius',
    device_id VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on device_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_device_id ON sensor_devices(device_id);

-- Create index on sensor_type for filtering
CREATE INDEX IF NOT EXISTS idx_sensor_type ON sensor_devices(sensor_type);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_status ON sensor_devices(status);

-- Insert sample data
INSERT INTO sensor_devices (id, device_name, sensor_type, location, status, last_reading, unit, device_id) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Temperature Sensor 01', 'Temperature', 'Building A, Room 101', 'Active', 25.5, 'Celsius', 'SENSOR-001'),
('550e8400-e29b-41d4-a716-446655440001', 'Humidity Sensor 01', 'Humidity', 'Building B, Room 205', 'Active', 65.0, 'Percent', 'SENSOR-002'),
('550e8400-e29b-41d4-a716-446655440002', 'Motion Sensor 01', 'Motion', 'Building C, Entrance', 'Active', 1.0, 'Boolean', 'SENSOR-003'),
('550e8400-e29b-41d4-a716-446655440003', 'Light Sensor 01', 'Light', 'Building A, Room 102', 'Inactive', 450.0, 'Lux', 'SENSOR-004')
ON CONFLICT (id) DO NOTHING;

-- Query to verify data
-- SELECT * FROM sensor_devices;

