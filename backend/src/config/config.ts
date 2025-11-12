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
    chapaPayment: {
        secretKey: process.env.CHAPA_SECRET_KEY,
        publicKey: process.env.CHAPA_PUBLIC_KEY,
        encryptionKey: process.env.CHAPA_ENCRYPTION_KEY,
        apiUrl: process.env.CHAPA_API_URL,
        baseUrl: process.env.BASE_URL
    }
};

// Optionally, you can define a type for the configuration if needed
export type Config = typeof config;
