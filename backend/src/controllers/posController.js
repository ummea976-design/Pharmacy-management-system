const Product = require('../models/Product');
const { searchProducts, validateCartItems } = require('../services/posService');

// @desc    Search products for POS
// @route   GET /api/pos/products
// @access  Private
const searchPOSProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const products = await searchProducts(search, category);

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Validate cart items
// @route   POST /api/pos/cart/validate
// @access  Private
const validateCart = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Cart items are required'
        }
      });
    }

    const { validatedItems, errors } = await validateCartItems(items);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'CART_VALIDATION_ERROR',
          message: 'Some items in cart are invalid',
          details: errors
        },
        validatedItems
      });
    }

    res.json({
      success: true,
      data: validatedItems
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchPOSProducts,
  validateCart
};

