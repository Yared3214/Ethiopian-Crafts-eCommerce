// src/middleware/upload.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

export default upload;


// Middleware for multiple file uploads
export const uploadMultipleFiles = (fieldName: string, maxCount: number) => {
  return upload.array(fieldName, maxCount);
};