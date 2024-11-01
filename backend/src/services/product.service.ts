import Product, { IProduct } from '../models/product.schema';
import { Types } from 'mongoose';

class ProductService {

    //create a new product
    async createProduct(data: { title: string; images: string[]; description: string; materials: string[]; createdBy: string; category: string; price: number; slug: string }): Promise<IProduct> {
        const newProduct = new Product(data);
        await newProduct.save();
        return newProduct;
    }

    //get all products
    async getAllProducts() {
        return await Product.find().sort({ createdAt: -1 });
    }


    //get artisan's product 
    async getArtisanProducts(createdBy: string) {
        return await Product.find({ createdBy }).sort({ createdAt: -1 });
    }

    //get a single product by slug
    async getProductBySlug(slug: string) {
        return await Product.find({ slug });
    }

    //get a product by id
    async getProductById(productID: string) {
        return await Product.findOne({ _id: productID });
    }

    //delete a product 

    async deleteProduct(productID: string) {
        return await Product.findOneAndDelete({ _id: productID })

    }

    //update a product 
    async updateProduct(productID: string, data: Partial<{ title: string; images: string[]; description: string; materials: string[]; category: string; price: number; slug: string }>) {
        // Attempt to find and update the product, returning the updated document

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productID },
            data,
            { new: true } // Return the updated product
        );

        return updatedProduct;
    }



    async getProductBySlugExcludingId(slug: string, excludedId: string) {
        return Product.findOne({
            slug,
            _id: { $ne: new Types.ObjectId(excludedId) } // Exclude the specified ID
        });
    };

}


export const productService = new ProductService();

