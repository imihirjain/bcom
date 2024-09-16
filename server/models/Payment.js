const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { 
    type: String, 
    required: true 
  },
  paymentId: { 
    type: String 
  },
  signature: { 
    type: String 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    required: true 
  },
  receipt: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['Created', 'Success', 'Failed'], 
    default: 'Created' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
