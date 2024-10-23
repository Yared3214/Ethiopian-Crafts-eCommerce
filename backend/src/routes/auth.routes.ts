// src/routes/user.routes.ts
import express from 'express';
import { authLimiter } from '../middlewares/auth.limiter';

const { loginUser } = require("../controllers/auth.controller")
const router = express.Router();

// Register a new user
router.post('/login', authLimiter, loginUser);

// Other routes can be added here

export default router;
