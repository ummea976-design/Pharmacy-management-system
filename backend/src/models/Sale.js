const mongoose = require('mongoose');

// Prescription subdocument schema
const prescriptionSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    trim: true
  },
  patientName: {
    type: String,
    trim: true
  },
  dosage: {
    type: String,
    trim: true
  },
  duration: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  _id: false
});

// SaleItem subdocument schema
const saleItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  prescription: {
    type: prescriptionSchema
  }
}, {
  _id: true
});

// Sale schema
const saleSchema = new mongoose.Schema({
  saleId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user']
  },
  registerId: {
    type: String,
    trim: true
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shift'
  },
  items: {
    type: [saleItemSchema],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'Sale must have at least one item'
    }
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  },
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'Mobile', 'Insurance'],
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'cancelled', 'refunded'],
    default: 'completed'
  }
}, {
  timestamps: true
});

// Indexes

saleSchema.index({ customer: 1 });
saleSchema.index({ user: 1 });
saleSchema.index({ shift: 1 });
saleSchema.index({ createdAt: -1 });
saleSchema.index({ status: 1 });

module.exports = mongoose.model('Sale', saleSchema);

