// src/routes/user.routes.ts
import express from 'express';
import { authLimiter } from '../middlewares/auth.limiter';

const { loginUser, refreshToken, forgotPassword, resetPassword } = require("../controllers/auth.controller")
const router = express.Router();

// Register a new user
router.post('/login', authLimiter, loginUser);
router.post(
    "/refresh-token", refreshToken);

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPassword
);




export default router;
