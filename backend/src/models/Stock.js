const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide a product']
  },
  batchNumber: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide quantity'],
    min: 0
  },
  location: {
    type: String,
    trim: true
  },
  expiryDate: {
    type: Date
  },
  supplierInvoice: {
    type: String,
    trim: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes
stockSchema.index({ product: 1 });
stockSchema.index({ expiryDate: 1 });
stockSchema.index({ quantity: 1 });

module.exports = mongoose.model('Stock', stockSchema);

