const express = require('express');
const {
  createPayment,
  verifyPayment,
  getPaymentStatus
} = require('../controllers/paymentController');

const router = express.Router();

// Route to create a new payment order
router.post('/', createPayment);

// Route to verify the payment after the payment is made
router.post('/verify', verifyPayment);

// Route to get the status of a payment by order ID
router.get('/:orderId/status', getPaymentStatus);

module.exports = router;
