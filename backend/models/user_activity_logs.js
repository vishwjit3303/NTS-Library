const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookMetadataSchema = new Schema({
  title: String,
  author: [String],
  genre: [String],
  language: String,
  publishedYear: Number,
  contentType: String,
  tags: [String]
}, { _id: false });

const UserActivityLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: {
    type: String,
    required: true,
    enum: ['view_book', 'read_book', 'rate_book', 'add_to_favorites', 'like', 'review','refered','completed', 'shared','add_to_cart']
  },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
  bookMetadata: { type: BookMetadataSchema },
  details: { type: Schema.Types.Mixed, default: {} },
  ipAddress: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserActivityLog', UserActivityLogSchema);
