import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  visible: z.boolean().default(true),
  isMain: z.boolean().default(false),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
