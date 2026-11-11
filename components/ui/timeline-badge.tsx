import React from "react";
import { Briefcase, GraduationCap, Compass, Award, Trophy } from "lucide-react";
import type { TimelineEntry } from "@/lib/types";

interface TimelineBadgeProps {
  type: TimelineEntry["type"];
  className?: string;
}

const BADGE_CONFIG: Record<
  TimelineEntry["type"],
  {
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number; "aria-hidden"?: boolean | "true" | "false" }>;
    style: string;
  }
> = {
  work: {
    label: "Work",
    icon: Briefcase,
    style: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-900",
  },
  school: {
    label: "School",
    icon: GraduationCap,
    style: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  },
  career: {
    label: "Career",
    icon: Compass,
    style: "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-900",
  },
  certification: {
    label: "Certification",
    icon: Award,
    style: "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-300 dark:border-cyan-800",
  },
  achievement: {
    label: "Achievement",
    icon: Trophy,
    style: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
  },
};

export function TimelineBadge({ type, className = "" }: TimelineBadgeProps) {
  const config = BADGE_CONFIG[type] ?? BADGE_CONFIG.work;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-mono font-medium border ${config.style} ${className}`}
    >
      <Icon size={14} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  );
}
