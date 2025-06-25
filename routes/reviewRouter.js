const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getBookReviews,
  addBookReview,
  updateBookReview,
  deleteBookReview
} = require("../controllers/reviewController");
const verifyToken = require("../middleware/userAuth");

// Book-protected routes
router.get("/", getBookReviews);
router.post("/", verifyToken, addBookReview);
router.put("/:reviewId", verifyToken, updateBookReview);
router.delete("/:reviewId", verifyToken, deleteBookReview);

module.exports = router;
