import React from "react";

interface SectionWrapperProps {
  id: string;
  index?: string;
  title?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  id,
  index,
  title,
  action,
  children,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
        {(index || title || action) && (
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              {index && (
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider block mb-1">
                  {index} /
                </span>
              )}
              {title && (
                <h2 className="font-sans text-2xl md:text-[28px] font-semibold tracking-tight text-balance text-text-primary">
                  {title}
                </h2>
              )}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
