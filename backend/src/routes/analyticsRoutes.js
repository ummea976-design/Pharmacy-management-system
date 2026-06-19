const express = require('express');
const router = express.Router();
const {
  getDashboardMetrics,
  getSalesSummary,
  getTopProducts,
  getInventorySummary,
  getSalesTrend
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');

router.route('/dashboard')
  .get(protect, getDashboardMetrics);

router.route('/sales-summary')
  .get(protect, getSalesSummary);

router.route('/top-products')
  .get(protect, getTopProducts);

router.route('/inventory-summary')
  .get(protect, getInventorySummary);

router.route('/sales-trend')
  .get(protect, getSalesTrend);

module.exports = router;

