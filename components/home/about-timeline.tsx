import React from "react";
import type { TimelineEntry } from "@/lib/types";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TimelineBadge } from "@/components/ui/timeline-badge";

interface AboutTimelineProps {
  aboutMe: string[];
  timeline: TimelineEntry[];
}

export function AboutTimeline({ aboutMe, timeline }: AboutTimelineProps) {
  const hasAbout = aboutMe.length > 0;
  const hasTimeline = timeline.length > 0;

  // If both are empty, section is completely hidden (FR-007)
  if (!hasAbout && !hasTimeline) {
    return null;
  }

  const renderTimelineRail = () => (
    <div className="border-l-2 border-border-subtle pl-6 space-y-8 relative">
      {timeline.map((entry) => {
        const displayEndDate =
          entry.endDate && entry.endDate.trim().length > 0
            ? entry.endDate
            : "Ongoing";

        return (
          <div key={entry.id} className="relative group">
            {/* Timeline Rail Bullet Node */}
            <div
              className="w-3 h-3 rounded-full bg-surface border-2 border-accent-primary absolute -left-[31px] top-1.5 transition-transform group-hover:scale-125"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <TimelineBadge type={entry.type} />
              <span className="font-mono text-xs text-text-muted tabular-nums">
                {entry.startDate} — {displayEndDate}
              </span>
            </div>
            <h3 className="font-sans text-lg font-semibold text-text-primary text-balance">
              {entry.title}
            </h3>
            <p className="font-sans text-sm font-medium text-text-secondary">
              {entry.place}
            </p>
            {entry.description && (
              <p className="font-sans text-sm leading-normal text-pretty text-text-secondary mt-1.5">
                {entry.description}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderAboutNarrative = (className = "") => (
    <div className={`space-y-4 max-w-[68ch] ${className}`}>
      {aboutMe.map((paragraph, idx) => (
        <p
          key={idx}
          className="font-sans text-base leading-relaxed text-pretty text-text-secondary"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );

  return (
    <SectionWrapper id="about" index="01" title="About Me & Journey">
      {hasAbout && hasTimeline && (
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-5">{renderAboutNarrative()}</div>
          <div className="lg:col-span-7">{renderTimelineRail()}</div>
        </div>
      )}

      {hasAbout && !hasTimeline && <div>{renderAboutNarrative()}</div>}

      {!hasAbout && hasTimeline && (
        <div className="max-w-3xl">{renderTimelineRail()}</div>
      )}
    </SectionWrapper>
  );
}
