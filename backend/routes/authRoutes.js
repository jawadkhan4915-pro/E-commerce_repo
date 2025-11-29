import express from 'express';
import {
    register,
    login,
    getProfile,
    updateProfile,
    toggleWishlist,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/wishlist', protect, toggleWishlist);

export default router;
