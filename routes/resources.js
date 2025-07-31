const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads (store in memory for dummy)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'video/mp4', 'video/mpeg', 'video/quicktime', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/epub+zip', 'application/octet-stream'];
    if (allowedTypes.includes(file.mimetype) || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Admin and Faculty can upload resources
router.post('/', authenticateToken, authorizeRoles('Admin', 'Faculty'), upload.single('file'), resourceController.uploadResource);

// Admin and Faculty can edit resources
router.put('/:id', authenticateToken, authorizeRoles('Admin', 'Faculty'), resourceController.editResource);

// Admin and Faculty can delete resources
router.delete('/:id', authenticateToken, authorizeRoles('Admin', 'Faculty'), resourceController.deleteResource);

// All authenticated users can view resources
router.get('/', authenticateToken, resourceController.listResources);

module.exports = router;
