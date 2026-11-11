import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { HeroSection } from "@/components/home/hero-section";
import { AboutTimeline } from "@/components/home/about-timeline";
import { ProjectsBrowser } from "@/components/projects/projects-browser";
import { ContactForm } from "@/components/home/contact-form";
import type { ProfileData, TimelineEntry, CategoryWithProjects, ProjectsIntro } from "@/lib/types";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
}));

describe("Component Tests & Edge-Case Fallbacks", () => {
  describe("HeroSection (Download CV fallback)", () => {
    const baseProfile: ProfileData = {
      name: "Ivan Cañete",
      handle: "ICCañete",
      role: "Software Engineer",
      tagline: "Building cool things",
      aboutMe: ["Paragraph 1"],
      resumeUrl: "/resume.pdf",
      hasResumeFile: true,
      socials: [{ platform: "github", label: "GitHub", url: "https://github.com/ic-canete" }],
    };

    it("renders a direct download link when hasResumeFile is true (FR-004)", () => {
      render(<HeroSection profile={baseProfile} />);
      const downloadLink = screen.getByRole("link", { name: /download cv/i });
      expect(downloadLink).toHaveAttribute("href", "/resume.pdf");
      expect(downloadLink).toHaveAttribute("download");
    });

    it("renders a toggle button displaying 'Resume not available right now.' when hasResumeFile is false (FR-004, SC-003)", () => {
      const profileNoResume: ProfileData = {
        ...baseProfile,
        hasResumeFile: false,
      };

      render(<HeroSection profile={profileNoResume} />);
      const downloadBtn = screen.getByRole("button", { name: /download cv/i });
      expect(downloadBtn).toBeInTheDocument();

      // Initially message is not shown
      expect(screen.queryByText(/resume not available right now/i)).not.toBeInTheDocument();

      // Click toggles status pill
      fireEvent.click(downloadBtn);
      const statusPill = screen.getByRole("status");
      expect(statusPill).toHaveTextContent("Resume not available right now.");
    });
  });

  describe("AboutTimeline (Empty states & Ongoing entries)", () => {
    it("returns null and hides entire section when both aboutMe and timeline are empty (FR-007, SC-003)", () => {
      const { container } = render(<AboutTimeline aboutMe={[]} timeline={[]} />);
      expect(container.firstChild).toBeNull();
    });

    it("renders 'Ongoing' for timeline entries with null endDate (FR-006)", () => {
      const sampleTimeline: TimelineEntry[] = [
        {
          id: "tl-1",
          type: "work",
          title: "Lead Engineer",
          place: "Tech Corp",
          startDate: "2023",
          endDate: null,
          description: "Working on distributed systems",
          order: 1,
        },
      ];

      render(<AboutTimeline aboutMe={["A short bio."]} timeline={sampleTimeline} />);
      expect(screen.getByText(/2023 — ongoing/i)).toBeInTheDocument();
      expect(screen.getByText("Lead Engineer")).toBeInTheDocument();
    });

    it("renders only timeline when aboutMe is empty", () => {
      const sampleTimeline: TimelineEntry[] = [
        {
          id: "tl-1",
          type: "achievement",
          title: "Hackathon Winner",
          place: "Global Hackathon",
          startDate: "2024",
          endDate: "2024",
          description: "First place",
          order: 1,
        },
      ];

      render(<AboutTimeline aboutMe={[]} timeline={sampleTimeline} />);
      expect(screen.getByText("Hackathon Winner")).toBeInTheDocument();
      expect(screen.queryByText("A short bio.")).not.toBeInTheDocument();
    });
  });

  describe("ProjectsBrowser & CategoryTabs", () => {
    const sampleIntro: ProjectsIntro = {
      headline: "All Projects",
      explanation: "Browse my work",
      categoryOrder: ["Software", "Game Dev"],
    };

    const singleCategory: CategoryWithProjects[] = [
      {
        category: "Software",
        bestProject: {
          slug: "sentinel",
          title: "Sentinel",
          shortDescription: "Observability tool",
          category: "Software",
          images: [],
          links: [],
          downloads: [],
        },
        projects: [
          {
            slug: "sentinel",
            title: "Sentinel",
            shortDescription: "Observability tool",
            category: "Software",
            images: [],
            links: [],
            downloads: [],
          },
        ],
      },
    ];

    it("hides CategoryTabs completely when only 1 category exists (FR-011)", () => {
      render(<ProjectsBrowser intro={sampleIntro} categories={singleCategory} />);
      expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
      expect(screen.getAllByText("Sentinel").length).toBeGreaterThan(0);
    });

    it("renders CategoryTabs when multiple categories exist and switches active category (FR-011, FR-012)", () => {
      const multiCategories: CategoryWithProjects[] = [
        ...singleCategory,
        {
          category: "Game Dev",
          bestProject: {
            slug: "neon-drift",
            title: "Neon Drift",
            shortDescription: "Shader game",
            category: "Game Dev",
            images: [],
            links: [],
            downloads: [],
          },
          projects: [
            {
              slug: "neon-drift",
              title: "Neon Drift",
              shortDescription: "Shader game",
              category: "Game Dev",
              images: [],
              links: [],
              downloads: [],
            },
          ],
        },
      ];

      render(<ProjectsBrowser intro={sampleIntro} categories={multiCategories} />);
      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();

      const gameDevTab = screen.getByRole("tab", { name: /game dev/i });
      fireEvent.click(gameDevTab);

      expect(gameDevTab).toHaveAttribute("aria-selected", "true");
    });

    it("renders empty state 'Projects coming soon' when categories array is empty (FR-011)", () => {
      render(<ProjectsBrowser intro={sampleIntro} categories={[]} />);
      expect(screen.getByText(/projects coming soon/i)).toBeInTheDocument();
    });
  });

  describe("ContactForm (Input preservation on failure & Clear on success)", () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });

    it("clears name, email, and message inputs upon 200 OK success (FR-023, SC-005)", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          ok: true,
          message: "Message sent! Thank you for reaching out—I'll get back to you soon.",
        }),
      } as Response);

      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/^name/i);
      const emailInput = screen.getByLabelText(/^email/i);
      const messageInput = screen.getByLabelText(/^message/i);
      const submitBtn = screen.getByRole("button", { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: "Jane Client" } });
      fireEvent.change(emailInput, { target: { value: "jane@client.com" } });
      fireEvent.change(messageInput, { target: { value: "We want to hire you." } });

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByRole("status")).toHaveTextContent(/message sent!/i);
      });

      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(messageInput).toHaveValue("");
    });

    it("preserves typed name, email, and message when server returns 500 error (FR-023, SC-003, SC-005)", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({
          ok: false,
          message:
            "We couldn't send your message right now. Your text has been kept—please try again in a moment.",
        }),
      } as Response);

      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/^name/i);
      const emailInput = screen.getByLabelText(/^email/i);
      const messageInput = screen.getByLabelText(/^message/i);
      const submitBtn = screen.getByRole("button", { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: "Jane Client" } });
      fireEvent.change(emailInput, { target: { value: "jane@client.com" } });
      fireEvent.change(messageInput, {
        target: { value: "Important request that should not be lost." },
      });

      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          /we couldn't send your message right now/i
        );
      });

      // Inputs MUST remain intact
      expect(nameInput).toHaveValue("Jane Client");
      expect(emailInput).toHaveValue("jane@client.com");
      expect(messageInput).toHaveValue(
        "Important request that should not be lost."
      );
    });
  });
});
