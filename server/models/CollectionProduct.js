const mongoose = require('mongoose');

const collectionProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, enum: ['small', 'medium', 'large', 'xl', 'xxl'], required: true },
  images: [String],
  price: { type: Number, required: true },
  description: { type: String },
  collection: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }
});

module.exports = mongoose.model('CollectionProduct', collectionProductSchema);
