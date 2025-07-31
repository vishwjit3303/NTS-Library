const mongoose = require('mongoose');
const { Schema } = mongoose;   
const UserPreferencesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  readingSettings: { type: Schema.Types.Mixed, default: {} },
  notificationSettings: { type: Schema.Types.Mixed, default: {} },
  privacySettings: { type: Schema.Types.Mixed, default: {} },
  syncSettings: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('UserPreferences', UserPreferencesSchema);
// This schema is used to store customizable settings for individual users such as:
// How they read content (readingSettings)
// What notifications they want (notificationSettings)
// What’s visible or private (privacySettings)
// How and when things sync across devices (syncSettings)
 