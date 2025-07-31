const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },

  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],

  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },

  replies: [{
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);

