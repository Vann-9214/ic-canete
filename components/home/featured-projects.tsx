import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/ui/reveal";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const hasProjects = projects.length > 0;

  const headerAction = hasProjects ? (
    <Link
      href="/projects"
      className="inline-flex items-center gap-1.5 text-sm font-mono font-medium text-accent-primary hover:text-accent-primary-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
    >
      <span>See all projects</span>
      <ArrowRight size={16} aria-hidden="true" />
    </Link>
  ) : undefined;

  return (
    <SectionWrapper
      id="projects"
      index="02"
      title="Featured Projects"
      action={headerAction}
    >
      {hasProjects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <Reveal key={project.slug} delayMs={Math.min(idx * 80, 240)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-surface border border-border-subtle p-8 md:p-12 text-center flex flex-col items-center justify-center gap-4 shadow-card">
          <p className="font-sans text-sm md:text-base text-text-secondary max-w-md">
            Explore all engineering builds, interactive games, and hardware systems in the project archive.
          </p>
          <Link
            href="/projects"
            className="min-h-11 px-5 rounded-[10px] bg-accent-primary text-accent-on-primary hover:bg-accent-primary-hover active:scale-[0.96] font-medium inline-flex items-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring text-sm md:text-base"
          >
            <span>See all projects</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
    </SectionWrapper>
  );
}
