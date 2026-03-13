import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  userEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    trim: true
  },
  userPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  vehicleType: {
    type: String,
    required: [true, 'Vehicle type is required'],
    enum: ['Hatchback', 'Sedan', 'SUV', 'MUV', 'Truck'],
    default: 'Sedan'
  },
  planName: {
    type: String,
    required: [true, 'Plan name is required'],
    enum: ['Basic', 'Standard', 'Premium']
  },
  planPrice: {
    type: Number,
    required: true
  },
  planDuration: {
    type: String,
    default: '1 Month'
  },
  status: {
    type: String,
    enum: ['new', 'unassigned', 'assigned', 'completed'],
    default: 'new'
  },
  washerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  washerName: {
    type: String,
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
