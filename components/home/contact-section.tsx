import React from "react";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ContactForm } from "@/components/home/contact-form";

export function ContactSection() {
  return (
    <SectionWrapper id="contact" index="04" title="Contact Me">
      <div className="rounded-2xl bg-surface border border-border-subtle p-6 md:p-8 shadow-card">
        <p className="text-text-secondary text-sm md:text-base mb-6 max-w-[68ch]">
          Have a role, project, or question? Send me a direct message.
        </p>
        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
