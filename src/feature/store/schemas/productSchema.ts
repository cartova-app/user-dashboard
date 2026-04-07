import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(100, 'Product name must be at most 100 characters'),
  description: z.string().max(500).optional(),
  price: z.coerce.number().min(0, 'Price must be 0 or more'),
  quantity: z.coerce.number().int().min(0, 'Stock must be 0 or more'),
  categories: z.array(z.string()).optional(),
  visible: z.boolean().default(true),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
