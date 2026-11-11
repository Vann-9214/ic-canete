"use client";

import React, { useState } from "react";
import type { TechStackItem } from "@/lib/types";
import { SectionWrapper } from "@/components/ui/section-wrapper";

interface TechStackSectionProps {
  items: TechStackItem[];
}

function TechItemTile({ item }: { item: TechStackItem }) {
  const [hasError, setHasError] = useState(false);

  const showIcon = item.icon && item.icon.trim().length > 0 && !hasError;

  return (
    <div className="bg-surface border border-border-subtle rounded-xl p-4 flex items-center gap-3 shadow-sm hover:border-border-strong hover:bg-surface-hover transition-colors">
      {showIcon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.icon}
          alt=""
          aria-hidden="true"
          width={24}
          height={24}
          onError={() => setHasError(true)}
          className="w-6 h-6 object-contain flex-shrink-0"
        />
      )}
      <span className="text-sm font-medium text-text-primary truncate">
        {item.name}
      </span>
    </div>
  );
}

export function TechStackSection({ items }: TechStackSectionProps) {
  // If items is empty, section is completely hidden (FR-009)
  if (items.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="tech-stack" index="03" title="Tech Stack">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <TechItemTile key={`${item.name}-${idx}`} item={item} />
        ))}
      </div>
    </SectionWrapper>
  );
}
