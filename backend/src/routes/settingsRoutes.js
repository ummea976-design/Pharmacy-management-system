const express = require('express');
const router = express.Router();
const {
  getBusinessSettings,
  updateBusinessSettings,
  getLocalizationSettings,
  updateLocalizationSettings,
  getInvoiceSettings,
  updateInvoiceSettings,
  uploadLogo
} = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');

router.route('/business')
  .get(protect, getBusinessSettings)
  .put(protect, updateBusinessSettings);

router.route('/localization')
  .get(protect, getLocalizationSettings)
  .put(protect, updateLocalizationSettings);

router.route('/invoice')
  .get(protect, getInvoiceSettings)
  .put(protect, updateInvoiceSettings);

router.route('/invoice/logo')
  .post(protect, uploadLogo);

module.exports = router;

