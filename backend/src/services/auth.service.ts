import bcrypt from 'bcryptjs';
import { RateLimiterMongo, RateLimiterRes } from 'rate-limiter-flexible';
import ApiError from '../utils/ApiError';
import { userService } from '../services/user.service'; // Assuming this is where your user service is located
import { emailIpBruteLimiter, slowerBruteLimiter, emailBruteLimiter } from '../middlewares/auth.limiter'; // Import your limiters
import { Response } from 'express'; // Assuming you're using Express.js
import TokenService from './token.service';
import { tokenTypes } from '../config/token';
import nodemailer, { SentMessageInfo } from 'nodemailer'; // Import SentMessageInfo type from nodemailer
import { config } from '../config/config';
import User from '../models/user.schema';


interface User {
    email: string;
    password: string;

}

export const login = async (email: string, password: string, ipAddr: string, res: Response): Promise<User | void> => {
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

        const { password: _, ...userWithoutPassword } = user.toObject ? user.toObject() : user; // Use toObject() for Mongoose documents
        return userWithoutPassword;
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


const tokenService = new TokenService()


export const refreshAuthToken = async (refreshToken: string, res: Response) => {
    const user = await tokenService.verifyToken(
        refreshToken,
        tokenTypes.REFRESH
    );

    if (!user) {
        return new ApiError(404, "user Not Found").send(res);
    }
    await tokenService.removeToken(user._id);
    return await tokenService.generateAuthTokens(user._id);
};







export const sendEmail = async (recipientEmail: string, resetToken: string, res: Response): Promise<any> => {
    try {
        console.log('email-password:', recipientEmail, 'resetToken:', resetToken);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // Set to true if using a secure connection (SSL/TLS)
            service: config.companyInfo.service,
            auth: {
                user: config.companyInfo.email,
                pass: config.companyInfo.pass,
            },
        });

        const mailOptions = {
            from: config.companyInfo.email,
            to: recipientEmail,
            subject: "Password Reset",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #f8f8f8; padding: 20px; 
                                border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2>Password Reset</h2>
                        <p>We received a request to reset your password. Click the button below to reset it:</p>
                        <a href="http://localhost:3000/reset-password/${resetToken}" 
                           style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #A40C0C; 
                                  text-decoration: none; border-radius: 5px; margin-top: 20px;">Reset Password</a>
                        <p style="margin-top: 20px;">If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
                        <p>Thank you,</p>
                        <p>Ethiopian Crafts eCommerce</p>
                    </div>
                </div>
            `,
        };

        const info: SentMessageInfo = await transporter.sendMail(mailOptions);
        console.log("Password reset email sent:", info.response);
    } catch (error) {
        console.error("Error sending password reset email:", error);
        return new ApiError(500, "Failed to send password reset email").send(res);
    }
};



export const passwordReset = async (userId: string, password: string, res: Response): Promise<any> => {
    try {
        console.log('userId:', userId, 'password:', password);

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update the user's password in the database
        const result = await User.updateOne(
            { _id: userId }, // Filter to match the user with the specified ID
            { $set: { password: hashedPassword } } // Update the password field
        );

        // Check if the update was successful
        if (result.modifiedCount === 0) {
            return new ApiError(404, "User not found or password not updated").send(res);
        }

        return result; // Return the result of the update operation
    } catch (error) {
        console.error("Error resetting password:", error);
        return new ApiError(500, "Failed to reset password").send(res);
    }
};




