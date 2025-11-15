const express = require("express");
const router = express.Router();
const appointments = require("../controllers/appointments.controller");

router.get("/", appointments.listAppointments); // GET /appointments
//router.get("/:id", appointments.getAppointment); // GET /appointments/:id
router.post("/", appointments.createAppointment); // POST /appointments
//router.put("/:id", appointments.updateAppointment); // PUT /appointments/:id
//router.delete("/:id", appointments.deleteAppointment); // DELETE /appointments/:id (optional)

module.exports = router;
