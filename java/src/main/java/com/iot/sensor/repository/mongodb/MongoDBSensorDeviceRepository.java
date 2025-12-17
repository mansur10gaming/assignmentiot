package com.iot.sensor.repository.mongodb;

import com.iot.sensor.model.SensorDevice;
import com.iot.sensor.repository.ISensorDeviceRepository;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * MongoDB implementation of ISensorDeviceRepository.
 * Performs CRUD operations on MongoDB database.
 */
public class MongoDBSensorDeviceRepository implements ISensorDeviceRepository {
    
    private final MongoCollection<Document> collection;
    
    public MongoDBSensorDeviceRepository(MongoDatabase database) {
        this.collection = database.getCollection("sensor_devices");
    }
    
    @Override
    public SensorDevice create(SensorDevice sensorDevice) {
        Document doc = new Document()
                .append("deviceName", sensorDevice.getDeviceName())
                .append("sensorType", sensorDevice.getSensorType())
                .append("location", sensorDevice.getLocation())
                .append("status", sensorDevice.getStatus())
                .append("lastReading", sensorDevice.getLastReading() != null ? sensorDevice.getLastReading() : 0.0)
                .append("unit", sensorDevice.getUnit())
                .append("deviceId", sensorDevice.getDeviceId());
        
        collection.insertOne(doc);
        
        String id = doc.getObjectId("_id").toString();
        sensorDevice.setId(id);
        return sensorDevice;
    }
    
    @Override
    public Optional<SensorDevice> findById(String id) {
        try {
            Document doc = collection.find(Filters.eq("_id", new ObjectId(id))).first();
            if (doc != null) {
                return Optional.of(mapDocumentToSensorDevice(doc));
            }
            return Optional.empty();
        } catch (IllegalArgumentException e) {
            return Optional.empty();
        }
    }
    
    @Override
    public List<SensorDevice> findAll() {
        List<SensorDevice> devices = new ArrayList<>();
        
        for (Document doc : collection.find()) {
            devices.add(mapDocumentToSensorDevice(doc));
        }
        
        return devices;
    }
    
    @Override
    public SensorDevice update(SensorDevice sensorDevice) {
        Document doc = collection.findOneAndUpdate(
                Filters.eq("_id", new ObjectId(sensorDevice.getId())),
                Updates.combine(
                        Updates.set("deviceName", sensorDevice.getDeviceName()),
                        Updates.set("sensorType", sensorDevice.getSensorType()),
                        Updates.set("location", sensorDevice.getLocation()),
                        Updates.set("status", sensorDevice.getStatus()),
                        Updates.set("lastReading", sensorDevice.getLastReading() != null ? sensorDevice.getLastReading() : 0.0),
                        Updates.set("unit", sensorDevice.getUnit()),
                        Updates.set("deviceId", sensorDevice.getDeviceId())
                )
        );
        
        if (doc == null) {
            throw new RuntimeException("Sensor device not found for update");
        }
        
        return sensorDevice;
    }
    
    @Override
    public boolean deleteById(String id) {
        try {
            Document result = collection.findOneAndDelete(Filters.eq("_id", new ObjectId(id)));
            return result != null;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
    
    @Override
    public boolean existsById(String id) {
        try {
            Document doc = collection.find(Filters.eq("_id", new ObjectId(id))).first();
            return doc != null;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
    
    private SensorDevice mapDocumentToSensorDevice(Document doc) {
        SensorDevice device = new SensorDevice();
        device.setId(doc.getObjectId("_id").toString());
        device.setDeviceName(doc.getString("deviceName"));
        device.setSensorType(doc.getString("sensorType"));
        device.setLocation(doc.getString("location"));
        device.setStatus(doc.getString("status"));
        device.setLastReading(doc.getDouble("lastReading"));
        device.setUnit(doc.getString("unit"));
        device.setDeviceId(doc.getString("deviceId"));
        return device;
    }
}

