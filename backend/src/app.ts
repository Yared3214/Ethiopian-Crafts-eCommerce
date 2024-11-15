// src/app.ts
import express from 'express';
import connectDB from './config/db';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import artisanRoutes from './routes/artisan.routes';
import productRoutes from './routes/product.routes';
import reviewRoutes from './routes/review.routes';
import cartRoutes from './routes/cart.routes'

import cors from 'cors'; // Import CORS
import colors from 'colors';

const app = express();
const PORT = process.env.PORT || 3000;

// Define CORS options
const corsOptions = {
    origin: [
        'https://your-frontend-domain.com', // Replace with your frontend URL
        'http://localhost:3000',            // Allow local development (if applicable)
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (like cookies)
};

// Middleware
app.use(cors(corsOptions)); // Use CORS with specified options
app.use(express.json());

// Connect to the database
connectDB();

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/artisan', artisanRoutes);
app.use('/api/product', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(colors.cyan.bold(`Server is running on port ${PORT}`));
});
