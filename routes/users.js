const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// Get own profile
router.get('/me', authenticateToken, userController.getOwnProfile);

// Edit own profile
router.put('/me', authenticateToken, userController.updateOwnProfile);

// Get reading history
router.get('/me/reading-history', authenticateToken, userController.getReadingHistory);

// Get bookmarks
router.get('/me/bookmarks', authenticateToken, userController.getBookmarks);

// Admin can view all profiles
router.get('/', authenticateToken, authorizeRoles('Admin'), userController.getAllProfiles);

module.exports = router;
