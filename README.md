# Cleaner Service App

## Overview
The Cleaner Service App is a full-stack web application designed to manage cleaning services, appointments, users, cleaners, payments, and reviews. It features a React frontend and a Node.js/Express backend, with PostgreSQL as the database.

## Features
- User management (create, view, update, delete users)
- Service offerings management
- Appointment scheduling and tracking
- Cleaner profiles and availability
- Payment processing overview
- Customer reviews and ratings
- Responsive React frontend with navigation and dashboard
- RESTful API backend with secure PostgreSQL database

## Technology Stack
- Frontend: React, React Router, JavaScript, CSS
- Backend: Node.js, Express.js, PostgreSQL
- Database: PostgreSQL with schema management scripts
- Tools: dotenv for environment configs, pg for database pooling

## Installation and Setup

### Prerequisites
- Node.js (v14+ recommended)
- PostgreSQL database
- npm (Node package manager)

### Backend Setup
1. Navigate to the backend folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Configure your `.env` file with database credentials (e.g. PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT).
4. Apply the database schema:
   ```
   node config/bootstrap.js
   ```
5. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React development server:
   ```
   npm start
   ```
4. Access the app at `http://localhost:3000`

## Usage
- Use the dashboard page to access all major sections: Users, Services, Appointments, etc.
- Manage users and services through their respective pages.
- Schedule and view appointments.
- Cleaners, payments, and reviews are also accessible for management.

## Project Structure
```
cleaner-service-app/
├── backend/        # Express API server, database schema, and config
├── frontend/       # React app source code with components, pages, and services
└── README.md       # Project overview and setup instructions
```

## API Endpoints (Examples)
- `GET /users` - list all users
- `POST /services` - add a new service
- `GET /appointments` - list appointments
- And others for cleaners, payments, reviews...

## Contributing
Feel free to fork the repo, make improvements, fix bugs, and open pull requests.

## License
This project is licensed under the MIT License.

***
