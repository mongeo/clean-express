const express = require("express");
const router = express.Router();
const services = require("../controllers/services.controller");

router.get("/", services.listServices); // GET /services
//router.get("/:id", services.getService); // GET /services/:id (optional)
router.post("/", services.createService); // POST /services
//router.put("/:id", services.updateService); // PUT /services/:id (optional)
//router.delete("/:id", services.deleteService); // DELETE /services/:id (optional)

module.exports = router;
