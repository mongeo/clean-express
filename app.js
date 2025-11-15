const express = require("express");
require("dotenv").config();

const { applySchema } = require("./src/config/bootstrap");
const usersRoutes = require("./src/routes/users.routes");

const app = express();
app.use(express.json());

// Health
app.get("/health", (req, res) => res.json({ ok: true }));

// Route registration
app.use("/users", require("./src/routes/users.routes"));
app.use("/addresses", require("./src/routes/addresses.routes"));
app.use("/cleaners", require("./src/routes/cleaners.routes"));
app.use("/services", require("./src/routes/services.routes"));
app.use("/appointments", require("./src/routes/appointments.routes"));
app.use("/payments", require("./src/routes/payments.routes"));
app.use("/reviews", require("./src/routes/reviews.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

applySchema();
