import express from 'express';
import {
    getAllUsers,
    deleteUser,
    getUserById,
    updateUser,
    getUserProfile,
    updateUserProfile,
    addAddress,
    removeAddress,
    toggleWishlist,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { validateProfileUpdate } from '../middleware/validators.js';

const router = express.Router();

// User self-management routes (Protected)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, validateProfileUpdate, updateUserProfile);

router.route('/address')
    .post(protect, addAddress);

router.route('/address/:id')
    .delete(protect, removeAddress);

router.route('/wishlist')
    .post(protect, toggleWishlist);

// Admin-only management routes
router.route('/')
    .get(protect, admin, getAllUsers);

router.route('/:id')
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser);

export default router;

