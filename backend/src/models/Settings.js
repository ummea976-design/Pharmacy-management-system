const mongoose = require('mongoose');

// Business Settings Schema
const businessSettingsSchema = new mongoose.Schema({
  pharmacyName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  address: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  registrationNumber: {
    type: String,
    trim: true
  },
  taxId: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Localization Settings Schema
const localizationSettingsSchema = new mongoose.Schema({
  language: {
    type: String,
    default: 'en'
  },
  currency: {
    type: String,
    default: 'usd'
  },
  timezone: {
    type: String,
    default: 'utc'
  },
  dateFormat: {
    type: String,
    default: 'mdy'
  }
}, {
  timestamps: true
});

// Invoice Settings Schema
const invoiceSettingsSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
    trim: true
  },
  headerText: {
    type: String,
    trim: true
  },
  footerText: {
    type: String,
    trim: true
  },
  enableTax: {
    type: Boolean,
    default: false
  },
  taxName: {
    type: String,
    trim: true,
    default: 'VAT'
  },
  taxRate: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

module.exports = {
  BusinessSettings: mongoose.model('BusinessSettings', businessSettingsSchema),
  LocalizationSettings: mongoose.model('LocalizationSettings', localizationSettingsSchema),
  InvoiceSettings: mongoose.model('InvoiceSettings', invoiceSettingsSchema)
};

