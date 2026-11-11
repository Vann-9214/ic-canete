import React from "react";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { CategoryBadge } from "@/components/ui/category-badge";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface ProjectCardProps {
  project: Project;
  fromCategory?: string;
  className?: string;
}

export function ProjectCard({
  project,
  fromCategory,
  className = "",
}: ProjectCardProps) {
  const href = `/projects/${project.slug}${
    fromCategory ? `?from=${encodeURIComponent(fromCategory)}` : ""
  }`;

  const mainImage = project.images && project.images.length > 0 ? project.images[0] : undefined;

  return (
    <Link
      href={href}
      className={`group flex flex-col h-full bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-card hover:border-border-strong hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${className}`}
    >
      <div className="aspect-video w-full bg-muted relative overflow-hidden border-b border-border-subtle">
        <ImageWithFallback
          src={mainImage?.src}
          alt={mainImage?.alt || project.title || "Project preview"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-1 gap-3">
        <div>
          <CategoryBadge category={project.category || "Project"} />
        </div>
        <h3 className="font-sans text-lg md:text-xl font-semibold text-balance text-text-primary group-hover:text-accent-primary transition-colors">
          {project.title || "Untitled Project"}
        </h3>
        <p className="font-sans text-sm leading-normal text-pretty text-text-secondary line-clamp-3 mt-auto">
          {project.shortDescription || ""}
        </p>
      </div>
    </Link>
  );
}
