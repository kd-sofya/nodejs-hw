import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRouter from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();

async function startServer() {
  try {
    await connectMongoDB();

    app.use(logger);
    app.use(cors());
    app.use(cookieParser());

    app.use(express.json());

    app.use(authRoutes);
    app.use(notesRouter);
    app.use(userRoutes);

    app.use(notFoundHandler);
    app.use(errors());
    app.use(errorHandler);

    const PORT = Number(process.env.PORT) || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
