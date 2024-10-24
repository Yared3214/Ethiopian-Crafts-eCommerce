// Define the configuration object with type safety
export const config = {
    rateLimiter: {
        maxAttemptsPerEmail: 5,
        maxAttemptsPerDay: 15,
        maxAttemptsByIpUsername: 5,
    },
    companyInfo: {
        service: process.env.EMAIL_SERVICE,
        email: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
};

// Optionally, you can define a type for the configuration if needed
export type Config = typeof config;
