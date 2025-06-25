const Review = require("../models/reviewModel");

// get all reviews
const getReviewsService = async (bookId) => {
  return await Review.find({ book: bookId }).populate("user", "username");
};

// add review
const addReviewService = async (bookId, userId, data) => {
  return await Review.create({ ...data, book: bookId, user: userId });
};

// update review
const updateReviewService = async (bookId, reviewId, data, userId) => {
  return await Review.findOneAndUpdate(
    { _id: reviewId, book: bookId, user: userId },
    data,
    { new: true }
  );
};

// delete review
const deleteReviewService = async (bookId, reviewId, userId) => {
  return await Review.findOneAndDelete({ _id: reviewId, book: bookId, user: userId });
};

module.exports = { getReviewsService, addReviewService, updateReviewService, deleteReviewService };
