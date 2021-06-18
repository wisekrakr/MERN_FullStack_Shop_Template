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

router.route("/categories").get(getAllCategories);
router.route("/category/:id").get(getCategoryById);

// Admin Routes
router
  .route("/admin/categories/post")
  .post(isAuthenticatedUser, authorizationRoles("admin"), postCategory);

router
  .route("/admin/category/:id")
  .put(isAuthenticatedUser, authorizationRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizationRoles("admin"), deleteCategory);

module.exports = router;
