import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState('');
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ date: '', status: 'Present' });
  const [error, setError] = useState('');

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees`);
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [filterDate, setFilterDate] = useState('');

  const fetchRecords = async (empId) => {
    if (!empId) return;
    try {
      const res = await axios.get(`${API_BASE}/attendances/${empId}`);
      setRecords(res.data);
    } catch (err) {
      setError('Failed to load attendance');
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  useEffect(() => { fetchRecords(selected); }, [selected]);

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!selected) { setError('Select employee'); return; }
    const emp = employees.find(emp=>emp.employeeId===selected);
    try {
      await axios.post(`${API_BASE}/attendances`, { employeeId: selected, ...form });
      fetchRecords(selected);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to mark');
    }
  };

  return (
    <div>
      <h2>Attendance</h2>
      <div className="form">
        <select value={selected} onChange={e=>setSelected(e.target.value)}>
          <option value="">-- select employee --</option>
          {employees.map(emp=><option key={emp.id} value={emp.employeeId}>{emp.fullName}</option>)}
        </select>
        {selected && (
          <form onSubmit={handleSubmit} className="form-inline">
            <input type="date" name="date" value={form.date} onChange={handleChange} />
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Present</option>
              <option>Absent</option>
            </select>
            <button type="submit">Mark</button>
          </form>
        )}
        {selected && (
          <div className="form-inline">
            <label>Filter by date:</label>
            <input type="date" value={filterDate} onChange={e=>setFilterDate(e.target.value)} />
          </div>
        )}
      </div>
      {error && <p className="error">{error}</p>}
      {records.length > 0 ? (
        <>
        <p>Total present: {records.filter(r=>r.status==='Present').length}</p>
        <table className="table">
          <thead><tr><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {(filterDate ? records.filter(r=>r.date===filterDate) : records).map(r=><tr key={r.id}><td>{r.date}</td><td>{r.status}</td></tr>)}
          </tbody></table>
        </>
      ) : selected && <p>No records</p>}
    </div>
  );
}

export default Attendance;