import bcrypt from 'bcryptjs';
import { RateLimiterMongo, RateLimiterRes } from 'rate-limiter-flexible';
import ApiError from '../utils/ApiError';
import { userService } from '../services/user.service'; // Assuming this is where your user service is located
import { emailIpBruteLimiter, slowerBruteLimiter, emailBruteLimiter } from '../middlewares/auth.limiter'; // Import your limiters
import { Response } from 'express'; // Assuming you're using Express.js

interface User {
    email: string;
    password: string;
    
}

const login = async (email: string, password: string, ipAddr: string, res: Response): Promise<User | void > => {
    try {
        console.log('Fetching user by email:', email);
        const user = await userService.getUserByEmail(email);
        console.log('User fetched:', user);

        if (!user) {
            console.log('Error: User not found or incorrect password for email:', email);

            try {
                await Promise.all([
                    emailIpBruteLimiter.consume(`${email}_${ipAddr}`),
                    slowerBruteLimiter.consume(ipAddr),
                    emailBruteLimiter.consume(email),
                ]);
            } catch (rateLimiterError) {
                console.error('Error applying rate limiter:', rateLimiterError);
            }

            // Create and send the error response
            const apiError = new ApiError(401, 'Incorrect email!');
            apiError.send(res);
            return; // Explicitly return void after sending the response
        }

        console.log('Comparing passwords');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password valid:', isPasswordValid);

        if (!isPasswordValid) {
            console.log('Error: Incorrect password for email:', email);

            try {
                await Promise.all([
                    emailIpBruteLimiter.consume(`${email}_${ipAddr}`),
                    slowerBruteLimiter.consume(ipAddr),
                    emailBruteLimiter.consume(email),
                ]);
            } catch (rateLimiterError) {
                console.error('Error applying rate limiter:', rateLimiterError);
            }

            // Create and send the error response
            const apiError = new ApiError(401, 'Incorrect password!');
            apiError.send(res);
            return; // Explicitly return void after sending the response
        }

        return user; // Login success, return the user
    } catch (error) {
        console.error('Error in login function:', error);
        
        // If the error is an instance of ApiError, send the response
        if (error instanceof ApiError) {
            error.send(res);
            return; // Explicitly return void after sending the response
        }

        // If it's a different error, send a general server error
        const apiError = new ApiError(500, 'Internal server error');
        apiError.send(res);
        return; // Explicitly return void after sending the response
    }
};

export default login;
