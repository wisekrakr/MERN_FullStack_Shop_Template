const express = require("express");
const router = express.Router();

const {
  getCurrentUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserDetails,
  updateUserProfileByAdmin,
  deleteUser,
} = require("../controllers/userController");

const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/auth");

router.route("/me").get(isAuthenticatedUser, getCurrentUserProfile);
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

// Admin routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getAllUsers);
router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getUserDetails)
  .put(
    isAuthenticatedUser,
    authorizationRoles("admin"),
    updateUserProfileByAdmin
  )
  .delete(isAuthenticatedUser, authorizationRoles("admin"), deleteUser);

module.exports = router;
