import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="navbar">
        <h1>HRMS Lite</h1>
        <ul>
          <li><Link to="/">Employees</Link></li>
          <li><Link to="/attendance">Attendance</Link></li>
        </ul>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;