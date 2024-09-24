const nodemailer = require('nodemailer');

// Configure transporter with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send Order Confirmation Email
const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: 'Order Confirmation',
    html: `
      <h3>Thank you for your order!</h3>
      <p>Your order has been placed successfully. Here are the details:</p>
      <ul>
        ${orderDetails.cartItems.map(item => `
          <li>
            <strong>${item.name}</strong>: ${item.quantity} x ₹${item.price} <br/>
            Size: ${item.size || 'N/A'} | Collection: ${item.collection || 'N/A'}
          </li>
        `).join('')}
      </ul>
      <p>Total Price: ₹${orderDetails.totalPrice}</p>
      <p>Order Status: ${orderDetails.status}</p>
      <p>Order ID: ${orderDetails._id}</p>
    `,
  };

  // Log the mail options for debugging

  try {
    // Verify transporter configuration
    await transporter.verify();

    // Attempt to send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Log the error with more details
    console.error('Error sending email:', error.message);
  }
};

module.exports = { sendOrderConfirmationEmail };
