const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserLibrarySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  bookId: { type: String, required: true },
  accessType: { type: String, enum: ['purchased', 'subscription', 'free'], required: true },
  purchaseDate: Date,
  accessExpiresAt: Date,
  downloadCount: { type: Number, default: 0 },
  isDownloaded: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: false });


module.exports = mongoose.model('UserLibrary',UserLibrarySchema);




