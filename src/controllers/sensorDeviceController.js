const SensorDevice = require('../models/SensorDevice');

exports.createSensorDevice = async (req, res) => {
  try {
    const { deviceName, sensorType, location, status, lastReading, unit, deviceId } = req.body;

    if (!deviceName || !sensorType || !location || !deviceId) {
      return res.status(400).json({ message: 'deviceName, sensorType, location, and deviceId are required' });
    }

    const existingDevice = await SensorDevice.findOne({ deviceId });
    if (existingDevice) {
      return res.status(409).json({ message: 'Sensor device with this deviceId already exists' });
    }

    const sensorDevice = new SensorDevice({
      deviceName,
      sensorType,
      location,
      status: status || 'Active',
      lastReading: lastReading || 0,
      unit: unit || 'Celsius',
      deviceId
    });

    await sensorDevice.save();
    res.status(201).json({ message: 'Sensor device created successfully', sensorDevice });
  } catch (error) {
    res.status(500).json({ message: 'Error creating sensor device', error: error.message });
  }
};

exports.getAllSensorDevices = async (req, res) => {
  try {
    const sensorDevices = await SensorDevice.find();
    res.status(200).json({ count: sensorDevices.length, items: sensorDevices });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sensor devices', error: error.message });
  }
};

exports.getSensorDeviceById = async (req, res) => {
  try {
    const sensorDevice = await SensorDevice.findById(req.params.id);
    if (!sensorDevice) {
      return res.status(404).json({ message: 'Sensor device not found' });
    }
    res.status(200).json(sensorDevice);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sensor device', error: error.message });
  }
};

exports.updateSensorDevice = async (req, res) => {
  try {
    const { deviceName, sensorType, location, status, lastReading, unit, deviceId } = req.body;

    const sensorDevice = await SensorDevice.findById(req.params.id);
    if (!sensorDevice) {
      return res.status(404).json({ message: 'Sensor device not found' });
    }

    if (deviceId && deviceId !== sensorDevice.deviceId) {
      const existingDevice = await SensorDevice.findOne({ deviceId });
      if (existingDevice) {
        return res.status(409).json({ message: 'DeviceId already in use' });
      }
      sensorDevice.deviceId = deviceId;
    }

    if (deviceName) sensorDevice.deviceName = deviceName;
    if (sensorType) sensorDevice.sensorType = sensorType;
    if (location) sensorDevice.location = location;
    if (status) sensorDevice.status = status;
    if (lastReading !== undefined) sensorDevice.lastReading = lastReading;
    if (unit) sensorDevice.unit = unit;
    
    sensorDevice.lastUpdate = Date.now();

    await sensorDevice.save();
    res.status(200).json({ message: 'Sensor device updated successfully', sensorDevice });
  } catch (error) {
    res.status(500).json({ message: 'Error updating sensor device', error: error.message });
  }
};

exports.deleteSensorDevice = async (req, res) => {
  try {
    const sensorDevice = await SensorDevice.findByIdAndDelete(req.params.id);
    if (!sensorDevice) {
      return res.status(404).json({ message: 'Sensor device not found' });
    }
    res.status(200).json({ message: 'Sensor device deleted successfully', sensorDevice });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sensor device', error: error.message });
  }
};

