import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name must be 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email must be 254 characters or fewer."),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(2000, "Message exceeds the 2,000-character limit."),
  website: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
