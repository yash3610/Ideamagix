import express from 'express';
import rateLimit from 'express-rate-limit';
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  assignWasher,
  getWashers,
  getWasherJobs
} from '../controllers/subscription.controller.js';
import { protect, admin, washer } from '../middleware/auth.middleware.js';

const router = express.Router();

const subscriptionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' }
});

// Apply rate limiter to all subscription routes
router.use(subscriptionLimiter);

// Public route – user creates a subscription (simulates customer checkout)
router.post('/', createSubscription);

// Static routes must come before parameterized :id routes
router.get('/washers', protect, admin, getWashers);
router.get('/my-jobs', protect, washer, getWasherJobs);

// Admin routes
router.get('/', protect, admin, getAllSubscriptions);
router.get('/:id', protect, admin, getSubscriptionById);
router.put('/:id/assign-washer', protect, admin, assignWasher);

export default router;
