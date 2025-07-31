const bcrypt = require('bcrypt');

const users = [
  // Sample user for testing
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('12345678', 10), // hashed password
    role: 'Admin',
    profilePicture: '',
    preferences: {},
    readingHistory: [],
    bookmarks: [],
    emailVerified: true,
  },
];

const resources = [
  // Sample resource for testing
  {
    id: 1,
    title: 'Sample Book',
    type: 'book',
    subject: 'Mathematics',
    author: 'John Doe',
    fileUrl: 'http://example.com/sample-book.pdf',
    uploadedBy: 1, // user id
    uploadDate: new Date(),
  },
];

module.exports = {
  users,
  resources,
};
