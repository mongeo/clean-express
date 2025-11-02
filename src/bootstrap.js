const pool = require("./config/db");

// Ensure extensions/tables exist on startup (local dev convenience)
async function ensureSchema() {
  // Enable pgcrypto for gen_random_uuid (or swap to uuid-ossp)
  await pool.query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
}

module.exports = { ensureSchema };
