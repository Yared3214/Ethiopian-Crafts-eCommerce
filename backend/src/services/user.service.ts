import User, { IUser } from '../models/user.schema'; // Assuming IUser is the interface for User schema
import ApiError from '../utils/ApiError';

class UserService {
    // Create a new user
    async createUser(data: { fullName: string; email: string; password: string }): Promise<IUser> {
        const newUser = new User(data);
        await newUser.save();
        return newUser;
    }

    // Get a user by email
    async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        return user;
    }

    // Get a user by ID
    async getUserById(userId: string): Promise<IUser | null> {
        const user = await User.findById(userId);
        return user;
    }

    // Update a user
    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    }

    // Delete a user
    async deleteUser(userId: string): Promise<void> {
        const result = await User.findByIdAndDelete(userId);
        if (!result) {
            throw new ApiError(404, 'User not found');
        }
    }
}

export const userService = new UserService();
