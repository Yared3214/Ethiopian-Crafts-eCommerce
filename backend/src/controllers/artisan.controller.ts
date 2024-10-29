// src/controllers/artisan.controller.ts
import { Request, Response } from 'express';
import ApiError from '../utils/ApiError';
import { artisanservice } from '../services/artisan.service';
import { uploadImage } from '../services/image.service';



export const createArtisan = async (req: Request, res: Response): Promise<any> => {
    console.log("Request body: ", req.body);
    try {
        const { fullName, description } = req.body;

        // Check if required fields are provided
        if (!fullName || !description) {
            return new ApiError(400, 'Full name and description are required.').send(res);
        }

        // Check if file was uploaded
        if (!req.file) {
            return new ApiError(400, 'Profile picture is required.').send(res);
        }

        //check if the artisan already created

        const existingArtisan = await artisanservice.getSingleArtisan(fullName.split(' ').join('-').toLowerCase());
        if (existingArtisan) {
            return new ApiError(400, "Artisan is already registered!").send(res);
        }


        // Check if the fullname contains both the first and last name
        if (fullName && fullName.split(' ').length < 2) {
            return new ApiError(400, 'Full name must contain both first and last name.').send(res);
        }

        // Upload the image to Cloudinary
        const imageUrl = await uploadImage(req.file.buffer);

        // Create the new artisan record
        const newArtisan = await artisanservice.createArtisan({
            fullName,
            description,
            profilePic: imageUrl,
            slug: fullName.split(' ').join('-').toLowerCase(),
        });

        if (newArtisan) {
            res.status(201).json({
                status: 'success',
                message: 'Artisan created successfully',
                artisan: newArtisan,
            });
        }

    } catch (error) {
        console.error('Error creating artisan:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
};



//get all artisans


export const getAllArtisans = async (req: Request, res: Response): Promise<any> => {
    try {
        const artisans = await artisanservice.getAllArtisans();
        res.status(200).json({
            status: 'success',
            message: 'Artisans retrieved successfully',
            artisans,
        });
    } catch (error) {
        console.error('Error getting artisans:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}


//get single artisan

export const getSingleArtisan = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const artisan = await artisanservice.getSingleArtisan(slug);
        if (!artisan) {
            return new ApiError(404, 'Artisan not found').send(res);
        }
        res.status(200).json({
            status: 'success',
            message: 'Artisan retrieved successfully',
            artisan,
        });
    } catch (error) {
        console.error('Error getting artisan:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}


//update artisan

export const updateArtisan = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const { fullName, description } = req.body;
        const artisan = await artisanservice.getSingleArtisan(slug);
        if (!artisan) {
            return new ApiError(404, 'Artisan not found').send(res);
        }

        // Check if file was uploaded
        if (req.file) {
            const imageUrl = await uploadImage(req.file.buffer);
            await artisanservice.updateArtisan(slug, {
                fullName,
                description,
                profilePic: imageUrl,
            });
        } else {
            await artisanservice.updateArtisan(slug, {
                fullName,
                description,
                profilePic: artisan.profilePic,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Artisan updated successfully',
        });
    } catch (error) {
        console.error('Error updating artisan:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}



//delete artisan

export const deleteArtisan = async (req: Request, res: Response): Promise<any> => {
    try {
        const { slug } = req.params;
        const artisan = await artisanservice.deleteArtisan(slug);
        if (!artisan) {
            return new ApiError(404, 'Artisan not found').send(res);
        }
        res.status(200).json({
            status: 'success',
            message: 'Artisan deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting artisan:', error);
        return new ApiError(500, 'Internal server error').send(res);
    }
}