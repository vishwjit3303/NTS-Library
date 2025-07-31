const mongoose = require('mongoose');

const userDeviceSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },


  device_name: { 
    type: String, 
    required: true,
    maxlength: 100 },


  device_type: { 
    type: String,
     required: true,
      maxlength: 50 },


  device_id: {
     type: String,
     required: true,
    unique: true,
     maxlength: 255 },


  device_location: {
    type: String,
    maxlength: 255 //  adjust as per your requirements
  },
  platform: { 
    type: String, 
    maxlength: 50 },


  app_version: {
     type: String,
      maxlength: 20 },


  last_sync_at: {
     type: Date },

     
  is_active: {
     type: Boolean,
      default: true },


  created_at: {
     type: Date, 
     default: Date.now },


  updated_at: {
     type: Date, 
     default: Date.now }
});

module.exports = mongoose.model('UserDevice', userDeviceSchema);