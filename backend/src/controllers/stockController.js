const Stock = require('../models/Stock');
const Product = require('../models/Product');
const { getProductStock, getStockAlerts, syncProductStock } = require('../services/stockService');

// @desc    Get all stock entries
// @route   GET /api/stock
// @access  Private
const getStock = async (req, res, next) => {
  try {
    const {
      product,
      lowStock,
      expiringSoon,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = {};

    if (product) {
      query.product = product;
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    let stockEntries = await Stock.find(query)
      .populate('product', 'name sku reorderLevel')
      .populate('supplier', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Filter for low stock if requested
    if (lowStock === 'true') {
      stockEntries = stockEntries.filter(entry => {
        if (!entry.product || !entry.product.trackStock) return false;
        return entry.quantity < entry.product.reorderLevel;
      });
    }

    // Filter for expiring soon if requested
    if (expiringSoon === 'true') {
      const now = new Date();
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(now.getMonth() + 3);

      stockEntries = stockEntries.filter(entry => {
        if (!entry.expiryDate) return false;
        const expiryDate = new Date(entry.expiryDate);
        return expiryDate >= now && expiryDate <= threeMonthsFromNow;
      });
    }

    const total = await Stock.countDocuments(query);

    res.json({
      success: true,
      data: stockEntries,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single stock entry
// @route   GET /api/stock/:id
// @access  Private
const getStockEntry = async (req, res, next) => {
  try {
    const stockEntry = await Stock.findById(req.params.id)
      .populate('product', 'name sku')
      .populate('supplier', 'name');

    if (!stockEntry) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Stock entry not found'
        }
      });
    }

    res.json({
      success: true,
      data: stockEntry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add stock entry
// @route   POST /api/stock
// @access  Private
const addStock = async (req, res, next) => {
  try {
    // Verify product exists
    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Product not found'
        }
      });
    }

    const stockEntry = await Stock.create(req.body);

    // Sync product total stock
    await syncProductStock(product._id);

    // Populate before sending response
    await stockEntry.populate('product', 'name sku');
    if (stockEntry.supplier) {
      await stockEntry.populate('supplier', 'name');
    }

    res.status(201).json({
      success: true,
      data: stockEntry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update stock entry
// @route   PUT /api/stock/:id
// @access  Private
const updateStock = async (req, res, next) => {
  try {
    const stockEntry = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
      .populate('product', 'name sku')
      .populate('supplier', 'name');

    if (!stockEntry) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Stock entry not found'
        }
      });
    }

    // Sync product total stock
    await syncProductStock(stockEntry.product._id || stockEntry.product);

    res.json({
      success: true,
      data: stockEntry
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get stock alerts
// @route   GET /api/stock/alerts
// @access  Private
const getAlerts = async (req, res, next) => {
  try {
    const alerts = await getStockAlerts();

    res.json({
      success: true,
      data: {
        lowStock: alerts.lowStock,
        expiringSoon: alerts.expiringSoon,
        outOfStock: alerts.outOfStock,
        summary: {
          lowStockCount: alerts.lowStock.length,
          expiringSoonCount: alerts.expiringSoon.length,
          outOfStockCount: alerts.outOfStock.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStock,
  getStockEntry,
  addStock,
  updateStock,
  getAlerts
};

