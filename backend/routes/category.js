const express = require("express");
const router = express.Router();

const {
  postCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/auth");

// Admin Routes
router
  .route("/admin/categories/post")
  .post(isAuthenticatedUser, authorizationRoles("admin"), postCategory);
router
  .route("/admin/category/:id")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getCategoryById);
router
  .route("/admin/categories")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getAllCategories);
router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizationRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizationRoles("admin"), deleteCategory);

module.exports = router;
