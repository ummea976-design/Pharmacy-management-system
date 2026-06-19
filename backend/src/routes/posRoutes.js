const express = require('express');
const router = express.Router();
const {
  searchPOSProducts,
  validateCart
} = require('../controllers/posController');
const {
  getShifts,
  openShift,
  closeShift
} = require('../controllers/shiftController');
const { protect } = require('../middleware/auth');

router.route('/products')
  .get(protect, searchPOSProducts);

router.route('/cart/validate')
  .post(protect, validateCart);

router.route('/shifts')
  .get(protect, getShifts);

router.route('/shifts/open')
  .post(protect, openShift);

router.route('/shifts/:id/close')
  .post(protect, closeShift);

module.exports = router;

