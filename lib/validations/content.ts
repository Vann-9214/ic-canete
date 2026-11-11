import { z } from "zod";

export const socialLinkSchema = z.object({
  platform: z.string(),
  label: z.string(),
  url: z.string(),
});

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  handle: z.string().min(1, "Handle is required"),
  role: z.string().min(1, "Role is required"),
  tagline: z.string().min(1, "Tagline is required"),
  aboutMe: z.array(z.string()).default([]),
  resumeUrl: z.string().optional(),
  socials: z.array(socialLinkSchema).default([]),
});

export const timelineEntrySchema = z.object({
  id: z.string().min(1, "ID is required"),
  type: z.enum(["work", "school", "career", "certification", "achievement"]),
  title: z.string().min(1, "Title is required"),
  place: z.string().min(1, "Place is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  description: z.string().default(""),
  order: z.number().default(999),
});

export const techStackItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
  category: z.string().optional(),
});

export const projectsIntroSchema = z.object({
  headline: z.string().default("All Projects"),
  explanation: z.string().default(""),
  categoryOrder: z.array(z.string()).default([]),
});

export const projectImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export const projectLinkSchema = z.object({
  label: z.string(),
  url: z.string(),
});

export const projectDownloadSchema = z.object({
  label: z.string(),
  fileUrl: z.string(),
  fileSize: z.string().optional(),
});

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  category: z.string().min(1, "Category is required"),
  isFeatured: z.boolean().default(false),
  isBestInCategory: z.boolean().default(false),
  order: z.number().default(999),
  images: z.array(projectImageSchema).default([]),
  links: z.array(projectLinkSchema).default([]),
  downloads: z.array(projectDownloadSchema).default([]),
});
