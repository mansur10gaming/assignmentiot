require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const app = express();

// Connect to database immediately
connectDB().catch(err => {
  console.error('Failed to connect to database:', err.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));

app.set('json spaces', 2);

app.use((req, res, next) => {
  // avoid noisy logging for GET/static requests
  if (req.method === 'GET') {
    console.log(`${req.method} ${req.path}`);
  } else {
    console.log(`${req.method} ${req.path}`, req.body);
  }
  next();
});

const customerRoutes = require('./src/routes/customerRoutes');
const employeeRoutes = require('./src/routes/employeeRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
