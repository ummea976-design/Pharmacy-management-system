const Stock = require('../models/Stock');
const Product = require('../models/Product');

// Calculate total available stock for a product
const getProductStock = async (productId) => {
  const stockEntries = await Stock.find({ product: productId });
  return stockEntries.reduce((total, entry) => total + entry.quantity, 0);
};

// Get stock alerts
const getStockAlerts = async () => {
  const products = await Product.find({ trackStock: true, isActive: true });

  const alerts = {
    lowStock: [],
    expiringSoon: [],
    outOfStock: []
  };

  const now = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(now.getMonth() + 3);

  for (const product of products) {
    const stockEntries = await Stock.find({ product: product._id });
    const totalStock = stockEntries.reduce((sum, entry) => sum + entry.quantity, 0);

    // Check for out of stock
    if (totalStock === 0) {
      alerts.outOfStock.push({
        product: product._id,
        productName: product.name,
        sku: product.sku,
        quantity: 0,
        reorderLevel: product.reorderLevel
      });
    }
    // Check for low stock
    else if (totalStock < product.reorderLevel) {
      alerts.lowStock.push({
        product: product._id,
        productName: product.name,
        sku: product.sku,
        quantity: totalStock,
        reorderLevel: product.reorderLevel,
        stockEntries: stockEntries.map(entry => ({
          batchNumber: entry.batchNumber,
          quantity: entry.quantity,
          expiryDate: entry.expiryDate,
          location: entry.location
        }))
      });
    }

    // Check for expiring soon
    const expiringEntries = stockEntries.filter(entry => {
      if (!entry.expiryDate) return false;
      const expiryDate = new Date(entry.expiryDate);
      return expiryDate >= now && expiryDate <= threeMonthsFromNow;
    });

    if (expiringEntries.length > 0) {
      alerts.expiringSoon.push({
        product: product._id,
        productName: product.name,
        sku: product.sku,
        entries: expiringEntries.map(entry => ({
          batchNumber: entry.batchNumber,
          quantity: entry.quantity,
          expiryDate: entry.expiryDate,
          location: entry.location
        }))
      });
    }
  }

  return alerts;
};

// Update Product.stock based on total stock entries
const syncProductStock = async (productId) => {
  const totalStock = await getProductStock(productId);
  await Product.findByIdAndUpdate(productId, { stock: totalStock });
  return totalStock;
};

module.exports = {
  getProductStock,
  getStockAlerts,
  syncProductStock
};

