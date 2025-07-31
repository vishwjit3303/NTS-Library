import express from 'express';
import { body } from 'express-validator';
import {
  registerUser,
  loginUser,
  refreshToken,
  resetPassword,
  verifyEmail,
} from '../controllers/authController.js';

const router = express.Router();

// Register user
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['Admin', 'Student', 'Faculty']).withMessage('Role must be Admin, Student, or Faculty'),
  ],
  registerUser
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginUser
);

// Refresh token
router.post('/refresh-token', refreshToken);

// Reset password
router.post('/reset-password', [body('email').isEmail().withMessage('Valid email is required')], resetPassword);

// Verify email
router.get('/verify-email', verifyEmail);

export default router;
