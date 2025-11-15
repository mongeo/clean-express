const pool = require("../config/db");

async function listServices(req, res) {
  const result = await pool.query(
    "SELECT * FROM services WHERE is_active = TRUE"
  );
  res.json(result.rows);
}
async function createService(req, res) {
  const { name, description, base_duration_min, base_price_cents } = req.body;
  const result = await pool.query(
    `INSERT INTO services (name, description, base_duration_min, base_price_cents) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, description, base_duration_min, base_price_cents]
  );
  res.status(201).json(result.rows[0]);
}
module.exports = { listServices, createService };
