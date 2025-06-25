const {
  getReviewsService,
  addReviewService,
  updateReviewService,
  deleteReviewService,
} = require("../services/reviewService");

const getBookReviews = async (req, res) => {
  try {
    const result = await getReviewsService(req.params.id);
    res.status(200).json({ message: "Reviews fetched", reviews: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBookReview = async (req, res) => {
  try {
    const result = await addReviewService(req.params.id, req.user._id, req.body);
    res.status(201).json({ message: "Review added", review: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBookReview = async (req, res) => {
  try {
    const result = await updateReviewService(req.params.id, req.params.reviewId, req.body, req.user._id);
    res.status(200).json({ message: "Review updated", review: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBookReview = async (req, res) => {
  try {
    const result = await deleteReviewService(req.params.id, req.params.reviewId, req.user._id);
    res.status(200).json({ message: "Review deleted", review: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBookReviews, addBookReview, updateBookReview, deleteBookReview };
