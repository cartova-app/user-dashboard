import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s()-]+$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  storeName: z
    .string()
    .min(2, "Store name must be at least 2 characters")
    .max(100, "Store name must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
});
