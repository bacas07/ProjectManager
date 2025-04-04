import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log('> Server connected to MongoDB');

    mongoose.connection.on('disconnected', () => {
      console.log('> Closed connection to MongoDB');
    });

    process.on('SIGINT', async (): Promise<void> => {
      await mongoose.connection.close();
      console.log('> Connection closed due to application termination');
      process.exit(0);
    });
  } catch (error) {
    console.error(`> MongoDB connection error: ${(error as Error).message}`);
    process.exit(1);
  }
};
