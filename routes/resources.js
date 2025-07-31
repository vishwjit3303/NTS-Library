import express from 'express';
import { body, param } from 'express-validator';
import {
  uploadResource,
  editResource,
  deleteResource,
  listResourcesHandler,
  getResourceDetails,
  getDummyBooks,
} from '../controllers/resourcesController.js';
import { protect } from '../middleware/auth.js';
import { authorizeRoles } from '../middleware/role.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads (local filesystem)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Public route to get dummy books metadata
router.get('/dummy-books', protect, getDummyBooks);

// Protected routes
router.use(protect);

router.get('/', listResourcesHandler);
router.get('/:id', [
  param('id').notEmpty().withMessage('Resource ID is required'),
], getResourceDetails);

router.post(
  '/',
  authorizeRoles('Admin', 'Faculty'),
  upload.single('file'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('subject').notEmpty().withMessage('Subject is required'),
    body('type').notEmpty().withMessage('Type is required'),
  ],
  uploadResource
);

router.patch(
  '/:id',
  authorizeRoles('Admin', 'Faculty'),
  editResource
);

router.delete(
  '/:id',
  authorizeRoles('Admin', 'Faculty'),
  deleteResource
);

export default router;
