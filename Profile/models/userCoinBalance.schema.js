const mongoose = require('mongoose');

const userCoinBalanceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
      unique: true, // Each user hvae  unique coin balance 
    },


    total_coins: {
      type: Number,
      required: true,
      default: 0,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },

  {
    collection: 'user_coin_balances',
  }
);


module.exports = mongoose.model('UserCoinBalance', userCoinBalanceSchema);