const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, department, salary, hireDate } = req.body;

    if (!firstName || !lastName || !email || !phone || !department) {
      return res.status(400).json({ message: 'firstName, lastName, email, phone, and department are required' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(409).json({ message: 'Employee with this email already exists' });
    }

    const employee = new Employee({
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      salary,
      hireDate
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ count: employees.length, employees });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employees', error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving employee', error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, position, department, salary, hireDate } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (email && email !== employee.email) {
      const existingEmployee = await Employee.findOne({ email });
      if (existingEmployee) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      employee.email = email;
    }

    if (firstName) employee.firstName = firstName;
    if (lastName) employee.lastName = lastName;
    if (phone) employee.phone = phone;
    if (position) employee.position = position;
    if (department) employee.department = department;
    if (salary !== undefined) employee.salary = salary;
    if (hireDate) employee.hireDate = hireDate;

    await employee.save();
    res.status(200).json({ message: 'Employee updated successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully', employee });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error: error.message });
  }
};
