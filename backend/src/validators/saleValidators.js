const { z } = require('zod');

const createSaleSchema = z.object({
  body: z.object({
    customer: z.string().optional().nullable(),
    registerId: z.string().optional(),
    shift: z.string().optional(),
    items: z.array(z.object({
      product: z.string().min(1, 'Product ID is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      unitPrice: z.number().min(0, 'Unit price must be positive'),
      prescription: z.object({
        doctorName: z.string().optional(),
        patientName: z.string().optional(),
        dosage: z.string().optional(),
        duration: z.string().optional()
      }).optional()
    })).min(1, 'At least one item is required'),
    tax: z.number().min(0).optional(),
    paymentMethod: z.enum(['Cash', 'Card', 'Mobile', 'Insurance'])
  })
});

module.exports = {
  createSaleSchema
};

