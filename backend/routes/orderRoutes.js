import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';
import { validateOrder } from '../middleware/validators.js';

const router = express.Router();

// Protected routes
router.post('/', protect, validateOrder, createOrder);
router.get('/', protect, getUserOrders);
router.get('/:id', protect, getOrderById);

// Admin routes
router.get('/all/orders', protect, admin, getAllOrders);
router.put('/:id', protect, admin, updateOrderStatus);

export default router;

