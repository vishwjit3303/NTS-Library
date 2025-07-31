import {
  findUserById,
} from '../models/User.js';
import { validationResult } from 'express-validator';

// Get user profile by ID (Admin only)
export const getUserById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const user = findUserById(id);
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
