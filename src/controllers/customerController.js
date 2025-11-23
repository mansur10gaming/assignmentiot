const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { firstName, lastName, email, phone, address } = req.body;

    if (!firstName || !lastName || !email || !phone) {
      console.log('Missing fields:', { firstName, lastName, email, phone });
      return res.status(400).json({ message: 'firstName, lastName, email, and phone are required' });
    }

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(409).json({ message: 'Customer with this email already exists' });
    }

    const customer = new Customer({
      firstName,
      lastName,
      email,
      phone,
      address
    });

    await customer.save();
    console.log('Customer created:', customer);
    res.status(201).json({ message: 'Customer created successfully', customer });
  } catch (error) {
    console.error('Customer creation error:', error);
    res.status(500).json({ message: 'Error creating customer', error: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({ count: customers.length, customers });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customers', error: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customer', error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address } = req.body;

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (email && email !== customer.email) {
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      customer.email = email;
    }

    if (firstName) customer.firstName = firstName;
    if (lastName) customer.lastName = lastName;
    if (phone) customer.phone = phone;
    if (address) customer.address = address;

    await customer.save();
    res.status(200).json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Error updating customer', error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully', customer });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting customer', error: error.message });
  }
};
