// src/routes/user.routes.ts
import express from 'express';

const { userRegister } = require("../controllers/user.controller")
const router = express.Router();

// Register a new user
router.post('/register', userRegister);

// Other routes can be added here

export default router;
