import express from 'express';
import { body, param } from 'express-validator';
import {
  getProfile,
  updateProfile,
  getReadingHistory,
  getBookmarks,
} from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get current user profile
router.get('/', protect, getProfile);

// Update profile
router.patch(
  '/',
  protect,
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('profilePicture').optional().isString(),
    body('preferences').optional().isObject(),
  ],
  updateProfile
);

// Get reading history
router.get('/history', protect, getReadingHistory);

// Get bookmarks
router.get('/bookmarks', protect, getBookmarks);

export default router;
