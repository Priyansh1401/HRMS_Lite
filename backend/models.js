const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'hrms.sqlite'),
  logging: false,
});

const Employee = sequelize.define('Employee', {
  employeeId: { type: DataTypes.STRING, unique: true, allowNull: false },
  fullName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  department: { type: DataTypes.STRING, allowNull: false },
});

const Attendance = sequelize.define('Attendance', {
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('Present','Absent'), allowNull: false },
});

Employee.hasMany(Attendance);
Attendance.belongsTo(Employee);

module.exports = { sequelize, Employee, Attendance };
