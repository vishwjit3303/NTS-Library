const Resource = require('../database/db/resource.schema');

exports.uploadResource = async (req, res) => {
  try {
    const { title, type, subject, author } = req.body;
    if (!title || !type || !subject || !author) {
      return res.status(400).json({ message: 'Title, type, subject, and author are required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Resource file is required' });
    }
    // In real app, store the file properly and get the URL
    const fileUrl = `http://dummyurl.com/files/${req.file.originalname}`;

    const newResource = new Resource({
      title,
      type,
      subject,
      author,
      fileUrl,
      uploadedBy: req.user.id,
      uploadDate: new Date(),
    });
    await newResource.save();
    res.status(201).json({ message: 'Resource uploaded successfully', resource: newResource });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.editResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    // Only uploader or Admin can edit
    if (resource.uploadedBy.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied: cannot edit this resource' });
    }
    const { title, type, subject, author } = req.body;
    if (title) resource.title = title;
    if (type) resource.type = type;
    if (subject) resource.subject = subject;
    if (author) resource.author = author;

    await resource.save();
    res.json({ message: 'Resource updated', resource });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    // Only uploader or Admin can delete
    if (resource.uploadedBy.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied: cannot delete this resource' });
    }
    await Resource.deleteOne({ _id: resourceId });
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.listResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
