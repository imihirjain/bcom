const Order = require('../models/Order');
const Payment = require('../models/Payment');
const { sendOrderConfirmationEmail } = require('../config/mailer');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Log the entire request body to check if it is being received correctly

    const { cartItems, totalPrice, paymentData, userDetails } = req.body;

    // Log the userDetails to ensure they're present

    // Check for missing user details and return early if any are missing
    if (!userDetails || !userDetails.name || !userDetails.phone || !userDetails.email || !userDetails.address) {
      return res.status(400).json({ message: 'User details are missing or incomplete.' });
    }

    // Create a new order instance and log the details
    const newOrder = new Order({
      cartItems,
      totalPrice,
      paymentData,
      userDetails,
      status: 'Completed',
    });

    // Log new order details before saving

    // Save the order in the database and log the result
    const savedOrder = await newOrder.save();

    // Send order confirmation email and log the attempt
    await sendOrderConfirmationEmail(userDetails.email, savedOrder);

    // Return the response with the saved order
    return res.status(201).json({
      message: 'Order created successfully',
      order: savedOrder,
    });

  } catch (error) {
    // Catch and log any errors that occur during order creation or email sending
    console.error("Error creating order or sending email:", error.message);
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
    // Verify the payment using the Payment model (already separated)
    const payment = await Payment.findOne({ orderId: razorpay_order_id });
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update the order status based on successful payment
    if (payment.status === 'Success') {
      const order = await Order.findById(payment.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      order.status = 'Completed';
      await order.save();


      // Send order confirmation email after payment success
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

// Get all orders (for admin use)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
