const mongoose = require('mongoose');
const { Schema } = mongoose;
const BookmarkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookId: { type: String, required: true },
  position: { type: Schema.Types.Mixed, required: true },
  note: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);

