"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { CategoryWithProjects, ProjectsIntro } from "@/lib/types";
import { ProjectsHero } from "./projects-hero";
import { CategoryTabs } from "./category-tabs";
import { ProjectCard } from "./project-card";

export interface ProjectsBrowserProps {
  intro: ProjectsIntro;
  categories: CategoryWithProjects[];
  initialCategory?: string;
  className?: string;
}

export function ProjectsBrowser({
  intro,
  categories,
  initialCategory,
  className = "",
}: ProjectsBrowserProps) {
  const searchParams = useSearchParams();
  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);

  const resolveCategory = useCallback(
    (catName?: string | null): string => {
      if (!catName || categories.length === 0) {
        return categories[0]?.category ?? "";
      }
      const match = categories.find(
        (c) => c.category.toLowerCase() === catName.trim().toLowerCase()
      );
      return match ? match.category : categories[0].category;
    },
    [categories]
  );

  // Clear manual tab override on browser history traversal (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setUserSelectedCategory(null);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const activeCategory = useMemo(() => {
    const param = searchParams?.get("category");
    return resolveCategory(userSelectedCategory || param || initialCategory);
  }, [userSelectedCategory, searchParams, initialCategory, resolveCategory]);

  const handleSelectCategory = (category: string) => {
    if (category === activeCategory) return;

    setIsSwitching(true);
    setUserSelectedCategory(category);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("category", category);
      window.history.replaceState({}, "", url.toString());
    }

    const timer = setTimeout(() => {
      setIsSwitching(false);
    }, 150);

    return () => clearTimeout(timer);
  };

  // Zero projects overall empty state
  if (categories.length === 0) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div>
          <h1 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-balance text-text-primary mb-3">
            {intro.headline || "All Projects"}
          </h1>
          {intro.explanation && (
            <p className="font-sans text-base md:text-lg leading-relaxed text-pretty text-text-secondary max-w-[68ch]">
              {intro.explanation}
            </p>
          )}
        </div>
        <div className="bg-surface border border-border-subtle rounded-2xl p-12 text-center shadow-card">
          <p className="font-sans text-lg font-medium text-text-primary mb-2">
            Projects coming soon
          </p>
          <p className="font-sans text-sm text-text-secondary max-w-md mx-auto">
            Check back later as new projects across Software, Game Dev, and Hardware are added.
          </p>
        </div>
      </div>
    );
  }

  const activeCategoryData =
    categories.find((c) => c.category === activeCategory) || categories[0];

  const tabItems = categories.map((c) => ({
    category: c.category,
    projectCount: c.projects.length,
  }));

  const slugSafeId = encodeURIComponent(
    activeCategoryData.category.toLowerCase().replace(/\s+/g, "-")
  );

  return (
    <div className={`space-y-10 ${className}`}>
      {/* Projects Hero Spotlight */}
      <div
        style={{
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
          transitionProperty: "opacity, transform",
        }}
        className={isSwitching ? "opacity-60 translate-y-1" : "opacity-100 translate-y-0"}
      >
        <ProjectsHero
          intro={intro}
          bestProject={activeCategoryData.bestProject}
          activeCategory={activeCategoryData.category}
        />
      </div>

      {/* Category Tabs (hidden if <= 1 category) */}
      <CategoryTabs
        categories={tabItems}
        selectedCategory={activeCategoryData.category}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3-Column Projects Grid */}
      <div
        id={`panel-${slugSafeId}`}
        role="tabpanel"
        aria-labelledby={`tab-${slugSafeId}`}
        style={{
          transitionDuration: "150ms",
          transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
          transitionProperty: "opacity, transform",
        }}
        className={isSwitching ? "opacity-40 translate-y-1" : "opacity-100 translate-y-0"}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategoryData.projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              fromCategory={activeCategoryData.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
