const pool = require("../config/db");

async function listAppointments(req, res) {
  const result = await pool.query("SELECT * FROM appointments");
  res.json(result.rows);
}
async function createAppointment(req, res) {
  const {
    customer_id,
    cleaner_id,
    service_id,
    address_id,
    start_at,
    end_at,
    status,
    price_cents,
    currency,
    notes,
  } = req.body;
  const result = await pool.query(
    `INSERT INTO appointments (customer_id, cleaner_id, service_id, address_id, start_at, end_at, status, price_cents, currency, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    [
      customer_id,
      cleaner_id,
      service_id,
      address_id,
      start_at,
      end_at,
      status,
      price_cents,
      currency,
      notes,
    ]
  );
  res.status(201).json(result.rows[0]);
}
module.exports = { listAppointments, createAppointment };
