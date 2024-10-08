const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController'); // Make sure this path is correct
const { protect } = require('../middleware/authMiddleware');

// Create a new order (user must be authenticated)
router.post('/orders',protect, orderController.createOrder);

// Update order status after payment (user must be authenticated)
router.post('/orders/update-status', orderController.updateOrderStatus);

// Get order by ID (user must be authenticated)
router.get('/orders/:orderId', orderController.getOrderById);

// Get all orders for a specific user (user must be authenticated)
router.get('/user/:userId',  orderController.getOrdersByUserId);
 // Fix: Make sure this is correctly imported

// Get all orders (admin use)
router.get('/orders', orderController.getAllOrders);

module.exports = router;
