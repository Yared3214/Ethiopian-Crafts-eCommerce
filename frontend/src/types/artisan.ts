import { Product } from '@/types/product'

// types.ts
export interface Artisan {
    fullName: string;
    description: string;
    profilePic: File;
    slug: string;
}



export interface ArtisanResponse {
    artisan: {
        _id: string;
        fullName: string;
        description: string;
        profilePic: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        __v: number;  
    };
    products: Product[];
}

export interface ArtisansResponse {
    _id: string;
    fullName: string;
    status: 'active' | 'suspended';
    description: string;
    profilePic: string ;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
