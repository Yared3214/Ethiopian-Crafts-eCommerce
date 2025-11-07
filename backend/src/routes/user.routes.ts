// src/routes/user.routes.ts
import express from 'express';
import { requireSignIn, adminMiddleware } from '../middlewares/authMiddleware';
const { userRegister, getMyProfile, deleteMyAccount, updateMyAccount, toggleSavedProduct, getSavedProducts } = require("../controllers/user.controller")
const router = express.Router();

// Register a new user

router.post('/register', userRegister);
router.get('/my-profile', requireSignIn, getMyProfile)
router.delete('/delete', requireSignIn, deleteMyAccount);
router.put('/update/myaccount', requireSignIn, updateMyAccount);
router.post('/toggle-save-product/:productId', requireSignIn, toggleSavedProduct);
router.get('/saved-products', requireSignIn, getSavedProducts);



// Other routes can be added here

export default router;
