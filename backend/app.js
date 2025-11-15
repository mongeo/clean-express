require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { applySchema } = require("./config/bootstrap");

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Health
app.get("/health", (req, res) => res.json({ ok: true }));

// Route registration
app.use("/users", require("./routes/users.routes"));
app.use("/addresses", require("./routes/addresses.routes"));
app.use("/cleaners", require("./routes/cleaners.routes"));
app.use("/services", require("./routes/services.routes"));
app.use("/appointments", require("./routes/appointments.routes"));
app.use("/payments", require("./routes/payments.routes"));
app.use("/reviews", require("./routes/reviews.routes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

//applySchema();

module.exports = app;