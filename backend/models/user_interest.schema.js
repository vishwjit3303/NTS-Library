const mongoose = require('mongoose');

const userInterestSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
    unique: true
  },
  interests: {
    type: [String],
    default: [],
    validate: [arrayLimit, '{PATH} exceeds the limit of 50']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

function arrayLimit(val) {
  return val.length <= 50;
}



module.exports = mongoose.model('UserInterest', userInterestSchema);
