# express-pg-min

Minimal Express + PostgreSQL scaffold with pg Pool, dotenv, and a sample users CRUD.

## Setup
1. Create database (psql):
   - CREATE DATABASE mydb;
   - \c mydb
   - -- user and password as needed

2. Configure environment:
   - Copy .env and set DATABASE_URL

3. Install:
   - npm install

4. Run:
   - npm run dev  # with nodemon
   - npm start    # plain node

5. Test:
   - curl http://localhost:3000/health
   - curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Ada","email":"ada@example.com"}'
   - curl http://localhost:3000/users


cleaner-service-app/
│
├── backend/                    # Express + Node.js backend API
│   ├── controllers/            # Route controllers
│   ├── routes/                 # Express route definitions
│   ├── models/                 # Database models / schema files
│   ├── config/                 # Configuration (db.js, env, etc.)
│   ├── seed/                   # Seed scripts for initial data
│   ├── middleware/             # Express middleware (auth, logging, etc.)
│   ├── app.js                  # Express app bootstrap
│   ├── server.js               # Start server (listen)
│   ├── .env                    # Environment variables 
|   └── package.json            # Backend dependencies
│
├── frontend/                   # React (or other) frontend app
│   ├── public/                 # Static assets like index.html, favicon
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # App-level pages (Home, Dashboard, Booking, etc.)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API service functions (fetchers)
│   │   ├── styles/             # CSS/SCSS files or styled-components
│   │   ├── App.js              # React root component and routing setup
│   │   └── index.js            # React entry point
│   └── package.json            # Frontend dependencies
│
├── .gitignore
├── package.json               # Root-level scripts and dependencies (can be empty)
└── README.md
