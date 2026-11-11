import React from "react";

export interface CategoryTabItem {
  category: string;
  projectCount: number;
}

export interface CategoryTabsProps {
  categories: CategoryTabItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  className?: string;
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  className = "",
}: CategoryTabsProps) {
  if (categories.length <= 1) {
    return null;
  }

  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className={`flex flex-wrap items-center gap-2 border-b border-border-subtle pb-4 ${className}`}
    >
      {categories.map((item) => {
        const isSelected = item.category === selectedCategory;
        const slugSafeId = encodeURIComponent(item.category.toLowerCase().replace(/\s+/g, "-"));

        return (
          <button
            key={item.category}
            role="tab"
            type="button"
            id={`tab-${slugSafeId}`}
            aria-selected={isSelected}
            aria-controls={`panel-${slugSafeId}`}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelectCategory(item.category)}
            className={`min-h-11 px-4 rounded-[10px] font-mono text-sm font-medium inline-flex items-center gap-2 cursor-pointer active:scale-[0.96] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring ${
              isSelected
                ? "bg-accent-primary text-accent-on-primary shadow-sm"
                : "bg-surface text-text-secondary border border-border-subtle hover:border-border-strong hover:text-text-primary"
            }`}
          >
            <span>{item.category}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isSelected
                  ? "bg-white/20 text-accent-on-primary"
                  : "bg-muted text-text-muted"
              }`}
            >
              {item.projectCount}
            </span>
          </button>
        );
      })}
    </div>
  );
}
