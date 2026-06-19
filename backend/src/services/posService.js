const Product = require('../models/Product');
const Stock = require('../models/Stock');
const { getProductStock } = require('./stockService');

// Search products for POS with stock information
const searchProducts = async (searchTerm, category) => {
  const query = { isActive: true };

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { genericName: { $regex: searchTerm, $options: 'i' } },
      { sku: { $regex: searchTerm, $options: 'i' } }
    ];
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query)
    .populate('category', 'name')
    .limit(50);

  // Add stock information to each product
  const productsWithStock = await Promise.all(
    products.map(async (product) => {
      let stock = 0;
      if (product.trackStock) {
        stock = await getProductStock(product._id);
      }

      return {
        ...product.toObject(),
        stock
      };
    })
  );

  return productsWithStock;
};

// Validate cart items
const validateCartItems = async (items) => {
  const errors = [];
  const validatedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    
    if (!product) {
      errors.push({
        productId: item.productId,
        error: 'Product not found'
      });
      continue;
    }

    if (!product.isActive) {
      errors.push({
        productId: item.productId,
        error: 'Product is not active'
      });
      continue;
    }

    if (product.trackStock) {
      const availableStock = await getProductStock(product._id);
      if (availableStock < item.quantity) {
        errors.push({
          productId: item.productId,
          productName: product.name,
          error: `Insufficient stock. Available: ${availableStock}, Requested: ${item.quantity}`
        });
        continue;
      }
    }

    validatedItems.push({
      product: product._id,
      quantity: item.quantity,
      unitPrice: product.sellingPrice,
      totalPrice: product.sellingPrice * item.quantity
    });
  }

  return { validatedItems, errors };
};

module.exports = {
  searchProducts,
  validateCartItems
};

