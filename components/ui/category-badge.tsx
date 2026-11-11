import React from "react";

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  Software: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
  "Game Dev": "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-900",
  Hardware: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
};

const DEFAULT_STYLE =
  "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700";

export function CategoryBadge({ category, className = "" }: CategoryBadgeProps) {
  const style = CATEGORY_STYLES[category] ?? DEFAULT_STYLE;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-mono font-medium border ${style} ${className}`}
    >
      {category}
    </span>
  );
}
