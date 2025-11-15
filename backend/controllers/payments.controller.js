const pool = require("../config/db");

async function listPayments(req, res) {
  const result = await pool.query("SELECT * FROM payments");
  res.json(result.rows);
}
async function createPayment(req, res) {
  const {
    appointment_id,
    amount_cents,
    currency,
    payment_status,
    provider,
    provider_ref,
  } = req.body;
  const result = await pool.query(
    `INSERT INTO payments (appointment_id, amount_cents, currency, payment_status, provider, provider_ref)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      appointment_id,
      amount_cents,
      currency,
      payment_status,
      provider,
      provider_ref,
    ]
  );
  res.status(201).json(result.rows[0]);
}
module.exports = { listPayments, createPayment };
