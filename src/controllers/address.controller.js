const pool = require("../config/db");

async function listAddresses(req, res) {
  const result = await pool.query("SELECT * FROM addresses");
  res.json(result.rows);
}
async function createAddress(req, res) {
  const {
    user_id,
    label,
    line1,
    line2,
    city,
    state,
    postal_code,
    country_code,
    latitude,
    longitude,
  } = req.body;
  const result = await pool.query(
    `INSERT INTO addresses (user_id, label, line1, line2, city, state, postal_code, country_code, latitude, longitude) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      user_id,
      label,
      line1,
      line2,
      city,
      state,
      postal_code,
      country_code,
      latitude,
      longitude,
    ]
  );
  res.status(201).json(result.rows[0]);
}
module.exports = { listAddresses, createAddress };
