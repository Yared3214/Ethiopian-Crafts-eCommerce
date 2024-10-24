import { Request, Response } from "express";
import ApiError from "../utils/ApiError";
import TokenService from "../services/token.service";
import { login, refreshAuthToken, passwordReset, sendEmail } from "../services/auth.service";
const tokenService = new TokenService();
import { userService } from "../services/user.service";
import jwt from "jsonwebtoken";
import { checkPasswordStrength } from "../utils/checkPasswordStrength";

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



//refresh token 

export const refreshToken = async (res: Response, req: Request) => {
    const tokens = await refreshAuthToken(req.body.refreshToken, res);
    return res.status(200).send({ ...tokens });
}



// Forgot Password Controller
export const forgotPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email } = req.body;

        if (!email) {
            return new ApiError(400, 'Email is required!').send(res);
        }

        // Check if the user exists
        const existUser = await userService.getUserByEmail(email);
        if (!existUser) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Remove any existing tokens and generate new ones
        await tokenService.removeToken(existUser._id);
        const tokens = await tokenService.generateAuthTokens(existUser._id);
        const token = tokens.refresh.token;

        // Send the password reset email
        await sendEmail(email, token, res);
        return res.status(200).json({ message: 'Password reset link has been sent to your email.' });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Reset Password Controller
export const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return new ApiError(400, 'Password is required!').send(res);
        }

        // Find the token document
        const tokenDoc = await tokenService.findToken(token);
        if (!tokenDoc) {
            return new ApiError(400, "Invalid Token").send(res);
        }

        // Verify the reset token
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string; exp: number };

        // Check if the token has expired
        const hasTokenExpired = await tokenService.tokenExpired(payload.exp);
        if (hasTokenExpired) {
            return new ApiError(401, "Token expired").send(res);
        }

        // Check the password strength
        const passwordErrors = checkPasswordStrength(password);
        if (passwordErrors.length > 0 && passwordErrors[0] !== 'Password is strong.') {
            return new ApiError(400, passwordErrors.join(', ')).send(res); // Join errors and return
        }

        // Reset the password
        const result = await passwordReset(payload.sub, password, res);
        if (result.modifiedCount > 0) {
            // Password updated successfully
            return res.status(200).json({ message: "Password reset successfully" });
        } else {
            // User not found or password not changed
            return new ApiError(404, "User not found or password not changed").send(res);
        }
    } catch (error) {
        console.error("Error in resetPassword:", error);
        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};


