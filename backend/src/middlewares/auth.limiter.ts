import { Request, Response, NextFunction } from 'express';
import { RateLimiterMongo, RateLimiterRes } from 'rate-limiter-flexible';
import mongoose from 'mongoose';
import ApiError from '../utils/ApiError';
import { config } from '../config/config';



// Define rate limiter options
const rateLimiterOptions = {
    storeClient: mongoose.connection,
    blockDuration: 60 * 60 * 24, // 24 hours
    dbName: 'crafts-eCommerce',
};

// Create rate limiters
const emailIpBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsByIpUsername,
    duration: 60 * 10, // 10 minutes
});

const slowerBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsPerDay,
    duration: 60 * 60 * 24, // 24 hours
});

const emailBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: config.rateLimiter.maxAttemptsPerEmail,
    duration: 60 * 60 * 24, // 24 hours
});

// Middleware to apply rate limits
const authLimiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const ipaddr: string = req.ip || 'unknown';
    const emailIpKey = `${req.body.email}_${ipaddr}`;

    try {
        // Fetch rate limiter results
        const [slowerBruteRes, emailIpRes, emailBruteRes]: (RateLimiterRes | null)[] = await Promise.all([
            slowerBruteLimiter.get(ipaddr),
            emailIpBruteLimiter.get(emailIpKey),
            emailBruteLimiter.get(req.body.email),
        ]);

        let retrySeconds = 0;
        let errorMessage = 'Too many requests';

        // Check rate limiter results and calculate retry time
        if (slowerBruteRes && slowerBruteRes.consumedPoints >= config.rateLimiter.maxAttemptsPerDay) {
            retrySeconds = Math.floor(slowerBruteRes.msBeforeNext / 1000) || 1;
            errorMessage = `Too many requests from IP address. Try again in ${retrySeconds} seconds.`;
        } else if (emailIpRes && emailIpRes.consumedPoints >= config.rateLimiter.maxAttemptsByIpUsername) {
            retrySeconds = Math.floor(emailIpRes.msBeforeNext / 1000) || 1;
            errorMessage = `Too many requests for this email and IP address combination. Try again in ${retrySeconds} seconds.`;
        } else if (emailBruteRes && emailBruteRes.consumedPoints >= config.rateLimiter.maxAttemptsPerEmail) {
            retrySeconds = Math.floor(emailBruteRes.msBeforeNext / 1000) || 1;
            errorMessage = `Too many requests for this email. Try again in ${retrySeconds} seconds.`;
        }

        // If retry time is greater than 0, send Too Many Requests error
        if (retrySeconds > 0) {
            res.set('Retry-After', String(retrySeconds));
            return next(new ApiError(429, errorMessage).send(res)); // HTTP 429: Too Many Requests
        }

        next();
    } catch (error: unknown) {
        // Handle any errors and log them
        console.error('Error in auth limiter:', error);
        next(error);
    }
};

export {
    emailIpBruteLimiter,
    slowerBruteLimiter,
    emailBruteLimiter,
    authLimiter,
};
