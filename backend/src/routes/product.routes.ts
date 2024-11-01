import express from 'express';
import { createProduct, getAllProducts, getArtisanProducts, deleteProduct, updateProduct } from '../controllers/product.controller';
import { uploadMultipleFiles } from '../middlewares/upload';
import { requireSignIn, adminMiddleware } from '../middlewares/authMiddleware';
const router = express.Router();



router.post('/create/:artisan', requireSignIn, adminMiddleware, uploadMultipleFiles('productImage', 5), createProduct);
router.get('/', getAllProducts);
router.get('/:artisan', getArtisanProducts);
router.delete('/delete/:productID', requireSignIn, adminMiddleware, deleteProduct)
router.put('/update/:productID', requireSignIn, adminMiddleware, uploadMultipleFiles('productImage', 5), updateProduct)


export default router;