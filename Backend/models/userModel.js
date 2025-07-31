import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Enter first name"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Enter last name"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  password: {
    type: String, 
    required: [true, "Password is required"],
  },
  profile_image_url: {
    type: String
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  date_of_birth: {
    type: Date
  },
  preferred_language: {
    type: String,
    default: 'en',
    maxlength: 10
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'deleted'],
    default: 'active',
    maxlength: 20
  },
}, {
  timestamps: true, 
});

const User = mongoose.model("users", userSchema);
export default User;
