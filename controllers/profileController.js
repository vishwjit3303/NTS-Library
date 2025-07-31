import {
  findUserById,
  updateUser,
} from '../models/User.js';
import { validationResult } from 'express-validator';

// Get current user profile
export const getProfile = (req, res, next) => {
  try {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // Exclude sensitive fields
    const { password, resetPasswordToken, resetPasswordExpires, emailVerificationToken, emailVerificationExpires, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    next(error);
  }
};

// Update profile
export const updateProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const updates = req.body;

  try {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update allowed fields
    const allowedFields = ['name', 'email', 'profilePicture', 'preferences'];
    const filteredUpdates = {};
    allowedFields.forEach(field => {
      if (updates[field] !== undefined) {
        filteredUpdates[field] = updates[field];
      }
    });

    const updatedUser = updateUser(user.id, filteredUpdates);

    // Exclude sensitive fields
    const { password, resetPasswordToken, resetPasswordExpires, emailVerificationToken, emailVerificationExpires, ...safeUser } = updatedUser;

    res.json({ success: true, user: safeUser });
  } catch (error) {
    next(error);
  }
};

// Get reading history
export const getReadingHistory = (req, res, next) => {
  try {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, readingHistory: user.readingHistory || [] });
  } catch (error) {
    next(error);
  }
};

// Get bookmarks
export const getBookmarks = (req, res, next) => {
  try {
    const user = findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, bookmarks: user.bookmarks || [] });
  } catch (error) {
    next(error);
  }
};
