import mongoose from "mongoose";

const userActivityLogs = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel',
    required: true,
    index: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'books',
    required: true,
    index: true
  },
  genre: {
    type: String,
  },
  author: {
    type: String,
    required: true
  },
  tags: {
    type: [String],  
    default: []
  },
  activity: {
    type: String,
    enum: ['read', 'liked'],
    required: true
  }
}, { timestamps: true });


const activity = mongoose.model('useractivitylogs',userActivityLogs)
export default activity