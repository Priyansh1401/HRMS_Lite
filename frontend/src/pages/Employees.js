import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employeeId: '', fullName: '', email: '', department: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/employees`);
      setEmployees(res.data);
    } catch (err) {
      setError('Failed to load employees');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(`${API_BASE}/employees`, form);
      setForm({ employeeId: '', fullName: '', email: '', department: '' });
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await axios.delete(`${API_BASE}/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      setError('Failed to delete');
    }
  };

  return (
    <div>
      <h2>Employees</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="employeeId" placeholder="ID" value={form.employeeId} onChange={handleChange} />
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Dept</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td><button onClick={() => handleDelete(emp.id)}>Delete</button></td>
              </tr>
            ))}
            {employees.length === 0 && <tr><td colSpan="5">No employees found</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Employees;