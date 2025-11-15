const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews.controller");

router.get("/", reviews.listReviews); // GET /reviews
//router.get("/:id", reviews.getReview); // GET /reviews/:id (optional)
router.post("/", reviews.createReview); // POST /reviews
//router.put("/:id", reviews.updateReview); // PUT /reviews/:id (optional)
//router.delete("/:id", reviews.deleteReview); // DELETE /reviews/:id (optional)

module.exports = router;
