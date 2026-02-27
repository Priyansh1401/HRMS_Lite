const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize, Employee, Attendance } = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Employee routes
app.post('/api/employees', async (req, res) => {
  try {
    const { employeeId, fullName, email, department } = req.body;
    if (!employeeId || !fullName || !email || !department) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existing = await Employee.findOne({ where: { employeeId } });
    if (existing) {
      return res.status(409).json({ message: 'Employee ID already exists' });
    }
    const emailExists = await Employee.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    const newEmp = await Employee.create({ employeeId, fullName, email, department });
    res.status(201).json(newEmp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const list = await Employee.findAll();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const emp = await Employee.findByPk(id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    await emp.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Attendance routes
app.post('/api/attendances', async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;
    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const emp = await Employee.findOne({ where: { employeeId } });
    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const entry = await Attendance.create({ date, status, EmployeeId: emp.id });
    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/attendances/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params;
    const emp = await Employee.findOne({ where: { employeeId } });
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    const records = await Attendance.findAll({ where: { EmployeeId: emp.id } });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// sync and start
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 4000, () => {
    console.log('Server running');
  });
});
