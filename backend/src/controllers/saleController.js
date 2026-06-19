const Sale = require('../models/Sale');
const { createSale } = require('../services/saleService');

// @desc    Get all sales
// @route   GET /api/sales
// @access  Private
const getSales = async (req, res, next) => {
  try {
    const {
      customer,
      user,
      startDate,
      endDate,
      status,
      search,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = {};

    if (customer) {
      query.customer = customer;
    }

    if (user) {
      query.user = user;
    }

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    if (search) {
      query.$or = [
        { saleId: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const sales = await Sale.find(query)
      .populate('customer', 'name phone')
      .populate('user', 'name email')
      .populate('shift', 'registerId')
      .populate('items.product', 'name sku')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Sale.countDocuments(query);

    res.json({
      success: true,
      data: sales,
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

// @desc    Get single sale
// @route   GET /api/sales/:id
// @access  Private
const getSale = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id)
      .populate('customer', 'name phone email address')
      .populate('user', 'name email')
      .populate('shift', 'registerId')
      .populate('items.product', 'name sku genericName');

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Sale not found'
        }
      });
    }

    res.json({
      success: true,
      data: sale
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create sale
// @route   POST /api/sales
// @access  Private
const createSaleRecord = async (req, res, next) => {
  try {
    const saleData = {
      ...req.body,
      user: req.user._id
    };

    const sale = await createSale(saleData);

    // Populate before sending response
    await sale.populate('customer', 'name phone');
    await sale.populate('user', 'name email');
    await sale.populate('items.product', 'name sku');

    res.status(201).json({
      success: true,
      data: sale
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete sale
// @route   DELETE /api/sales/:id
// @access  Private
const deleteSale = async (req, res, next) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Sale not found'
        }
      });
    }

    // Only allow deletion of recent sales (within 24 hours) or by admin
    const hoursSinceCreation = (Date.now() - sale.createdAt) / (1000 * 60 * 60);
    if (hoursSinceCreation > 24 && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Cannot delete sale older than 24 hours'
        }
      });
    }

    await sale.deleteOne();

    res.json({
      success: true,
      message: 'Sale deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSales,
  getSale,
  createSaleRecord,
  deleteSale
};

