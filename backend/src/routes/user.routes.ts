// src/routes/user.routes.ts
import express from 'express';
import { requireSignIn, adminMiddleware } from '../middlewares/authMiddleware';
const { userRegister, getMyProfile, deleteMyAccount, updateMyAccount } = require("../controllers/user.controller")
const router = express.Router();

// Register a new user
router.post('/register', userRegister);
router.get('/my-profile', requireSignIn, getMyProfile)
router.delete('/delete', requireSignIn, deleteMyAccount);
router.put('/update/myaccount', requireSignIn, updateMyAccount);



// Other routes can be added here

export default router;
