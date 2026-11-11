import React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { Project, ProjectsIntro } from "@/lib/types";
import { CategoryBadge } from "@/components/ui/category-badge";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

export interface ProjectsHeroProps {
  intro: ProjectsIntro;
  bestProject?: Project;
  activeCategory: string;
  className?: string;
}

export function ProjectsHero({
  intro,
  bestProject,
  activeCategory,
  className = "",
}: ProjectsHeroProps) {
  const headline = intro.headline?.trim() || "All Projects";
  const hasExplanation =
    typeof intro.explanation === "string" && intro.explanation.trim().length > 0;

  const mainImage =
    bestProject?.images && bestProject.images.length > 0
      ? bestProject.images[0]
      : undefined;

  return (
    <div className={`space-y-8 ${className}`}>
      <div>
        <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-balance text-text-primary mb-3">
          {headline}
        </h1>
        {hasExplanation && (
          <p className="font-sans text-base md:text-lg leading-relaxed text-pretty text-text-secondary max-w-[68ch]">
            {intro.explanation}
          </p>
        )}
      </div>

      {bestProject && (
        <Link
          href={`/projects/${bestProject.slug}?from=${encodeURIComponent(activeCategory)}`}
          className="group block rounded-[20px] bg-surface border border-border-subtle p-3 md:p-4 shadow-card hover:border-border-strong hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted relative border border-border-subtle">
              <ImageWithFallback
                src={mainImage?.src}
                alt={mainImage?.alt || bestProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 md:p-4 flex flex-col justify-between h-full gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={bestProject.category || activeCategory} />
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium border bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900">
                    <Star size={12} className="fill-current" aria-hidden="true" />
                    Featured in Category
                  </span>
                </div>
                <h2 className="font-sans text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors text-balance">
                  {bestProject.title}
                </h2>
                <p className="font-sans text-sm md:text-base leading-relaxed text-text-secondary line-clamp-3 text-pretty">
                  {bestProject.shortDescription}
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 font-medium text-sm text-accent-primary group-hover:text-accent-primary-hover transition-colors font-sans pt-2">
                <span>Open Project Details</span>
                <ArrowRight
                  size={16}
                  aria-hidden="true"
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
