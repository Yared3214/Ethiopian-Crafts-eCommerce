// src/types/user.ts

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface User {
    _id: string;
    avatar?: string | StaticImport;
    fullName: string;
    email: string;
    role: string; // e.g., "user", "admin", etc.
    status: 'active' | 'suspended';
    savedProducts: string[]; // Array of saved product IDs
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    phone?: string;
    address?: {
        city: string;
        subcity: string;
        country: string;
    }
}

export interface AuthTokens {
    access: {
        token: string; // JWT or other type of access token
        expires: string; // Expiration date of the access token
    };
    refresh: {
        token: string; // JWT or other type of refresh token
        expires: string; // Expiration date of the refresh token
    };
}

export interface AuthResponse {
    user: User; // User details returned from the API
    tokens: AuthTokens; // Authentication tokens
}
