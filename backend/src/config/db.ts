import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      serverSelectionTimeoutMS: 20000,
    });

    console.log(colors.green('✅ Connected to MongoDB'));
  } catch (error: any) {
    console.error(colors.red('❌ Failed to connect to MongoDB:'), error.message);
    process.exit(1);
  }
};

mongoose.set('debug', true);

mongoose.connection.on('connected', () => {
  console.log(colors.green('🟢 Mongoose connected to DB'));
});

mongoose.connection.on('error', (err) => {
  console.error(colors.red(`🔴 Mongoose connection error: ${err}`));
});

mongoose.connection.on('disconnected', () => {
  console.log(colors.yellow('🟡 Mongoose disconnected'));
});

export default connectDB;
