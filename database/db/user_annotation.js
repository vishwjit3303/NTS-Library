
const mongoose = require('mongoose');
const { Schema } = mongoose;
const AnnotationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookId: { type: String, required: true },
  type: { type: String, enum: ['highlight', 'note', 'bookmark'], required: true },
  startPosition: { type: Schema.Types.Mixed, required: true },
  endPosition: Schema.Types.Mixed,
  selectedText: String,
  noteText: String,
  color: { type: String, default: 'yellow' },
  isPrivate: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Annotation', AnnotationSchema);