import { z } from 'zod';
export const createStoreSchema = z
  .object({
    name: z.string().min(3, 'Store name must be at least 3 characters').max(100),

    domain: z
      .string()
      .optional()
      .refine((value) => !value || /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/.test(value), {
        message: 'Invalid domain format',
      }),

    description: z.string().max(500).optional(),

    theme: z.enum(['basic', 'advanced']),

    type: z.enum(['ecommerce', 'services']),

    defaultCurrency: z.enum(['EGP', 'USD', 'EUR', 'GBP']),

    allowedCurrencies: z.array(z.enum(['EGP', 'USD', 'EUR', 'GBP'])).min(1),
  })
  .superRefine((data, ctx) => {
    if (!data.allowedCurrencies.includes(data.defaultCurrency)) {
      ctx.addIssue({
        path: ['allowedCurrencies'],
        message: 'Default currency must be included in allowed currencies',
        code: z.ZodIssueCode.custom,
      });
    }
  });
