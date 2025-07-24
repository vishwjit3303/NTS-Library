const mongoose = require('mongoose');

const userCoinTransactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true, 
    },

    activity: {
      type: String,
      required: true,
      maxlength: 100,
      },
    //  activety like user_login, user_readings, purchase, etc whatevr we want to add

    coins: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: ['credit', 'debit'],
      maxlength: 10,
    },
    description: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'user_coin_transactions',
  }
);

module.exports = mongoose.model('userCoinTransaction', userCoinTransactionSchema);