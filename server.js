import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
// import connectDB from './config/db.js'; // MongoDB connection removed

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Routes

import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import resourceRoutes from './routes/resources.js';
import adminRoutes from './routes/admin.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// API Documentation
const swaggerDocument = YAML.load('./docs/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Use auth routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/resources', resourceRoutes);
app.use('/admin', adminRoutes);

// Error handling middleware
import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
