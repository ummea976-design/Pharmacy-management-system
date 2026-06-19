const Sale = require('../models/Sale');
const Product = require('../models/Product');
const Stock = require('../models/Stock');
const { getStockAlerts } = require('../services/stockService');

// @desc    Get dashboard metrics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardMetrics = async (req, res, next) => {
  try {
    const now = new Date();
    const startOfToday = new Date(now.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Today's sales
    const todaySales = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Monthly revenue
    const monthlyRevenue = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    // Stock alerts
    const alerts = await getStockAlerts();

    res.json({
      success: true,
      data: {
        todaysSales: todaySales[0]?.total || 0,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
        stockAlerts: alerts.lowStock.length + alerts.outOfStock.length,
        expiringSoon: alerts.expiringSoon.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get sales summary
// @route   GET /api/analytics/sales-summary
// @access  Private
const getSalesSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const matchQuery = { status: 'completed' };

    if (startDate || endDate) {
      matchQuery.createdAt = {};
      if (startDate) {
        matchQuery.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        matchQuery.createdAt.$lte = new Date(endDate);
      }
    }

    const summary = await Sale.aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$total' },
          avgOrderValue: { $avg: '$total' }
        }
      }
    ]);

    const result = summary[0] || {
      totalSales: 0,
      totalRevenue: 0,
      avgOrderValue: 0
    };

    res.json({
      success: true,
      data: {
        totalSales: result.totalSales,
        totalRevenue: result.totalRevenue,
        avgOrderValue: Math.round(result.avgOrderValue * 100) / 100
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get top selling products
// @route   GET /api/analytics/top-products
// @access  Private
const getTopProducts = async (req, res, next) => {
  try {
    const { startDate, endDate, limit = 10 } = req.query;

    const matchQuery = { status: 'completed' };

    if (startDate || endDate) {
      matchQuery.createdAt = {};
      if (startDate) {
        matchQuery.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        matchQuery.createdAt.$lte = new Date(endDate);
      }
    }

    const topProducts = await Sale.aggregate([
      { $match: matchQuery },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          quantitySold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.total' }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: parseInt(limit, 10) },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          product: {
            _id: '$product._id',
            name: '$product.name',
            sku: '$product.sku'
          },
          quantitySold: 1,
          revenue: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: topProducts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inventory summary
// @route   GET /api/analytics/inventory-summary
// @access  Private
const getInventorySummary = async (req, res, next) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });

    // Calculate stock value
    const stockValue = await Stock.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $group: {
          _id: null,
          totalValue: {
            $sum: {
              $multiply: ['$quantity', '$product.costPrice']
            }
          }
        }
      }
    ]);

    const alerts = await getStockAlerts();

    res.json({
      success: true,
      data: {
        totalProducts,
        stockValue: stockValue[0]?.totalValue || 0,
        lowStock: alerts.lowStock.length + alerts.outOfStock.length,
        expiringSoon: alerts.expiringSoon.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get sales trend
// @route   GET /api/analytics/sales-trend
// @access  Private
const getSalesTrend = async (req, res, next) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days, 10));

    const trend = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      data: trend
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardMetrics,
  getSalesSummary,
  getTopProducts,
  getInventorySummary,
  getSalesTrend
};

