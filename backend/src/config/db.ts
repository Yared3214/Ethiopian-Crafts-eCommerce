// src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI as string; // Ensure MONGO_URI is defined
        await mongoose.connect(mongoURI);
        console.log(colors.america('Connected to MongoDB'));
    } catch (error) {
        console.error(colors.red('Failed to connect to MongoDB:'), error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;
