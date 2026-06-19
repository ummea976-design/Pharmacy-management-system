const { z } = require('zod');

const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Product name is required'),
    genericName: z.string().optional(),
    sku: z.string().min(1, 'SKU is required'),
    category: z.string().min(1, 'Category is required'),
    costPrice: z.number().min(0, 'Cost price must be positive').optional(),
    sellingPrice: z.number().min(0, 'Selling price must be positive'),
    taxRate: z.number().min(0).max(100).optional(),
    manufacturer: z.string().optional(),
    requiresPrescription: z.boolean().optional(),
    isActive: z.boolean().optional(),
    trackStock: z.boolean().optional(),
    reorderLevel: z.number().min(0).optional()
  })
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    genericName: z.string().optional(),
    sku: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    costPrice: z.number().min(0).optional(),
    sellingPrice: z.number().min(0).optional(),
    taxRate: z.number().min(0).max(100).optional(),
    manufacturer: z.string().optional(),
    requiresPrescription: z.boolean().optional(),
    isActive: z.boolean().optional(),
    trackStock: z.boolean().optional(),
    reorderLevel: z.number().min(0).optional()
  })
});

module.exports = {
  createProductSchema,
  updateProductSchema
};

