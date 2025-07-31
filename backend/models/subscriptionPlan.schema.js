const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'free',
        'basic',
        'standard',
        'premium',
        'academic',
        'corporate',
      ],
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
      maxlength: 3,
    },
    billing_cycle: {
      type: String,
      enum: ['monthly', 'yearly', 'lifetime'],
    },
    features: {
      type: Object,
      default: {},
    },
    max_downloads: {
      type: Number,
    },
    max_devices: {
      type: Number,
      default: 5,
    },
    offline_access: {
      type: Boolean,
      default: false,
    },
    premium_content_access: {
      type: Boolean,
      default: false,
    },
    ads_free: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'subscription_plans',
  }
);

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);