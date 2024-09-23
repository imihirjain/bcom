const crypto = require('crypto'); // Import the crypto module
const razorpay = require('../config/razorpayConfig');
const Payment = require('../models/Payment');

// Create a new payment order
exports.createPayment = async (req, res) => {
  const { amount, currency } = req.body;
  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
    receipt: `receipt_order_${Math.random() * 1000}` // generating a random receipt number
  };
  
  try {
    const order = await razorpay.orders.create(options);
    
    // Save the order details in your database if needed
    const payment = new Payment({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 'Created',
    });
    await payment.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify payment signature (for security purposes)
exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Generate HMAC with razorpay_order_id and razorpay_payment_id using the key secret
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest('hex');

  try {
    if (generatedSignature === razorpay_signature) {
      // If signature matches, mark the payment as verified and save it
      const payment = await Payment.findOne({ orderId: razorpay_order_id });
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      payment.paymentId = razorpay_payment_id;
      payment.signature = razorpay_signature;
      payment.status = 'Success';

      await payment.save();

      res.status(200).json({ message: 'Payment verified successfully', payment });
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get payment status by order ID
exports.getPaymentStatus = async (req, res) => {
  const { orderId } = req.params;

  try {
    const payment = await Payment.findOne({ orderId });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
