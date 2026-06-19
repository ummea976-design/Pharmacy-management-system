const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  genericName: {
    type: String,
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'Please provide a SKU'],
    unique: true,
    trim: true,
    uppercase: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Please provide a category']
  },
  costPrice: {
    type: Number,
    default: 0,
    min: 0
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Please provide a selling price'],
    min: 0
  },
  taxRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  manufacturer: {
    type: String,
    trim: true
  },
  requiresPrescription: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  trackStock: {
    type: Boolean,
    default: true
  },
  reorderLevel: {
    type: Number,
    default: 10,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes

productSchema.index({ category: 1 });
productSchema.index({ name: 'text', genericName: 'text' });

module.exports = mongoose.model('Product', productSchema);

