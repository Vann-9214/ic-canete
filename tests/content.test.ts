import { describe, it, expect } from "vitest";
import {
  getProfile,
  getTimeline,
  getTechStack,
  getProjectsIntro,
  getAllProjects,
  getFeaturedProjects,
  getCategoriesWithProjects,
  getProjectBySlug,
} from "@/lib/content";

describe("Content Loader (lib/content.ts)", () => {
  describe("getProfile()", () => {
    it("returns profile data with identity, role, and socials", () => {
      const profile = getProfile();
      expect(profile.name).toBe("Ivan Cañete");
      expect(profile.handle).toBe("ICCañete");
      expect(profile.role).toBeDefined();
      expect(profile.tagline).toBeDefined();
      expect(Array.isArray(profile.aboutMe)).toBe(true);
    });

    it("filters out any social link with an empty url (FR-003)", () => {
      const profile = getProfile();
      expect(profile.socials).toBeDefined();
      for (const social of profile.socials!) {
        expect(social.url.trim().length).toBeGreaterThan(0);
      }
    });

    it("verifies resume file presence on disk and sets hasResumeFile boolean (FR-004)", () => {
      const profile = getProfile();
      expect(typeof profile.hasResumeFile).toBe("boolean");
      if (profile.resumeUrl) {
        expect(profile.hasResumeFile).toBe(true);
      }
    });
  });

  describe("getTimeline()", () => {
    it("returns ordered timeline entries sorted ascending by order", () => {
      const timeline = getTimeline();
      expect(Array.isArray(timeline)).toBe(true);
      expect(timeline.length).toBeGreaterThan(0);

      for (let i = 1; i < timeline.length; i++) {
        expect(timeline[i].order).toBeGreaterThanOrEqual(timeline[i - 1].order);
      }
    });

    it("normalizes missing or empty endDate to null for ongoing entries (FR-006)", () => {
      const timeline = getTimeline();
      const ongoing = timeline.filter((e) => e.endDate === null);
      expect(ongoing.length).toBeGreaterThan(0);
    });

    it("validates that all entries have recognized types", () => {
      const timeline = getTimeline();
      const validTypes = new Set([
        "work",
        "school",
        "career",
        "certification",
        "achievement",
      ]);
      for (const entry of timeline) {
        expect(validTypes.has(entry.type)).toBe(true);
      }
    });
  });

  describe("getTechStack()", () => {
    it("returns non-empty tech items with names", () => {
      const tech = getTechStack();
      expect(Array.isArray(tech)).toBe(true);
      expect(tech.length).toBeGreaterThan(0);
      for (const item of tech) {
        expect(item.name.trim().length).toBeGreaterThan(0);
      }
    });
  });

  describe("getProjectsIntro()", () => {
    it("returns headline, explanation, and preferred categoryOrder", () => {
      const intro = getProjectsIntro();
      expect(intro.headline).toBe("All Projects");
      expect(intro.explanation).toBeDefined();
      expect(Array.isArray(intro.categoryOrder)).toBe(true);
    });
  });

  describe("getAllProjects() & getFeaturedProjects()", () => {
    it("loads sample projects with valid frontmatter and slug", () => {
      const projects = getAllProjects();
      expect(projects.length).toBeGreaterThanOrEqual(3);
      for (const p of projects) {
        expect(p.slug).toBeDefined();
        expect(p.title).toBeDefined();
        expect(p.category).toBeDefined();
        expect(p.shortDescription).toBeDefined();
      }
    });

    it("filters out any empty project links or downloads (FR-015)", () => {
      const projects = getAllProjects();
      for (const p of projects) {
        if (p.links) {
          for (const link of p.links) {
            expect(link.label.trim().length).toBeGreaterThan(0);
            expect(link.url.trim().length).toBeGreaterThan(0);
          }
        }
        if (p.downloads) {
          for (const d of p.downloads) {
            expect(d.label.trim().length).toBeGreaterThan(0);
            expect(d.fileUrl.trim().length).toBeGreaterThan(0);
          }
        }
      }
    });

    it("returns only featured projects for getFeaturedProjects()", () => {
      const featured = getFeaturedProjects();
      expect(featured.length).toBeGreaterThan(0);
      for (const p of featured) {
        expect(p.isFeatured).toBe(true);
      }
    });
  });

  describe("getCategoriesWithProjects()", () => {
    it("groups projects by category, excludes 0-count categories, and designates a bestProject (FR-010, FR-011)", () => {
      const groups = getCategoriesWithProjects();
      expect(groups.length).toBeGreaterThan(0);
      for (const g of groups) {
        expect(g.category).toBeDefined();
        expect(g.projects.length).toBeGreaterThan(0);
        expect(g.bestProject).toBeDefined();
        expect(g.projects.some((p) => p.slug === g.bestProject.slug)).toBe(true);
      }
    });

    it("orders categories following projects-intro.json categoryOrder", () => {
      const intro = getProjectsIntro();
      const groups = getCategoriesWithProjects();
      const groupNames = groups.map((g) => g.category);

      let lastIndex = -1;
      for (const cat of intro.categoryOrder ?? []) {
        const idx = groupNames.indexOf(cat);
        if (idx !== -1) {
          expect(idx).toBeGreaterThan(lastIndex);
          lastIndex = idx;
        }
      }
    });
  });

  describe("getProjectBySlug(slug)", () => {
    it("returns project with full MDX details when slug exists", () => {
      const project = getProjectBySlug("sentinel-cloud-observability");
      expect(project).not.toBeNull();
      expect(project!.title).toBe("Sentinel Telemetry & Incident Console");
      expect(project!.fullDetails).toContain("## Overview");
    });

    it("returns null when project slug does not exist (FR-017, SC-003)", () => {
      const project = getProjectBySlug("non-existent-project-slug");
      expect(project).toBeNull();
    });
  });
});
