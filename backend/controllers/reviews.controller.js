const pool = require("../config/db");

async function listReviews(req, res) {
  const result = await pool.query("SELECT * FROM reviews");
  res.json(result.rows);
}
async function createReview(req, res) {
  const { appointment_id, customer_id, cleaner_id, rating, comment } = req.body;
  const result = await pool.query(
    `INSERT INTO reviews (appointment_id, customer_id, cleaner_id, rating, comment)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [appointment_id, customer_id, cleaner_id, rating, comment]
  );
  res.status(201).json(result.rows[0]);
}
module.exports = { listReviews, createReview };
