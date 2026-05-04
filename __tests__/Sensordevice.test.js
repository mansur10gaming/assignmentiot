/**
 * Jest + SuperTest API Tests
 * IoT Sensor Device Management System
 * All MongoDB operations are mocked
 */

const request = require('supertest');

// ── Mock mongoose BEFORE importing app ──────────────────────────────────────
jest.mock('mongoose', () => {
  const mockDevice = {
    _id: '64a1f2c3d4e5f6a7b8c9d0e1',
    deviceName: 'Temperature Sensor 01',
    sensorType: 'Temperature',
    location: 'Building A, Room 101',
    status: 'Active',
    lastReading: 25.5,
    unit: 'Celsius',
    deviceId: 'SENSOR-001',
    lastUpdate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  function MockModel(data) {
    Object.assign(this, mockDevice, data);
    this.save = jest.fn().mockResolvedValue(this);
  }

  MockModel.find               = jest.fn().mockResolvedValue([mockDevice]);
  MockModel.findOne            = jest.fn().mockResolvedValue(null);
  MockModel.findById           = jest.fn().mockResolvedValue({
    ...mockDevice,
    save: jest.fn().mockResolvedValue(mockDevice),
  });
  MockModel.findByIdAndDelete  = jest.fn().mockResolvedValue(mockDevice);

  return {
    connect: jest.fn().mockResolvedValue(true),
    model: jest.fn().mockReturnValue(MockModel),
    Schema: jest.fn().mockImplementation(function(def) {
      this.pre = jest.fn();
      return this;
    }),
    __mockDevice: mockDevice,
    __MockModel: MockModel,
  };
});

// ── Mock connectDB ────────────────────────────────────────────────────────────
jest.mock('../src/config/db', () => jest.fn().mockResolvedValue(true));

// ── Import app AFTER mocks ────────────────────────────────────────────────────
const app = require('../server');

// ── Helpers ───────────────────────────────────────────────────────────────────
const VALID_DEVICE = {
  deviceName:  'Temperature Sensor 01',
  sensorType:  'Temperature',
  location:    'Building A, Room 101',
  status:      'Active',
  lastReading: 25.5,
  unit:        'Celsius',
  deviceId:    'SENSOR-001',
};

const VALID_ID   = '64a1f2c3d4e5f6a7b8c9d0e1';
const INVALID_ID = '000000000000000000000000';

// ── Get fresh MockModel reference after require ───────────────────────────────
const mongoose = require('mongoose');
const MockModel = mongoose.__MockModel;

// ─────────────────────────────────────────────────────────────────────────────
describe('IoT Sensor Device API', () => {

  // TC-01
  describe('GET /api/health', () => {
    test('TC-01: should return 200 and running message', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('API is running');
    });
  });

  // TC-02 → TC-05
  describe('POST /api/items', () => {
    test('TC-02: should create a sensor device and return 201', async () => {
      const res = await request(app)
        .post('/api/items')
        .send(VALID_DEVICE);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message', 'Sensor device created successfully');
      expect(res.body).toHaveProperty('sensorDevice');
    });

    test('TC-03: should return 400 when required fields are missing', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({ deviceName: 'Only Name' });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    test('TC-04: should return 409 when deviceId already exists', async () => {
      MockModel.findOne.mockResolvedValueOnce(mongoose.__mockDevice);
      const res = await request(app)
        .post('/api/items')
        .send(VALID_DEVICE);
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toMatch(/already exists/i);
    });

    test('TC-05: should return 400 when body is completely empty', async () => {
      const res = await request(app)
        .post('/api/items')
        .send({});
      expect(res.statusCode).toBe(400);
    });
  });

  // TC-06 → TC-07
  describe('GET /api/items', () => {
    test('TC-06: should return 200 with a list of sensor devices', async () => {
      const res = await request(app).get('/api/items');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('items');
      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body).toHaveProperty('count');
    });

    test('TC-07: should return empty items array when no devices exist', async () => {
      MockModel.find.mockResolvedValueOnce([]);
      const res = await request(app).get('/api/items');
      expect(res.statusCode).toBe(200);
      expect(res.body.items).toHaveLength(0);
      expect(res.body.count).toBe(0);
    });
  });

  // TC-08 → TC-09
  describe('GET /api/items/:id', () => {
    test('TC-08: should return 200 with the correct sensor device', async () => {
      const res = await request(app).get(`/api/items/${VALID_ID}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('deviceId', 'SENSOR-001');
    });

    test('TC-09: should return 404 when sensor device is not found', async () => {
      MockModel.findById.mockResolvedValueOnce(null);
      const res = await request(app).get(`/api/items/${INVALID_ID}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toMatch(/not found/i);
    });
  });

  // TC-10 → TC-12
  describe('PUT /api/items/:id', () => {
    test('TC-10: should update and return 200', async () => {
      MockModel.findById.mockResolvedValueOnce({
        ...mongoose.__mockDevice,
        save: jest.fn().mockResolvedValue({ ...mongoose.__mockDevice, deviceName: 'Updated Sensor' }),
      });
      const res = await request(app)
        .put(`/api/items/${VALID_ID}`)
        .send({ deviceName: 'Updated Sensor', deviceId: 'SENSOR-001' });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/updated/i);
    });

    test('TC-11: should return 404 when updating a non-existent device', async () => {
      MockModel.findById.mockResolvedValueOnce(null);
      const res = await request(app)
        .put(`/api/items/${INVALID_ID}`)
        .send({ deviceName: 'Ghost Sensor' });
      expect(res.statusCode).toBe(404);
    });

    test('TC-12: should return 409 when new deviceId is already taken', async () => {
      MockModel.findById.mockResolvedValueOnce({
        ...mongoose.__mockDevice,
        deviceId: 'SENSOR-001',
        save: jest.fn(),
      });
      MockModel.findOne.mockResolvedValueOnce({ deviceId: 'SENSOR-999' });
      const res = await request(app)
        .put(`/api/items/${VALID_ID}`)
        .send({ deviceId: 'SENSOR-999' });
      expect(res.statusCode).toBe(409);
      expect(res.body.message).toMatch(/already in use/i);
    });
  });

  // TC-13 → TC-14
  describe('DELETE /api/items/:id', () => {
    test('TC-13: should delete and return 200', async () => {
      const res = await request(app).delete(`/api/items/${VALID_ID}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toMatch(/deleted/i);
    });

    test('TC-14: should return 404 when deleting a non-existent device', async () => {
      MockModel.findByIdAndDelete.mockResolvedValueOnce(null);
      const res = await request(app).delete(`/api/items/${INVALID_ID}`);
      expect(res.statusCode).toBe(404);
      expect(res.body.message).toMatch(/not found/i);
    });
  });

  // TC-15 → TC-16
  describe('Response structure', () => {
    test('TC-15: GET /api/items should respond with JSON content-type', async () => {
      const res = await request(app).get('/api/items');
      expect(res.headers['content-type']).toMatch(/json/);
    });

    test('TC-16: POST should include sensorDevice object in response body', async () => {
      const res = await request(app)
        .post('/api/items')
        .send(VALID_DEVICE);
      expect(res.body.sensorDevice).toBeDefined();
      expect(res.body.sensorDevice).toHaveProperty('deviceName');
    });
  });

});