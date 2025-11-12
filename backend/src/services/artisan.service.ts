import Artisan, { IArtisan } from "../models/artisan.schema";
class ArtisanService {
    // Create a new artisan
    async createArtisan(data: { fullName: string; description: string; profilePic: string, slug: string }): Promise<IArtisan> {
        const newUser = new Artisan(data);
        await newUser.save();
        return newUser;
    }

    //get all artisans
    async getAllArtisans(): Promise<IArtisan[]> {
        return await Artisan.find();
    }

    //get a single artisan

    async getSingleArtisan(slug: string): Promise<IArtisan | null> {
        return await Artisan.findOne({ slug });
    }

    async getArtisanById(userId: string): Promise<IArtisan | null> {
        return await Artisan.findOne({_id: userId});
    }
 

    //update artisan
    async updateArtisan(slug: string, data: { fullName: string; description: string; profilePic: string }): Promise<IArtisan | null> {
        return await Artisan.findOneAndUpdate({
            slug
        }, data, {
            new: true
        });
    }

    //delete artisan
    async deleteArtisan(slug: string): Promise<IArtisan | null> {
        return await Artisan.findOneAndDelete({ slug });
    }


}

export const artisanservice = new ArtisanService();
