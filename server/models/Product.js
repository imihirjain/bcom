const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, enum: ['small', 'medium', 'large', 'xl', 'xxl'], required: true },
  images: [String],
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Product', productSchema);
