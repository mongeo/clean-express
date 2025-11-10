const express = require("express");
const router = express.Router();
const addresses = require("../controllers/addresses.controller");

router.get("/", addresses.listAddresses); // GET /addresses
router.post("/", addresses.createAddress); // POST /addresses

module.exports = router;
