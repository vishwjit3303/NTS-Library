import express from 'express';
import { param } from 'express-validator';
import { getUserById } from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/role.js';

const router = express.Router();

// Get any user profile by ID (Admin only)
router.get(
  '/users/:id',
  protect,
  authorizeRoles('Admin'),
  [param('id').isMongoId().withMessage('Valid user ID is required')],
  getUserById
);

export default router;
