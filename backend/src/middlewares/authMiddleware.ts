import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { userService } from '../services/user.service';
import ApiError from '../utils/ApiError';

interface DecodedToken {
    sub: string;
    iat: number;
    exp: number;
}

export interface authenticatedRequest extends Request {
    user?: any
}

export const requireSignIn = async (req: authenticatedRequest, res: Response, next: NextFunction): Promise<void | any> => {
    try {
        let token: string | undefined;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
            req.user = await userService.getUserById(decoded.sub);

            next();
        } else {
            return new ApiError(401, 'Not authorized, no token').send(res)
        }
    } catch (error: any) {
        console.error(error);
        return new ApiError(401, error.message).send(res)
    }
};

export const adminMiddleware = async (req: authenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.user;
        const user = await userService.getUserById(id);

        if (user && user.role !== 'admin') {
            return res.status(401).json({ message: 'Admin access denied' });
        }

        next();
    } catch (err: any) {
        return res.status(401).json({ message: err.message });
    }
};
