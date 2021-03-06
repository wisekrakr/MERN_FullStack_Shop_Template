const express = require("express");
const router = express.Router();

const {
  postReview,
  getAllReviewsForOneProductById,
  getReviewById,
  deleteReview,
} = require("../controllers/reviewController");

const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/auth");

router.route("/product/:id/post").post(isAuthenticatedUser, postReview);
router
  .route("/product/:id/reviews")
  .get(isAuthenticatedUser, getAllReviewsForOneProductById);
router
  .route("/review/:id")
  .get(isAuthenticatedUser, getReviewById)
  .delete(isAuthenticatedUser, deleteReview);

// Admin Routes

module.exports = router;
