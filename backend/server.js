// backend/server.js
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Auto-load all schema files from models/
const loadSchemas = () => {
  const modelsPath = path.join(__dirname, 'models');
  fs.readdirSync(modelsPath).forEach(file => {
    if (file.endsWith('.js')) {
      require(path.join(modelsPath, file));
      console.log(`Loaded schema: ${file}`);
    }
  });
};

// Create empty collections if not already present
const createCollections = async () => {
  const modelNames = mongoose.modelNames();
  for (const modelName of modelNames) {
    const collectionName = mongoose.model(modelName).collection.collectionName;
    const exists = await mongoose.connection.db.listCollections({ name: collectionName }).hasNext();
    if (!exists) {
      await mongoose.connection.createCollection(collectionName);
      console.log(`Created collection: ${collectionName}`);
    } else {
      console.log(`Collection already exists: ${collectionName}`);
    }
  }
};

const main = async () => {
  await connectDB();
  loadSchemas();
  await createCollections();
  await mongoose.disconnect();
  console.log('🔌 Disconnected from MongoDB');
};

main();
