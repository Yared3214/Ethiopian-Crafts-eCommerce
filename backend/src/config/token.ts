// Define the token types as a constant object
export const tokenTypes = {
    ACCESS: "access",
    REFRESH: "refresh",
    RESET_PASSWORD: "resetPassword",
} as const;


// Optionally, you can define a type for the values of tokenTypes
export type TokenType = typeof tokenTypes[keyof typeof tokenTypes];
