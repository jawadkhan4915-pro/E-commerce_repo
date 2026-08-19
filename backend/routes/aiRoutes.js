import express from 'express';
import { generateVirtualTryOn } from '../controllers/aiController.js';

const router = express.Router();

// Virtual Try-On endpoint
router.post('/virtual-tryon', generateVirtualTryOn);

export default router;
