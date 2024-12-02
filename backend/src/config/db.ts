import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config(); 

const connectDB = async () => {
    try {


        // Mongoose connection
        await mongoose.connect(process.env.MONGO_URI as string, {
            serverSelectionTimeoutMS: 30000, 
        });


        console.log(colors.green('✅ Connected to MongoDB'));
    } catch (error: any) {
        console.error(colors.red('❌ Failed to connect to MongoDB:'), error.message);
        process.exit(1); 
    }
};

mongoose.set('debug', true);

export default connectDB;
