const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

// All routes require authentication and Admin role
router.use(authenticateToken);
router.use(authorizeRoles('Admin'));

// User management
router.get('/users', adminController.listUsers);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Content management
router.get('/resources', adminController.listResources);
router.delete('/resources/:id', adminController.deleteResource);

// System statistics
router.get('/stats', adminController.getStats);

module.exports = router;
