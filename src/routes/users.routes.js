const express = require("express");
const users = require("../controllers/users.controller");
const router = express.Router();

router.post("/", users.createUser);
router.get("/", users.listUsers);
router.get("/:id", users.getUser);
router.patch("/:id", users.updateUser);
router.delete("/:id", users.deleteUser);

module.exports = router;