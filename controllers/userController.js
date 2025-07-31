const User = require('../database/db/user.schema');

exports.getOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password_hash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateOwnProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name, email, profilePicture, preferences } = req.body;
    if (name) user.username = name;
    if (email) user.email = email;
    if (profilePicture) user.profile_image_url = profilePicture;
    // Assuming preferences is a field in user schema, if not, remove or adjust accordingly
    if (preferences) user.preferences = preferences;

    await user.save();
    const updatedUser = user.toObject();
    delete updatedUser.password_hash;
    res.json({ message: 'Profile updated', profile: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getReadingHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('readingHistory');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.readingHistory || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('bookmarks');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.bookmarks || []);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await User.find().select('-password_hash');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
