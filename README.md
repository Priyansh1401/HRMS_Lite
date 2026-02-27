# HRMS Lite

A lightweight Human Resource Management System built as a full-stack web application. The project demonstrates employee management and attendance tracking with a professional UI, RESTful API backend, and SQLite persistence.

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express, Sequelize
- **Database:** SQLite (via Sequelize)
- **Deployment:** Frontend could be hosted on Vercel/Netlify, backend on Render/Railway

## Features

- Add/view/delete employees
- Mark daily attendance (present/absent)
- View attendance per employee
- Filter attendance by date
- Display total present days per employee
- Responsive, clean UI with loading and error states

## Setup Instructions

### Backend
```
cd backend
npm install
node server.js
```
Server runs at `http://localhost:4000` by default.

### Frontend
```
cd frontend
npm install
npm start
```
Frontend runs at `http://localhost:3000` and communicates with backend via `REACT_APP_API_BASE` environment variable.

### Notes
- The SQLite database file `hrms.sqlite` is created automatically in the backend folder.
- Basic validation for required fields and unique constraints are implemented.

## Assumptions & Limitations

- No authentication; single admin assumed.
- Only core functionality implemented; no advanced HR features.
- Data persistence is local; for production consider PostgreSQL or MongoDB.

## Deployment

To deploy, push code to GitHub then host backend on a service like Render or Railway and frontend on Vercel or Netlify. Update `REACT_APP_API_BASE` in the frontend with the live backend URL before building.

## Repository & Demo Links

- **GitHub Repository:** https://github.com/Priyansh1401/HRMS_Lite
- **Live Application URL:** *(replace with actual URL after deployment)*

When the app is deployed, ensure the frontend is configured to use the live backend address so the demo works without errors.


