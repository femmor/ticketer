import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDb } from './database/connectDb.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

// dotenv config
dotenv.config();

// Start App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(errorMiddleware);

// Routes
app.use('/api/users', userRoutes);

// Define port
const PORT = process.env.PORT || 3005;

// Run server and connect to DB
const startServer = () => {
  try {
    connectDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log('Error starting the server: ', error);
  }
};

startServer();
