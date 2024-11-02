// src/utils/apiError.ts
import { Response } from 'express';

class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true, stack = "") {
        console.log('error message', message);
        super(message);
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }

    send(res: Response) {
        return res.status(this.statusCode).json({
            error: true,
            code: this.statusCode,
            message: this.message,
            stack: this.stack,
        });
    }
}

export default ApiError;
