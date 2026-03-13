import express from 'express';
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  assignWasher,
  getWashers,
  getWasherJobs
} from '../controllers/subscription.controller.js';
import { protect, admin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route – user creates a subscription (simulates customer checkout)
router.post('/', createSubscription);

// Static routes must come before parameterized :id routes
router.get('/washers', protect, admin, getWashers);
router.get('/my-jobs', protect, getWasherJobs);

// Admin routes
router.get('/', protect, admin, getAllSubscriptions);
router.get('/:id', protect, admin, getSubscriptionById);
router.put('/:id/assign-washer', protect, admin, assignWasher);

export default router;
