import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { uploadImage } from "../services/image.service";
import ApiError from "../utils/ApiError";
import { artisanservice } from "../services/artisan.service";



//create products
export const createProduct = async (req: Request, res: Response): Promise<any> => {
    console.log("Request body: ", req.body);
    try {
        const { title, description, materials, category, price } = req.body;

        // Validate required fields
        if (!title || !description || !materials || !category || !price) {
            return new ApiError(400, 'Title, description, materials, price, category, and createdBy are required.').send(res);
        }

        // Check if files were uploaded (single or multiple)
        const files = Array.isArray(req.files) ? req.files : req.file ? [req.file] : [];
        if (!files.length) {
            return new ApiError(400, 'At least one product image is required.').send(res);
        }

        //console files
        console.log("image files", files)

        // Get the createdBy parameter
        const createdBy = req.params.artisan;

        // Verify the existence of the artisan
        const existingArtisan = await artisanservice.getSingleArtisan(createdBy);
        if (!existingArtisan) {
            return new ApiError(400, 'Artisan does not exist').send(res);
        }

        //check if there another product exits with that slug
        const existingProductWithSlug = await productService.getProductBySlug(title.split(' ').join('-').toLowerCase());
        if (existingProductWithSlug.length) {
            return new ApiError(400, 'A product with this title already exists.').send(res);
        }

        // Upload images to Cloudinary and get their URLs
        const imageUrls: string[] = await Promise.all(
            files.map(async (file) => {
                const imageUrl = await uploadImage(file.buffer); // Upload each image
                return imageUrl;
            })
        );

        // Convert materials to an array by splitting on commas and trimming whitespace
        const materialsArray = materials.split(',').map((material: string) => material.trim());




        // Create the new product record
        const newProduct = await productService.createProduct({
            title,
            images: imageUrls,
            description,
            materials: materialsArray,
            createdBy,
            category,
            price,
            slug: title.split(' ').join('-').toLowerCase(),
        });

        // Respond with success if product is created
        if (newProduct) {
            return res.status(201).json({
                status: 'success',
                message: 'Product created successfully',
                product: newProduct,
            });
        }

    } catch (error) {
        console.error('Error creating product:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};


//get all products

export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await productService.getAllProducts();
        return res.status(200).json({
            status: 'success',
            message: 'All products retrieved successfully',
            products,
        });
    } catch (error) {
        console.error('Error getting all products:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}


//get artisan's products

export const getArtisanProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const artisan = req.params.artisan;

        //check if the artisan is found
        const isArtisanFound = await artisanservice.getSingleArtisan(artisan)

        if (!isArtisanFound) {
            return new ApiError(400, "Artisan not found").send(res)
        }


        const products = await productService.getArtisanProducts(artisan)

        if (!products.length) {
            return new ApiError(400, "No Products found").send(res)
        }

        return res.status(200).json({
            success: "true",
            message: "Products successfully fetched.",
            products
        })


    } catch (error) {
        console.log('error while getting the artisans products', error)
        return new ApiError(500, "Internal Server Error").send(res)

    }
}


//delete the product

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { productID } = req.params

        //check if the product is found or not
        const isProductExist = await productService.getProductById(productID)
        if (!isProductExist) {
            return new ApiError(400, "Product not found").send(res);
        }

        //delete the product
        const product = await productService.deleteProduct(productID)
        if (product) {
            return res.status(200).json({
                success: "true",
                message: "Product deleted successfully."
            })
        }

    } catch (error) {
        console.log('error while deleting products', error)
        return new ApiError(500, "Internal Server Error").send(res)

    }
}


//update the product
export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    console.log("Request body:", req.body, "Request params:", req.params);

    try {
        const { productID } = req.params;
        const { title, description, materials, category, price } = req.body;
        console.log("title", title)

        // Check if the product exists
        const existingProduct = await productService.getProductById(productID);
        if (!existingProduct) {
            return new ApiError(400, 'Product not found').send(res);
        }

        // Handling files from form-data
        const files = Array.isArray(req.files) ? req.files : req.file ? [req.file] : [];
        let imageUrls: string[] = existingProduct.images;

        if (files.length > 0) {
            imageUrls = await Promise.all(
                files.map(async (file) => {
                    const imageUrl = await uploadImage(file.buffer); // Ensure uploadImage is defined to handle a file buffer
                    return imageUrl;
                })
            );
        }

        // Process materials if provided
        const materialsArray = materials
            ? materials.split(',').map((material: string) => material.trim())
            : existingProduct.materials;

        // Generate a new slug based on the title if provided
        let newSlug;
        if (title) {
            newSlug = title.split(' ').join('-').toLowerCase();
            const sameTitleProduct = await productService.getProductBySlugExcludingId(newSlug, productID);
            if (sameTitleProduct) {
                return new ApiError(400, 'A product with this title already exists.').send(res);
            }
        }

        // Prepare updated product data, preserving existing values if not provided
        const updatedProductData = {
            title: title || existingProduct.title,
            images: imageUrls,
            description: description || existingProduct.description,
            materials: materialsArray,
            category: category || existingProduct.category,
            price: price !== undefined ? price : existingProduct.price,
            slug: newSlug || existingProduct.slug,
        };

        const updatedProduct = await productService.updateProduct(productID, updatedProductData);

        if (updatedProduct) {
            return res.status(200).json({
                status: 'success',
                message: 'Product updated successfully',
                product: updatedProduct,
            });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};
