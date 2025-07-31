import bcrypt from 'bcrypt';

const users = [];
const resources = [];

// User helper functions
export const findUserByEmail = (email) => {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id) => {
  return users.find((user) => user.id === id);
};

export const addUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = {
    id: (users.length + 1).toString(),
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    role: userData.role,
    profilePicture: userData.profilePicture || null,
    preferences: userData.preferences || {},
    readingHistory: [],
    bookmarks: [],
    isEmailVerified: false,
    emailVerificationToken: userData.emailVerificationToken || null,
    emailVerificationExpires: userData.emailVerificationExpires || null,
    resetPasswordToken: null,
    resetPasswordExpires: null,
  };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id, updates) => {
  const user = findUserById(id);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
};

// Resource helper functions
export const findResourceById = (id) => {
  return resources.find((resource) => resource.id === id);
};

export const addResource = (resourceData) => {
  const newResource = {
    id: (resources.length + 1).toString(),
    ...resourceData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  resources.push(newResource);
  return newResource;
};

export const updateResource = (id, updates) => {
  const resource = findResourceById(id);
  if (!resource) return null;
  Object.assign(resource, updates);
  resource.updatedAt = new Date();
  return resource;
};

export const deleteResource = (id) => {
  const index = resources.findIndex((resource) => resource.id === id);
  if (index === -1) return false;
  resources.splice(index, 1);
  return true;
};

export const listResources = (filters = {}, page = 1, limit = 10) => {
  let filtered = resources;

  if (filters.subject) {
    filtered = filtered.filter((r) => r.subject === filters.subject);
  }
  if (filters.type) {
    filtered = filtered.filter((r) => r.type === filters.type);
  }
  if (filters.author) {
    filtered = filtered.filter((r) => r.author === filters.author);
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paged = filtered.slice(start, end);

  return {
    total,
    page,
    totalPages: Math.ceil(total / limit),
    resources: paged,
  };
};

export { users, resources };
