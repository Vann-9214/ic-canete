import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type {
  ProfileData,
  TimelineEntry,
  TechStackItem,
  ProjectsIntro,
  Project,
  CategoryWithProjects,
} from "./types";
import {
  profileSchema,
  timelineEntrySchema,
  techStackItemSchema,
  projectsIntroSchema,
  projectFrontmatterSchema,
} from "./validations/content";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

export function getProfile(): ProfileData {
  const filePath = path.join(CONTENT_DIR, "profile.json");
  if (!fs.existsSync(filePath)) {
    return {
      name: "Ivan Cañete",
      handle: "ICCañete",
      role: "Software Engineer",
      tagline: "",
      aboutMe: [],
      resumeUrl: undefined,
      socials: [],
      hasResumeFile: false,
    };
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = profileSchema.parse(JSON.parse(raw));

  const socials = parsed.socials.filter(
    (item) => typeof item.url === "string" && item.url.trim().length > 0
  );

  let hasResumeFile = false;
  if (parsed.resumeUrl && parsed.resumeUrl.trim().length > 0) {
    const relativePath = parsed.resumeUrl.replace(/^\/+/, "");
    const resumeDiskPath = path.join(PUBLIC_DIR, relativePath);
    hasResumeFile = fs.existsSync(resumeDiskPath);
  }

  return {
    ...parsed,
    socials,
    hasResumeFile,
  };
}

export function getTimeline(): TimelineEntry[] {
  const filePath = path.join(CONTENT_DIR, "timeline.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = z.array(timelineEntrySchema).parse(JSON.parse(raw));

  return parsed.sort((a, b) => a.order - b.order);
}

export function getTechStack(): TechStackItem[] {
  const filePath = path.join(CONTENT_DIR, "tech-stack.json");
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = z.array(techStackItemSchema).parse(JSON.parse(raw));

  return parsed.filter(
    (item) => typeof item.name === "string" && item.name.trim().length > 0
  );
}

export function getProjectsIntro(): ProjectsIntro {
  const filePath = path.join(CONTENT_DIR, "projects-intro.json");
  if (!fs.existsSync(filePath)) {
    return {
      headline: "All Projects",
      explanation: "",
      categoryOrder: [],
    };
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return projectsIntroSchema.parse(JSON.parse(raw));
}

function parseProjectFile(filePath: string, slug: string): Project {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = projectFrontmatterSchema.parse(data);

  const links = frontmatter.links.filter(
    (link) => link.label?.trim().length > 0 && link.url?.trim().length > 0
  );

  const downloads = frontmatter.downloads.filter(
    (d) => d.label?.trim().length > 0 && d.fileUrl?.trim().length > 0
  );

  return {
    slug,
    title: frontmatter.title,
    shortDescription: frontmatter.shortDescription,
    category: frontmatter.category,
    isFeatured: frontmatter.isFeatured,
    isBestInCategory: frontmatter.isBestInCategory,
    order: frontmatter.order,
    images: frontmatter.images,
    links,
    downloads,
    fullDetails: content,
  };
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(CONTENT_DIR, "projects");
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".mdx"));
  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    return parseProjectFile(path.join(projectsDir, file), slug);
  });

  return projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => Boolean(project.isFeatured));
}

export function getCategoriesWithProjects(): CategoryWithProjects[] {
  const projects = getAllProjects();
  const intro = getProjectsIntro();

  const categoryMap = new Map<string, Project[]>();
  for (const project of projects) {
    const cat = project.category?.trim();
    if (!cat) continue;
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, []);
    }
    categoryMap.get(cat)!.push(project);
  }

  // Filter out any categories with 0 projects
  for (const [cat, list] of categoryMap.entries()) {
    if (list.length === 0) {
      categoryMap.delete(cat);
    }
  }

  // Order categories according to intro.categoryOrder, then alphabetical
  const definedOrder = intro.categoryOrder ?? [];
  const orderedCategoryNames: string[] = [];

  for (const cat of definedOrder) {
    if (categoryMap.has(cat) && !orderedCategoryNames.includes(cat)) {
      orderedCategoryNames.push(cat);
    }
  }

  const remaining = Array.from(categoryMap.keys())
    .filter((cat) => !orderedCategoryNames.includes(cat))
    .sort((a, b) => a.localeCompare(b));

  orderedCategoryNames.push(...remaining);

  return orderedCategoryNames.map((category) => {
    const categoryProjects = categoryMap.get(category)!;
    categoryProjects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    const bestProject =
      categoryProjects.find((p) => p.isBestInCategory === true) ?? categoryProjects[0];

    return {
      category,
      bestProject,
      projects: categoryProjects,
    };
  });
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(CONTENT_DIR, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return parseProjectFile(filePath, slug);
}
