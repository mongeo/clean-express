require('dotenv').config();

const { Pool } = require("pg");

// Create a connection pool using environment variables from .env
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
  // ssl: { rejectUnauthorized: false } // If deploying to Heroku/AWS RDS, uncomment for SSL
});

// Export the pool for use elsewhere in your app
module.exports = pool;
