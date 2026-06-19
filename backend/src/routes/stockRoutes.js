const express = require('express');
const router = express.Router();
const {
  getStock,
  getStockEntry,
  addStock,
  updateStock,
  getAlerts
} = require('../controllers/stockController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getStock)
  .post(protect, addStock);

router.route('/alerts')
  .get(protect, getAlerts);

router.route('/:id')
  .get(protect, getStockEntry)
  .put(protect, updateStock);

module.exports = router;

