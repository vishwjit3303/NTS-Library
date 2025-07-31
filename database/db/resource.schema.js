const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  type: {
    type: String,
    required: true,
    maxlength: 100,
  },
  subject: {
    type: String,
    required: true,
    maxlength: 255,
  },
  author: {
    type: String,
    required: true,
    maxlength: 255,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);
