const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Route for placing an order (common for both user and admin)
router.post('/orders', async (req, res) => {
  try {
    const { cartItems, totalPrice, paymentData } = req.body;

    const newOrder = new Order({
      cartItems,
      totalPrice,
      paymentData,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error placing order', error });
  }
});

// Route for admin to get all orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// Route for user to get their order details based on order ID
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error });
  }
});

module.exports = router;
