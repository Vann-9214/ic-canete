import React from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function ContactSection() {
  return (
    <SectionWrapper id="contact" index="04" title="Contact Me">
      <div className="rounded-2xl bg-surface border border-border-subtle p-6 md:p-8 shadow-card">
        <p className="text-text-secondary text-sm md:text-base">
          Have a role, project, or question? Send me a direct message.
        </p>
        <div className="mt-6 flex flex-col gap-4 text-text-muted text-sm font-mono">
          {/* Contact form shell mount point (to be integrated in Phase 1 Stream C) */}
          <div className="h-44 flex items-center justify-center border border-dashed border-border-subtle rounded-[10px]">
            <span>Contact Form Initializing...</span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
