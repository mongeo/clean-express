const express = require("express");
const router = express.Router();
const addresses = require("../controllers/addresses.controller");

router.get("/", addresses.listAddresses); // GET /addresses
router.get("/:id", addresses.getAddress); // GET /address by id
router.post("/", addresses.createAddress); // POST /addresses

module.exports = router;
