const express = require("express");
const router = express.Router();
const payments = require("../controllers/payments.controller");

router.get("/", payments.listPayments); // GET /payments
//router.get("/:id", payments.getPayment); // GET /payments/:id (optional)
router.post("/", payments.createPayment); // POST /payments
//router.put("/:id", payments.updatePayment); // PUT /payments/:id (optional)
//router.delete("/:id", payments.deletePayment); // DELETE /payments/:id (optional)

module.exports = router;
