import { Request, Response } from "express";
import ApiError from "../utils/ApiError";
import TokenService from "../services/token.service";
import login from "../services/auth.service";

const tokenService = new TokenService();

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return new ApiError(400, 'Email and password are required!').send(res);
        }

        // Provide a fallback IP if req.ip is undefined
        const ipAddr = req.ip || '127.0.0.1';  // Fallback to localhost IP if req.ip is undefined

        const user = await login(email, password, ipAddr, res);

        // Check if user is `void`, in which case the error has already been handled
        if (!user) {
            return res;  // Return the response object to satisfy TypeScript
        }

        // Generate tokens if login is successful
        const tokens = await tokenService.generateAuthTokens((user as any)._id);

        return res.status(200).json({ user, tokens });

    } catch (error) {
        console.error(error);
        return new ApiError(500, 'Login failed').send(res);
    }
};


