const express = require("express");
const router = express.Router();

const {
  postReview,
  getAllReviewsForOneProductById,
  getReviewById,
} = require("../controllers/reviewController");

const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/auth");

router.route("/product/:id/post").post(isAuthenticatedUser, postReview);
router
  .route("/product/:id/reviews")
  .get(isAuthenticatedUser, getAllReviewsForOneProductById);
router.route("/review/:id").get(isAuthenticatedUser, getReviewById);

// Admin Routes

module.exports = router;
