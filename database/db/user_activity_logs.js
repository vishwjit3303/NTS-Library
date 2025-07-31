const mongoose = require('mongoose');
const { Schema } = mongoose;   

const UserActivityLogSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  activityType: { type: String, required: true },
  bookId: String,
  details: { type: Schema.Types.Mixed, default: {} },
  ipAddress: String,
  userAgent: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('UserActivityLog', UserActivityLogSchema);