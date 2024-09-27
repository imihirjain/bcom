const Order = require('../models/Order');
const Payment = require('../models/Payment');
const { sendOrderConfirmationEmail } = require('../config/mailer');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { cartItems, totalPrice, paymentData, userDetails } = req.body;

    // Ensure the user is authenticated
    const userId = req.user ? req.user._id : null;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing. Please make sure you are logged in.' });
    }

    // Check for missing user details
    if (!userDetails || !userDetails.name || !userDetails.phone || !userDetails.email || !userDetails.address) {
      return res.status(400).json({ message: 'User details are missing or incomplete.' });
    }

    // Create a new order instance
    const newOrder = new Order({
      cartItems,
      totalPrice,
      paymentData,
      userDetails,
      userId,  // Include userId here
      status: 'Completed',
    });

    // Save the order in the database
    const savedOrder = await newOrder.save();

    // Send order confirmation email
    await sendOrderConfirmationEmail(userDetails.email, savedOrder);

    // Return the response with the saved order
    return res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });

  } catch (error) {
    console.error("Error creating order:", error.message);
    return res.status(500).json({
      message: 'Error creating order',
      error: error.message,
    });
  }
};

// Update order status based on payment
exports.updateOrderStatus = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    // Verify the payment
    const payment = await Payment.findOne({ razorpay_order_id });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update the order status if payment is successful
    if (payment.status === 'Success') {
      const order = await Order.findById(payment.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.status = 'Completed';
      await order.save();

      // Send order confirmation email after successful payment
      await sendOrderConfirmationEmail(order.userDetails.email, order);

      res.status(200).json({ message: 'Order updated successfully', order });
    } else {
      res.status(400).json({ message: 'Payment is not successful, order status cannot be updated' });
    }
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get order details by order ID
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error.message);
    res.status(500).json({ message: error.message });
  }
};


// Get all orders for a specific user
exports.getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ userId: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error.message);
    res.status(500).json({ message: 'Error fetching user orders' });
  }
};


// Get all orders (admin use)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
