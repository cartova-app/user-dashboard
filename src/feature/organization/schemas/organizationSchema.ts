import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters'),
});

export const organizationGeneralSettingsSchema = z.object({
  organizationName: z
    .string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters'),
  defaultLanguage: z.string().min(1, 'Default language is required'),
  timeZone: z.string().min(1, 'Time zone is required'),
  logoUrl: z.string().optional(),
});

export const organizationSecuritySettingsSchema = z.object({
  requireMfa: z.boolean(),
  sessionTimeout: z.string().min(1, 'Session timeout is required'),
});

export type OrganizationGeneralSettingsFormValues = z.infer<typeof organizationGeneralSettingsSchema>;
export type OrganizationSecuritySettingsFormValues = z.infer<typeof organizationSecuritySettingsSchema>;
