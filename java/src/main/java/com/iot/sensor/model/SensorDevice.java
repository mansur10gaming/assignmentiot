package com.iot.sensor.model;

/**
 * SensorDevice entity class representing a sensor device in an IoT system.
 * Contains id and at least 3 additional attributes: deviceName, sensorType, location, status, lastReading, unit, deviceId
 */
public class SensorDevice {
    private String id;
    private String deviceName;
    private String sensorType;
    private String location;
    private String status;
    private Double lastReading;
    private String unit;
    private String deviceId;

    // Default constructor
    public SensorDevice() {
    }

    // Constructor with all fields
    public SensorDevice(String id, String deviceName, String sensorType, String location, 
                       String status, Double lastReading, String unit, String deviceId) {
        this.id = id;
        this.deviceName = deviceName;
        this.sensorType = sensorType;
        this.location = location;
        this.status = status;
        this.lastReading = lastReading;
        this.unit = unit;
        this.deviceId = deviceId;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public String getSensorType() {
        return sensorType;
    }

    public void setSensorType(String sensorType) {
        this.sensorType = sensorType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getLastReading() {
        return lastReading;
    }

    public void setLastReading(Double lastReading) {
        this.lastReading = lastReading;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    @Override
    public String toString() {
        return "SensorDevice{" +
                "id='" + id + '\'' +
                ", deviceName='" + deviceName + '\'' +
                ", sensorType='" + sensorType + '\'' +
                ", location='" + location + '\'' +
                ", status='" + status + '\'' +
                ", lastReading=" + lastReading +
                ", unit='" + unit + '\'' +
                ", deviceId='" + deviceId + '\'' +
                '}';
    }
}

