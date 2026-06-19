const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  registerId: {
    type: String,
    required: [true, 'Please provide a register ID'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user']
  },
  openingCash: {
    type: Number,
    required: [true, 'Please provide opening cash amount'],
    min: 0
  },
  closingCash: {
    type: Number,
    min: 0
  },
  openedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Indexes
shiftSchema.index({ user: 1 });
shiftSchema.index({ status: 1 });
shiftSchema.index({ registerId: 1, status: 1 });

module.exports = mongoose.model('Shift', shiftSchema);

