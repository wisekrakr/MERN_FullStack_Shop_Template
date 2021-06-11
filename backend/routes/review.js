const express = require("express");
const router = express.Router();

const { postReview } = require("../controllers/reviewController");

const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/auth");

router.route("/products/:id/post").post(isAuthenticatedUser, postReview);

// Admin Routes

module.exports = router;
