const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription'
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  currency: {
    type: String,
    default: 'USD',
    maxlength: 3
  },
  payment_method: {
    type: String,
    required: true,
    maxlength: 50
  },
  payment_provider: {
    type: String,
    required: true,
    maxlength: 50
  },
  provider_transaction_id: {
    type: String,
    maxlength: 255
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
    index: true
  },
  payment_date: {
    type: Date,
    default: Date.now
  },
  failure_reason: {
    type: String
  },
  metadata: {
    type: Object,
    default: {}
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
