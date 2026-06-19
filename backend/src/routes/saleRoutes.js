const express = require('express');
const router = express.Router();
const {
  getSales,
  getSale,
  createSaleRecord,
  deleteSale
} = require('../controllers/saleController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getSales)
  .post(protect, createSaleRecord);

router.route('/:id')
  .get(protect, getSale)
  .delete(protect, deleteSale);

module.exports = router;

