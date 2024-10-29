import User, { IUser } from '../models/user.schema'; // Assuming IUser is the interface for User schema

class UserService {
    // Create a new user
    async createUser(data: { fullName: string; email: string; password: string }): Promise<IUser> {
        const newUser = new User(data);
        await newUser.save();
        return newUser;
    }

    // Get a user by email
    async getUserByEmail(email: string): Promise<any> {
        const user = await User.findOne({ email });
        return user;
    }

    // Get a user by ID
    async getUserById(userId: string): Promise<any> {
        const user = await User.findById(userId);
        return user;
    }

    // Update a user
    async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    }

    // Delete a user
    async deleteUser(userId: string): Promise<any> {
        const result = await User.findByIdAndDelete(userId);
        return result;
    }
}

export const userService = new UserService();
