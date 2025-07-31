const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    index: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100,
    index: true
  },
  password_hash: {
    type: String,
    required: true,
    maxlength: 255
  },
  first_name: {
    type: String,
    maxlength: 100
  },
  last_name: {
    type: String,
    maxlength: 100
  },
  profile_image_url: {
    type: String
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    maxlength: 20
  },
  date_of_birth: {
    type: Date
  },
  preferred_language: {
    type: String,
    default: 'en',
    maxlength: 10
  },
  timezone: {
    type: String,
    default: 'UTC',
    maxlength: 50
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
    maxlength: 20
  },
  last_login_at: {
    type: Date
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

module.exports = mongoose.model('User', userSchema);