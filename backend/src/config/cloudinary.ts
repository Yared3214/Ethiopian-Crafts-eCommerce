// src/config/cloudinary.config.ts
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,  // Your Cloudinary cloud name
    api_key: process.env.CLOUD_API_KEY,        // Your Cloudinary API key
    api_secret: process.env.CLOUD_API_SECRET,  // Your Cloudinary API secret
});

export default cloudinary;
