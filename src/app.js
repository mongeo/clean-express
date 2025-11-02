const express = require("express");
require("dotenv").config();

const { ensureSchema } = require("./bootstrap");
const usersRoutes = require("./routes/users.routes");

const app = express();
app.use(express.json());

// Health
app.get("/health", (req, res) => res.json({ ok: true }));

// Routes
app.use("/users", usersRoutes);

// Start server after optional bootstrap
const port = process.env.PORT || 3000;

ensureSchema()
  .catch((e) => {
    console.error("Bootstrap failed (continuing):", e);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`API running on http://localhost:${port}`);
    });
  });
