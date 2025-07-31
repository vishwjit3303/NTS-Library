const User = require('../database/db/user.schema');
const Resource = require('../database/db/resource.schema');

// Get all users with pagination
exports.listUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const users = await User.find()
      .select('-password_hash')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalUsers = await User.countDocuments();
    res.json({ users, totalUsers, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user role or status
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, status } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (role) user.role = role;
    if (status) user.status = status;

    await user.save();
    const updatedUser = user.toObject();
    delete updatedUser.password_hash;
    res.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.deleteOne({ _id: id });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// List all resources with pagination
exports.listResources = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const resources = await Resource.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalResources = await Resource.countDocuments();
    res.json({ resources, totalResources, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });

    await Resource.deleteOne({ _id: id });
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get system statistics
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalResources = await Resource.countDocuments();
    // Add more stats as needed
    res.json({ totalUsers, totalResources });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
