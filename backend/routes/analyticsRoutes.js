import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.get('/dashboard', protect, admin, getDashboardStats);

export default router;
