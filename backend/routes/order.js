const express = require("express");
const router = express.Router();

const {
  postOrder,
  getOrderById,
  getCurrentUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  isAuthenticatedUser,
  authorizationRoles,
} = require("../middleware/auth");

router.route("/orders/post").post(isAuthenticatedUser, postOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderById);
router.route("/orders/me").get(isAuthenticatedUser, getCurrentUserOrders);

// Admin Routes
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizationRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizationRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizationRoles("admin"), deleteOrder);

module.exports = router;
