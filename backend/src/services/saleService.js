const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Stock = require('../models/Stock');
const Product = require('../models/Product');
const generateSaleId = require('../utils/generateSaleId');
const { getProductStock, syncProductStock } = require('./stockService');

// Create sale without transaction (for standalone MongoDB)
const createSale = async (saleData) => {
  try {
    // Generate unique sale ID
    let saleId;
    let isUnique = false;
    while (!isUnique) {
      saleId = generateSaleId();
      const existing = await Sale.findOne({ saleId });
      if (!existing) {
        isUnique = true;
      }
    }

    // Validate and process items
    const processedItems = [];
    let subtotal = 0;

    for (const item of saleData.items) {
      const product = await Product.findById(item.product);

      if (!product || !product.isActive) {
        throw new Error(`Product ${item.product} not found or inactive`);
      }

      // Check stock availability
      if (product.trackStock) {
        const availableStock = await getProductStock(item.product);
        if (availableStock < item.quantity) {
          const error = new Error(`Insufficient stock for product ${product.name}`);
          error.statusCode = 400;
          throw error;
        }

        // Deduct stock using FIFO (oldest first)
        await deductStock(item.product, item.quantity);
      }

      const itemTotal = item.unitPrice * item.quantity;
      subtotal += itemTotal;

      processedItems.push({
        product: item.product,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: itemTotal,
        prescription: item.prescription || undefined
      });
    }

    // Calculate tax and total
    const tax = saleData.tax || 0;
    const total = subtotal + tax;

    // Create sale
    const sale = await Sale.create({
      saleId,
      customer: saleData.customer || null,
      user: saleData.user,
      registerId: saleData.registerId || '1',
      shift: saleData.shift || null,
      items: processedItems,
      subtotal,
      tax,
      total,
      paymentMethod: saleData.paymentMethod,
      status: 'completed'
    });

    return sale;
  } catch (error) {
    throw error;
  }
};

// Deduct stock using FIFO
const deductStock = async (productId, quantity) => {
  const stockEntries = await Stock.find({ product: productId })
    .sort({ expiryDate: 1, createdAt: 1 });

  let remaining = quantity;

  for (const entry of stockEntries) {
    if (remaining <= 0) break;

    if (entry.quantity <= remaining) {
      remaining -= entry.quantity;
      entry.quantity = 0;
      await entry.save();
    } else {
      entry.quantity -= remaining;
      remaining = 0;
      await entry.save();
    }
  }

  // Sync the product's total stock cache
  // We need to require this dynamically or move it to prevent circular deps if any, 
  // but stockService depends on Stock Model, so it should be fine.
  // Ideally, import { syncProductStock } from './stockService' at the top if not circular.
  // Checking imports... stockService imports Stock and Product. 
  // saleService imports Sale, Stock, Product. 
  // If stockService also imports saleService (unlikely), it would be circular.
  // Let's check imports in saleService.js
  // It imports { getProductStock } from './stockService'.
  // We should also import syncProductStock there.
  await syncProductStock(productId);

  if (remaining > 0) {
    const error = new Error('Insufficient stock available');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createSale
};
