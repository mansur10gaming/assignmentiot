const mongoose = require('mongoose');

const sensorDeviceSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
    trim: true
  },
  sensorType: {
    type: String,
    required: true,
    enum: ['Temperature', 'Humidity', 'Motion', 'Light', 'Pressure', 'Gas', 'Proximity', 'Other'],
    default: 'Temperature'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive', 'Maintenance', 'Error'],
    default: 'Active'
  },
  lastReading: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    required: true,
    default: 'Celsius'
  },
  deviceId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

sensorDeviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('SensorDevice', sensorDeviceSchema);

