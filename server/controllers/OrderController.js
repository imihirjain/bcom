const Order = require('../models/Order');
const Payment = require('../models/Payment');
const { sendOrderConfirmationEmail } = require('../config/mailer');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    // Log the entire request body to check if it is being received correctly
    console.log("Request Body:", req.body);

    const { cartItems, totalPrice, paymentData, userDetails } = req.body;

    // Log the userDetails to ensure they're present
    console.log("User Details:", userDetails);

    // Check for missing user details and return early if any are missing
    if (!userDetails || !userDetails.name || !userDetails.phone || !userDetails.email || !userDetails.address) {
      console.log("User details are missing or incomplete:", userDetails);
      return res.status(400).json({ message: 'User details are missing or incomplete.' });
    }

    // Create a new order instance and log the details
    const newOrder = new Order({
      cartItems,
      totalPrice,
      paymentData,
      userDetails,
      status: 'Pending',
    });

    // Log new order details before saving
    console.log("New Order Details:", newOrder);

    // Save the order in the database and log the result
    const savedOrder = await newOrder.save();
    console.log("Order created successfully:", savedOrder);

    // Send order confirmation email and log the attempt
    console.log("Attempting to send order confirmation email to:", userDetails.email);
    await sendOrderConfirmationEmail(userDetails.email, savedOrder);
    console.log("Order confirmation email sent successfully.");

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

    // Check the status of the payment and update the order accordingly
    const order = await Order.findById(payment.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (payment.status === 'Success') {
      order.status = 'Completed';
      await order.save();

      // Send order confirmation email after payment success
      await sendOrderConfirmationEmail(order.userDetails.email, order);

      res.status(200).json({ message: 'Order updated to Completed successfully', order });
    } else if (payment.status === 'Failed') {
      order.status = 'Failed';
      await order.save();
      res.status(400).json({ message: 'Payment failed, order status updated to Failed' });
    } else {
      res.status(400).json({ message: 'Payment is not completed yet, order remains Pending' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get order details by order ID
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      console.log("Order not found for ID:", orderId);
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
    console.log("Fetched all orders:", orders);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
