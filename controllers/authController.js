import {
  findUserByEmail,
  addUser,
  updateUser,
  findUserById,
} from '../models/User.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Helper to generate JWT tokens
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// Register user
export const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    let user = findUserByEmail(email);
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Generate email verification token
    const emailToken = crypto.randomBytes(20).toString('hex');

    user = await addUser({
      name,
      email,
      password,
      role,
      emailVerificationToken: emailToken,
      emailVerificationExpires: Date.now() + 3600000, // 1 hour
    });

    // TODO: Send verification email with token (stub for now)
    console.log(`Verify email token for ${email}: ${emailToken}`);

    res.status(201).json({
      success: true,
      message: 'User registered. Please verify your email.',
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Bypass email verification for testing
    // Comment out or remove the email verification check
    /*
    if (!user.isEmailVerified) {
      return res.status(403).json({ success: false, message: 'Email not verified' });
    }
    */

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

// Refresh token
export const refreshToken = (req, res, next) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ success: false, message: 'Refresh token required' });
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ success: true, accessToken });
  });
};

// Reset password
export const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    updateUser(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: Date.now() + 3600000, // 1 hour
    });

    // TODO: Send reset password email with token (stub for now)
    console.log(`Reset password token for ${email}: ${resetToken}`);

    res.json({ success: true, message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};

// Verify email
export const verifyEmail = async (req, res, next) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ success: false, message: 'Verification token required' });
  }

  try {
    const user = Object.values(await import('../data/inMemoryDB.js')).find(
      (u) =>
        u.emailVerificationToken === token &&
        u.emailVerificationExpires > Date.now()
    );

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    updateUser(user.id, {
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    });

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};
