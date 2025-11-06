//import the cloudinary
import cloudinary from "../config/cloudinary";


export const uploadImage = (imageBuffer: Buffer): Promise<string> => {
    // console.log("the buffer", imageBuffer)
    
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
            {
                folder: 'Artisans',
                resource_type: 'image',
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary error:", error);
                    return reject("Failed to upload image to Cloudinary");
                }
                if (!result) {
                    return reject("Failed to upload image to Cloudinary");
                }
                resolve(result.secure_url);
            }
        ).end(imageBuffer);
    });
};
