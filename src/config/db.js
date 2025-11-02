const { Pool } = require("pg");
require("dotenv").config();

const isSsl = process.env.PGSSL === "true";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isSsl ? { rejectUnauthorized: false } : undefined,
});

// Optional: global error safety for idle clients
pool.on("error", (err) => {
  console.error("Unexpected PG pool error", err);
  process.exit(1);
});

module.exports = pool;
