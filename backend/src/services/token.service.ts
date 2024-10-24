import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import User from '../models/user.schema';
import Token from '../models/token.schema';
import { tokenTypes } from '../config/token';
import { userService } from '../services/user.service';
import { IToken } from '../models/token.schema'
import { IUser } from '../models/user.schema';
import { DeleteResult } from 'mongoose';


interface AuthTokens {
    access: { token: string; expires: Date };
    refresh: { token: string; expires: Date };
}

class TokenService {
    private jwtSecret: string;

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET as string;
        if (!this.jwtSecret) {
            throw new Error('JWT secret is not defined in environment variables');
        }
    }

    generateToken(userId: string, expires: Date | dayjs.Dayjs, type: string): string {
        const payload = {
            sub: userId,
            iat: dayjs().unix(),
            exp: dayjs(expires).unix(),
            type,
        };
        return jwt.sign(payload, this.jwtSecret);
    }

    async generateAuthTokens(userId: string): Promise<AuthTokens> {

        const accessTokenExpires = dayjs().add(1, 'hour');
        const accessToken = this.generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

        const refreshTokenExpires = dayjs().add(7, 'days');
        const refreshToken = this.generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);

        await this.saveRefreshToken(refreshToken, userId, refreshTokenExpires, tokenTypes.REFRESH);

        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
            },
        };
    }

    async saveRefreshToken(
        token: string,
        userId: string,
        expires: dayjs.Dayjs,
        type: string,
        blacklisted = false
    ): Promise<IToken> {
        const tokenDoc = await Token.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted,
        });
        return tokenDoc;
    }

    async findUser(token: string): Promise<IUser | null> {
        const payload = jwt.verify(token, this.jwtSecret) as jwt.JwtPayload;
        const user = await User.findById(payload.sub);
        return user;
    }

    async verifyToken(token: string, type: string): Promise<any> {
        try {
            const payload = jwt.verify(token, this.jwtSecret) as jwt.JwtPayload;
            if (payload.type === type) {
                const tokenDoc = await Token.findOne({
                    user: payload.sub,
                    type,
                    expires: { $gt: new Date() },
                });
                if (tokenDoc) {
                    const user = await userService.getUserById(payload.sub as string);
                    return user;
                }
            }
            return null;
        } catch (err) {
            console.error('Error verifying token:', err);
            return null;
        }
    }

    async generateResetToken(userId: string): Promise<string> {
        const resetTokenExpires = dayjs().add(1, 'day');
        const resetToken = this.generateToken(userId, resetTokenExpires, tokenTypes.RESET_PASSWORD);
        await this.saveResetToken(userId, resetToken);
        return resetToken;
    }

    async saveResetToken(userId: string, token: string): Promise<void> {
        await Token.updateOne(
            { user: userId, type: tokenTypes.RESET_PASSWORD },
            { token, expiresAt: dayjs().add(1, 'day').toDate() },
            { upsert: true }
        );
    }

    async removeToken(userId: string): Promise<DeleteResult> {
        try {
            const result = await Token.deleteOne({ user: userId });
            return result;
        } catch (error) {
            console.error('Error removing token:', error);
            throw error;
        }
    }

    async findToken(token: string): Promise<IToken | null> {
        const tokenDoc = await Token.findOne({ token });
        return tokenDoc;
    }

    async tokenExpired(tokenExp: number): Promise<boolean> {
        const currentDate = new Date();
        const expirationDate = dayjs.unix(tokenExp).toDate();
        return currentDate > expirationDate;
    }
}

export default TokenService;
