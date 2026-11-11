"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function ProjectBackLink() {
  const searchParams = useSearchParams();
  const fromCategory = searchParams.get("from")?.trim();

  const backHref = fromCategory
    ? `/projects?category=${encodeURIComponent(fromCategory)}`
    : "/projects";
  const backLabel = fromCategory
    ? `Back to ${fromCategory} Projects`
    : "Back to Projects";

  return (
    <Link
      href={backHref}
      className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded p-1"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      <span>{backLabel}</span>
    </Link>
  );
}
