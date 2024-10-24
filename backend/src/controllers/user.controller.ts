// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import User from '../models/user.schema';
import ApiError from '../utils/ApiError'; // Import the ApiError class
import bcrypt from 'bcryptjs'; // For password hashing
import { isValidEmail } from '../utils/isEmailValid';
import { userService } from '../services/user.service'
import { checkPasswordStrength } from '../utils/checkPasswordStrength';





// USER REGISTERATION
// POST /api/users/register
// UNPROTECTED
const userRegister = async (req: Request, res: Response): Promise<Response> => {
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
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await userService.createUser({
            fullName,
            email,
            password: hashedPassword,
        });

        if (!newUser) {
            return new ApiError(500, 'User registration failed').send(res);
        }

        return res.status(200).json({ success: true, message: 'User registered successfully' });

    } catch (error: any) {
        return new ApiError(500, error.message).send(res); // This is also valid
    }
};


// getting my account
// get api/users/my-profile
// PROTECTED


interface AuthenticatedRequest extends Request {
    user: {
        _id: string;
        // Add any other user properties if needed
    };
}
const getMyProfile = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const user = await userService.getUserById(req.user._id);

        if (!user) {
            return new ApiError(401, "User not found!").send(res);
        }

        res.status(200).json(user);
    } catch (error: any) {
        console.error(error);
        return new ApiError(500, "Error while finding the user").send(res);
    }
};


// delete my account
// delete api/users/delete
// PROTECTED

const deleteMyAccount = async (req: AuthenticatedRequest, res: Response): Promise<any> => {

    try {

        const user = await userService.getUserById(req.user._id);

        if (!user) {
            return new ApiError(401, "User not found!").send(res);
        }

        const deleteUser = await userService.deleteUser(req.user._id)

        if (deleteUser) {
            res.status(200).json({ message: "Account deleted successfully!" })
        }



    } catch (error: any) {
        console.error(error)
        return new ApiError(500, error.message).send(res)
    }

}


const updateMyAccount = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { fullName, email } = req.body;


        // Get the current user
        const user = await userService.getUserById(req.user._id);
        if (!user) {
            return new ApiError(400, 'User not found!').send(res);
        }

        // Full name validation
        if (fullName && fullName.split(' ').length < 2) {
            return new ApiError(400, 'Please provide both first name and last name').send(res);
        }

        // Email validation
        if (email) {
            const validEmail = await isValidEmail(email);
            if (!validEmail) {
                return new ApiError(400, 'Please provide a valid email address').send(res);
            }

            // Check if email is already taken by another user
            const emailTaken = await userService.getUserByEmail(email); // Adjust to your userService method
            if (emailTaken && emailTaken._id.toString() !== user._id.toString()) {
                return new ApiError(400, 'Email address is already taken').send(res);
            }
        }

        //user data

        const userData = {
            fullName,
            email
        }

        const updatedUser = await userService.updateUser(req.user._id, userData);

        if (userData) {
            res.status(200).json({
                message: "User updated successfully",
                updatedUser: updatedUser
            });
        }



    } catch (error: any) {
        console.error(error);
        return new ApiError(500, 'Error while updating the account').send(res);
    }
};



module.exports = {
    userRegister,
    getMyProfile,
    deleteMyAccount,
    updateMyAccount
}