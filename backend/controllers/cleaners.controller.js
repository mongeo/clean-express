const pool = require("../config/db");

async function listCleaners(req, res) {
  const result = await pool.query("SELECT * FROM cleaners");
  res.json(result.rows);
}
async function createCleaner(req, res) {
  const { cleaner_id, bio } = req.body;
  const result = await pool.query(
    `INSERT INTO cleaners (cleaner_id, bio) VALUES ($1, $2) RETURNING *`,
    [cleaner_id, bio]
  );
  res.status(201).json(result.rows[0]);
}
module.exports = { listCleaners, createCleaner };
