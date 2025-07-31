const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// Password reset request (dummy)
router.post('/password-reset', authController.passwordResetRequest);

// Password reset confirm (dummy)
router.post('/password-reset/confirm', authController.passwordResetConfirm);

// Email verification (dummy)
router.get('/verify-email', authController.verifyEmail);

module.exports = router;
