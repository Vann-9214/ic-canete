export interface SocialLink {
  platform: "github" | "linkedin" | "x" | "email" | "youtube" | "itchio" | string;
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  aboutMe?: string[];
  resumeUrl?: string;
  socials?: SocialLink[];
}

export interface ProfileData extends Profile {
  hasResumeFile: boolean;
}

export interface TimelineEntry {
  id: string;
  type: "work" | "school" | "career" | "certification" | "achievement";
  title: string;
  place: string;
  startDate: string;
  endDate?: string | null;
  description: string;
  order: number;
}

export interface TechStackItem {
  name: string;
  icon?: string;
  category?: "Languages" | "Frameworks & Web" | "Game Dev" | "Hardware & Tools" | string;
}

export interface ProjectsIntro {
  headline?: string;
  explanation?: string;
  categoryOrder?: string[];
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectDownload {
  label: string;
  fileUrl: string;
  fileSize?: string;
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  isFeatured?: boolean;
  isBestInCategory?: boolean;
  order?: number;
  images?: ProjectImage[];
  links?: ProjectLink[];
  downloads?: ProjectDownload[];
  fullDetails?: string;
}

export interface CategoryWithProjects {
  category: string;
  bestProject: Project;
  projects: Project[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  website?: string;
}
