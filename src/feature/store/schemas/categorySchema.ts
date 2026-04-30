import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  visible: z.boolean().default(true),
  isMain: z.boolean().default(false),
  rank: z.number().int().min(0).default(0),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
