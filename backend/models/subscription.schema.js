const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },


    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubscriptionPlan',
      required: true,
                  },


    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired', 'paused'],
      default: 'active',
      index: true,},


    start_date: {
      type: Date,
      default: Date.now,},


    end_date: {
      type: Date,
    },
    
    
    auto_renew: {
      type: Boolean,
      default: true,
    },
    
    
    payment_method_id: {
      type: String,
      maxlength: 255,
    },


    trial_end_date: {
      type: Date,
    },

    cancelled_at: {
      type: Date,
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
    collection: 'subscriptions',
  }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);