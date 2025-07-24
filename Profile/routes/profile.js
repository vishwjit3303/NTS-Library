const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const profileCtrl = require("../controllers/profile");

// Get user profile
router.get("/me", auth, profileCtrl.getProfile);

// Update user profile
router.put("/me", auth, profileCtrl.updateProfile);

router.put("/me", auth, profileCtrl.editProfile);

// Get reading history
router.get("/history", auth, profileCtrl.getReadingHistory);

// Get bookmarks
router.get("/bookmarks", auth, profileCtrl.getBookmarks);

// Remove bookmark
router.delete("/bookmarks", auth, profileCtrl.removeBookmark);

// Get coin balance
router.get("/coins", auth, profileCtrl.getCoins);

// Get transaction history
router.get("/transactions", auth, profileCtrl.getUserTransaction);

// Get user activity
router.get("/activity", auth, profileCtrl.getUserActivity);

// Get user achievements
router.get("/achievements", auth, profileCtrl.getUserAchievements);

module.exports = router;
