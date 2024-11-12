import { Product } from '@/types/product'

// types.ts
export interface Artisan {
    _id: string;
    fullName: string;
    description: string;
    profilePic: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}



export interface ArtisanResponse {
    artisan: Artisan;
    products: Product[];
}
