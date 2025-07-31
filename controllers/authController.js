const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/db/user.schema');
const { secretKey } = require('../middleware/authMiddleware');

function generateToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: '1h' }
  );
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      username: name,
      password_hash: passwordHash,
      role,
      email_verified: false,
    });
    await newUser.save();
    // In real app, send verification email here
    res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!user.email_verified) {
      return res.status(403).json({ message: 'Email not verified' });
    }
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.passwordResetRequest = (req, res) => {
  // Dummy implementation: just respond success
  res.json({ message: 'Password reset link sent (dummy)' });
};

exports.passwordResetConfirm = (req, res) => {
  // Dummy implementation: just respond success
  res.json({ message: 'Password has been reset (dummy)' });
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification link' });
    }
    user.email_verified = true;
    await user.save();
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
