const pool = require("../config/db");

// Create
async function createUser(req, res) {
  const { name, email } = req.body || {};
  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: "name and email are required" });
  }
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name.trim(), email.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "email already exists" });
    console.error(err);
    res.status(500).json({ error: "internal error" });
  }
}

// List (with simple pagination + search)
async function listUsers(req, res) {
  const { q, limit = 20, offset = 0 } = req.query;
  const lim = Math.min(parseInt(limit, 10) || 20, 100);
  const off = parseInt(offset, 10) || 0;
  try {
    if (q && q.trim()) {
      const { rows } = await pool.query(
        `SELECT * FROM users
         WHERE name ILIKE '%' || $1 || '%' OR email ILIKE '%' || $1 || '%'
         ORDER BY created_at DESC
         LIMIT $2 OFFSET $3`,
        [q.trim(), lim, off]
      );
      return res.json(rows);
    }
    const { rows } = await pool.query(
      `SELECT * FROM users
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [lim, off]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal error" });
  }
}

// Read by id
async function getUser(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (!rows.length) return res.status(404).json({ error: "not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal error" });
  }
}

// Patch update
async function updateUser(req, res) {
  const { id } = req.params;
  const fields = [];
  const values = [];
  let i = 1;

  ["name", "email"].forEach((k) => {
    if (req.body?.[k] !== undefined) {
      fields.push(`${k} = $${i++}`);
      values.push(req.body[k]);
    }
  });

  if (!fields.length)
    return res.status(400).json({ error: "no fields to update" });

  try {
    const { rows } = await pool.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`,
      [...values, id]
    );
    if (!rows.length) return res.status(404).json({ error: "not found" });
    res.json(rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "email already exists" });
    console.error(err);
    res.status(500).json({ error: "internal error" });
  }
}

// Delete
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);
    if (!rowCount) return res.status(404).json({ error: "not found" });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal error" });
  }
}

module.exports = {
  createUser,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
};
