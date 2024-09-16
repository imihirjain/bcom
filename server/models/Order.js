const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      name: { type: String, required: true },
      description: String,
      image: String,
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, default: 1 },
      size: { type: String },
      collection: { type: String },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentData: {
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
