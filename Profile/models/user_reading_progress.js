// Reading Progress
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReadingProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookId: { type: String, required: true },
  deviceId: { type: Schema.Types.ObjectId, ref: 'UserDevice' },
  currentPosition: { type: Schema.Types.Mixed, required: true }, // {chapter, page, offset}
  progressPercentage: { type: Number, default: 0 },
  lastReadAt: { type: Date, default: Date.now },
  readingTimeMinutes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReadingProgress', ReadingProgressSchema);
