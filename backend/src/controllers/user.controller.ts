// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import User from '../models/user.schema';
import ApiError from '../utils/ApiError'; // Import the ApiError class
import bcrypt from 'bcryptjs'; // For password hashing
import { isValidEmail } from '../utils/isEmailValid';
import { userService } from '../services/user.services'
import { checkPasswordStrength } from '../utils/checkPasswordStrength';





// USER REGISTERATION
// POST /api/users/register
// UNPROTECTED
export const userRegister = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { fullName, email, password } = req.body;

        // Check if all fields are provided
        if (!fullName || !email || !password) {
            return new ApiError(400, 'Please provide all fields').send(res);
        }

        //check if the fullName contains both first name and last name
        if (fullName.split(' ').length < 2) {
            return new ApiError(400, 'Please provide both first name and last name').send(res);
        }

        // Check if the email is valid
        const validEmail = isValidEmail(email);
        if (!validEmail) {
            return new ApiError(400, 'Please provide a valid email address').send(res);
        }

        // Check if the email already exists
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return new ApiError(409, 'Email is already registered').send(res); // Conflict error
        }


        // Check the password strength
        const passwordErrors = checkPasswordStrength(password);
        if (passwordErrors.length > 0 && passwordErrors[0] !== 'Password is strong.') {
            return new ApiError(400, passwordErrors.join(', ')).send(res); // Join errors and return
        }


        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userService.createUser({
            fullName,
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            return new ApiError(500, 'User registration failed').send(res);
        }

        return res.status(200).json({ success: true, message: 'User registered successfully'});

    } catch (error: any) {
        return new ApiError(500, error.message).send(res); // This is also valid
    }
};


//