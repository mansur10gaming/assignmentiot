const express = require('express');
const router = express.Router();
const sensorDeviceController = require('../controllers/sensorDeviceController');

router.post('/', sensorDeviceController.createSensorDevice);
router.get('/', sensorDeviceController.getAllSensorDevices);
router.get('/:id', sensorDeviceController.getSensorDeviceById);
router.put('/:id', sensorDeviceController.updateSensorDevice);
router.delete('/:id', sensorDeviceController.deleteSensorDevice);

module.exports = router;

