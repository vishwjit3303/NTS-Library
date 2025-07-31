
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookId: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  reviewText: String,
  isVerifiedPurchase: { type: Boolean, default: false },
  
  totalVotes: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'deleted'], default: 'published' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);