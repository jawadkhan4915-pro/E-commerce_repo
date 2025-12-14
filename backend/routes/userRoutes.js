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

const router = express.Router();

router.use(protect);
router.use(admin);

router.route('/profile')
    .get(getUserProfile)
    .put(updateUserProfile);
router.route('/address')
    .post(addAddress);
router.route('/address/:id')
    .delete(removeAddress);
router.route('/wishlist')
    .post(toggleWishlist);

router.route('/').get(getAllUsers);
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;
