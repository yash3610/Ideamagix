import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

const PLAN_PRICES = {
  Basic: 499,
  Standard: 999,
  Premium: 1999
};

// @desc    Create a new subscription
// @route   POST /api/subscriptions
// @access  Public
export const createSubscription = async (req, res) => {
  try {
    const { userName, userEmail, userPhone, address, vehicleType, planName, notes } = req.body;

    if (!PLAN_PRICES[planName]) {
      return res.status(400).json({ message: 'Invalid plan selected. Choose Basic, Standard, or Premium.' });
    }

    const subscription = await Subscription.create({
      userName,
      userEmail,
      userPhone,
      address,
      vehicleType,
      planName,
      planPrice: PLAN_PRICES[planName],
      notes: notes || '',
      status: 'new'
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all subscriptions (optionally filter by status)
// @route   GET /api/subscriptions
// @access  Private/Admin
export const getAllSubscriptions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const subscriptions = await Subscription.find(filter)
      .populate('washerId', 'name email mobile')
      .sort({ createdAt: -1 });

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get subscription by ID
// @route   GET /api/subscriptions/:id
// @access  Private/Admin
export const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate('washerId', 'name email mobile');

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Assign a washer to a subscription
// @route   PUT /api/subscriptions/:id/assign-washer
// @access  Private/Admin
export const assignWasher = async (req, res) => {
  try {
    const { washerId } = req.body;

    const washer = await User.findById(washerId);
    if (!washer || washer.role !== 'washer') {
      return res.status(404).json({ message: 'Washer not found' });
    }

    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      {
        washerId: washer._id,
        washerName: washer.name,
        status: 'assigned'
      },
      { new: true }
    ).populate('washerId', 'name email mobile');

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all washers (for admin assignment)
// @route   GET /api/subscriptions/washers
// @access  Private/Admin
export const getWashers = async (req, res) => {
  try {
    const washers = await User.find({ role: 'washer' }).select('-password');
    res.json(washers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get washer's assigned jobs
// @route   GET /api/subscriptions/my-jobs
// @access  Private/Washer
export const getWasherJobs = async (req, res) => {
  try {
    const jobs = await Subscription.find({ washerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
