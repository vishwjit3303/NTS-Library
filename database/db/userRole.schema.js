const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
  user_id: 
  { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true },


  role_id: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Role', 
     required: true },


  assigned_at: {
     type: Date, 
     default: Date.now }
     
});



module.exports = mongoose.model('UserRole', userRoleSchema);