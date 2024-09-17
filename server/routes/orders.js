const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

// Create a new order
router.post('/orders', orderController.createOrder);

// Update order status after payment
router.post('/orders/update-status', orderController.updateOrderStatus);

// Get order by ID
router.get('/orders/:orderId', orderController.getOrderById);

// Get all orders (admin)
router.get('/orders', orderController.getAllOrders);

module.exports = router;
