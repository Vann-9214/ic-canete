import type { Metadata } from "next";
import { Suspense } from "react";
import { getProjectsIntro, getCategoriesWithProjects } from "@/lib/content";
import { ProjectsBrowser } from "@/components/projects/projects-browser";

export const metadata: Metadata = {
  title: "All Projects",
  description:
    getProjectsIntro().explanation ||
    "Browse my work across software engineering, game development, and hardware prototyping.",
};

export default function ProjectsPage() {
  const intro = getProjectsIntro();
  const categories = getCategoriesWithProjects();

  return (
    <main className="py-14 md:py-20 min-h-screen">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
        <Suspense
          fallback={
            <div className="space-y-8 animate-pulse">
              <div className="h-10 w-48 bg-muted rounded-lg" />
              <div className="h-6 w-96 bg-muted rounded-lg" />
              <div className="h-72 w-full bg-muted rounded-[20px]" />
            </div>
          }
        >
          <ProjectsBrowser intro={intro} categories={categories} />
        </Suspense>
      </div>
    </main>
  );
}
