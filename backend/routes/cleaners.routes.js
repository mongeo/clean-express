const express = require("express");
const router = express.Router();
const cleaners = require("../controllers/cleaners.controller");

router.get("/", cleaners.listCleaners); // GET /cleaners
//router.get("/:id", cleaners.getCleaner); // Optional: for GET /cleaners/:id
router.post("/", cleaners.createCleaner); // POST /cleaners
//router.put("/:id", cleaners.updateCleaner); // Optional: for PUT /cleaners/:id
//router.delete("/:id", cleaners.deleteCleaner); // Optional: soft-delete/true delete

module.exports = router;
