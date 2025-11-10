const pool = require("./config/db");
const fs = require("fs");

// Ensure extensions/tables exist on startup (local dev convenience)
async function applySchema() {
  try {
    const schemaSql = fs.readFileSync("./src/schema.sql", "utf8");
    await pool.query(schemaSql);
    console.log("Database schema applied successfully.");
  } catch (error) {
    console.error("Error applying database schema:", error);
  } finally {
    await pool.end(); // Close the connection pool
  }
}

module.exports = { applySchema };
