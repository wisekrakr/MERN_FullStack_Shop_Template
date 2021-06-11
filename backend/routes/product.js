const express = require("express");
const router = express.Router();

const {
  postProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProductById);

// Admin Routes
router
  .route("/admin/products/post")
  .post(isAuthenticatedUser, authorizationRoles("admin"), postProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizationRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizationRoles("admin"), deleteProduct);

module.exports = router;
