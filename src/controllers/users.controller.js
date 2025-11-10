const pool = require("../config/db");
const bcrypt = require("bcrypt");

async function listUsers(req, res) {
  const result = await pool.query("SELECT * FROM users WHERE is_active = TRUE");
  res.json(result.rows);
}
async function getUser(req, res) {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  if (result.rowCount === 0)
    return res.status(404).json({ error: "User not found" });
  res.json(result.rows[0]);
}
async function createUser(req, res) {
  const { role, full_name, email, phone_e164, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (role, full_name, email, phone_e164, password_hash) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [role, full_name, email, phone_e164, password_hash]
  );
  res.status(201).json(result.rows[0]);
}
async function updateUser(req, res) {
  const { id } = req.params;
  const { full_name, email, phone_e164, role, is_active } = req.body;
  const result = await pool.query(
    `UPDATE users SET full_name = $1, email = $2, phone_e164 = $3, role = $4, is_active = $5, updated_at = now() 
      WHERE user_id = $6 RETURNING *`,
    [full_name, email, phone_e164, role, is_active, id]
  );
  if (result.rowCount === 0)
    return res.status(404).json({ error: "User not found" });
  res.json(result.rows[0]);
}
async function deleteUser(req, res) {
  const { id } = req.params;
  await pool.query("UPDATE users SET is_active = FALSE WHERE user_id = $1", [
    id,
  ]);
  res.json({ success: true });
}
module.exports = { 
  listUsers, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
};