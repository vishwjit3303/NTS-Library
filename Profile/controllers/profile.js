const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/user.schema");
const Bookmark = require("../models/user_bookmarks");
const ReadingProgress = require("../models/user_reading_progress");
const UserCoinBalance = require("../models/userCoinBalance.schema");
const userCoinTransaction = require("../models/userCoinTransaction.schema");
const UserActivityLog = require("../models/user_activity_logs");
const UserAchievement = require("../models/user_achievements");
const UserInterest = require("../models/user_interest.schema");

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const user = await User.findById(req.user.id).select("-password_hash");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in getProfile:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update user profile
exports.updateProfile = [
  // Validation rules
  body("first_name")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("First name must be a string with max length 100"),
  body("last_name")
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Last name must be a string with max length 100"),
  // Controller logic
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Request user:", req.user, "New data:", req.body);
      const { first_name, last_name } = req.body;
      const updateData = {};
      if (first_name) updateData.first_name = first_name;
      if (last_name) updateData.last_name = last_name;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updateData, updated_at: Date.now() },
        { new: true, runValidators: true }
      ).select("-password_hash");

      if (!user) return res.status(404).json({ msg: "User not found" });
      res.json(user);
    } catch (err) {
      console.error("Error in updateProfile:", err);
      res.status(500).json({ msg: "Server error" });
    }
  },
];

// Get reading history
exports.getReadingHistory = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const readingHistory = await ReadingProgress.find({ userId: req.user.id })
      .populate("userId", "username email")
      .sort({ lastReadAt: -1 });
    res.json(readingHistory);
  } catch (err) {
    console.error("Error in getReadingHistory:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get bookmarks
exports.getBookmarks = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const bookmarks = await Bookmark.find({ userId: req.user.id })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (err) {
    console.error("Error in getBookmarks:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Remove bookmark
exports.removeBookmark = [
  // Validation rules
  body("bookId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Book ID must be a non-empty string"),
  // Controller logic
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("Request user:", req.user, "Book ID:", req.body.bookId);
      const bookmark = await Bookmark.findOneAndDelete({
        userId: req.user.id,
        bookId: req.body.bookId,
      });
      if (!bookmark) return res.status(404).json({ msg: "Bookmark not found" });
      res.json({ msg: "Bookmark removed", bookmark });
    } catch (err) {
      console.error("Error in removeBookmark:", err);
      res.status(500).json({ msg: "Server error" });
    }
  },
];

// Get user coin balance
exports.getCoins = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const coinBalance = await UserCoinBalance.findOne({ user_id: req.user.id });
    if (!coinBalance)
      return res.status(404).json({ msg: "Coin balance not found" });
    res.status(200).json({ total_coins: coinBalance.total_coins });
  } catch (err) {
    console.error("Error in getCoins:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get user transaction history
exports.getUserTransaction = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const transactions = await userCoinTransaction
      .find({ user_id: req.user.id })
      .populate("user_id", "username email")
      .sort({ created_at: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.error("Error in getUserTransaction:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get user activity
exports.getUserActivity = async (req, res) => {
  try {
    console.log("Request user:", req.user);
    const activities = await UserActivityLog.find({ userId: req.user.id })
      .populate("userId", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json(activities);
  } catch (err) {
    console.error("Error in getUserActivity:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// Get user achievements
// Get user achievements
exports.getUserAchievements = async (req, res) => {
  try {
    // Get user_id from authenticated user
    const userId = req.user.id;

    // Validate userId is a valid ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Find user achievements by user_id
    const userAchievements = await UserAchievement.findOne({ user_id: userId });

    // Check if user has achievements
    if (!userAchievements || !userAchievements.achievements.length) {
      return res.status(200).json({
        success: true,
        totalAchievements: 0,
        achievements: [],
        message: "No achievements found for this user",
      });
    }

    // Extract total number and details (title, description, icon_url) of achievements
    const totalAchievements = userAchievements.achievements.length;
    const achievements = userAchievements.achievements.map((achievement) => ({
      title: achievement.title,
      description: achievement.description || "No description available",
      icon_url: achievement.icon_url || "No icon available",
    }));

    // Return response
    return res.status(200).json({
      success: true,
      totalAchievements,
      achievements,
    });
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching achievements",
      error: error.message,
    });
  }
};

// Edit user profile
exports.editProfile = async (req, res) => {
  try {
    // Get user_id from authenticated user
    const userId = req.user._id;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Extract fields from request body
    const { profile_image_url, about, interests } = req.body;

    // Validate inputs
    if (interests && !Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: "Interests must be an array of strings",
      });
    }
    if (interests && interests.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Interests exceed the limit of 50",
      });
    }
    if (profile_image_url && typeof profile_image_url !== "string") {
      return res.status(400).json({
        success: false,
        message: "Profile image URL must be a string",
      });
    }
    if (about && typeof about !== "string") {
      return res.status(400).json({
        success: false,
        message: "About must be a string",
      });
    }

    // Update User model (profile_image_url and about)
    const userUpdate = {};
    if (profile_image_url !== undefined)
      userUpdate.profile_image_url = profile_image_url;
    if (about !== undefined) userUpdate.about = about;
    if (Object.keys(userUpdate).length > 0) {
      userUpdate.updated_at = Date.now();
    }

    let updatedUser = null;
    if (Object.keys(userUpdate).length > 0) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: userUpdate },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    // Update or create UserInterest document
    let updatedInterests = null;
    if (interests) {
      updatedInterests = await UserInterest.findOneAndUpdate(
        { user_id: userId },
        {
          $set: {
            interests,
            updated_at: Date.now(),
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
    }

    // Fetch updated data for response
    const user = await User.findById(userId).select("profile_image_url about");
    const userInterests = await UserInterest.findOne({
      user_id: userId,
    }).select("interests");

    return res.status(200).json({
      success: true,
      data: {
        profile_image_url: user?.profile_image_url || "",
        about: user?.about || "",
        interests: userInterests?.interests || [],
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating profile",
      error: error.message,
    });
  }
};
