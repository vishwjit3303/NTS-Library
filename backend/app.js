const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reviewRoutes = require('./routes/reviewRoutes');
const bookComments=require('./routes/comments');
const app = express();
const PORT = 5000;


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); 
  }
};

connectDB();
// Middleware
app.use(express.json());

app.use('/books', reviewRoutes);
app.use('/books', bookComments);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
