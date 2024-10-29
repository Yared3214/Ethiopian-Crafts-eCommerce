// src/app.ts
import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes'
import artisanRoutes from './routes/artisan.routes'

import colors from 'colors';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to the database
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/artisan', artisanRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(colors.cyan.bold(`Server is running on port ${PORT}`));
});
