import express from 'express';
import {
    register,
    login,
    getProfile,
    updateProfile,
    toggleWishlist,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import { authLimiter } from '../middleware/security.js';
import {
    validateRegister,
    validateLogin,
    validateProfileUpdate,
} from '../middleware/validators.js';

const router = express.Router();

// Public routes with strict rate limiting & input validation
router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('avatar'), validateProfileUpdate, updateProfile);
router.post('/wishlist', protect, toggleWishlist);

export default router;

