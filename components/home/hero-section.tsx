"use client";

import React, { useState } from "react";
import { Download, ExternalLink, Mail } from "lucide-react";
import type { ProfileData, SocialLink } from "@/lib/types";

interface HeroSectionProps {
  profile: ProfileData;
}

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();
  if (p === "github") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-5 h-5 flex-shrink-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }

  if (p === "linkedin") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-5 h-5 flex-shrink-0"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.4 9.74v-8.37H5.06v8.37h2.8z" />
      </svg>
    );
  }

  if (p === "email") {
    return <Mail size={20} aria-hidden="true" className="w-5 h-5 flex-shrink-0" />;
  }

  return <ExternalLink size={20} aria-hidden="true" className="w-5 h-5 flex-shrink-0" />;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [showUnavailable, setShowUnavailable] = useState(false);

  // Filter out any social link with an empty url (FR-003)
  const validSocials: SocialLink[] = (profile.socials ?? []).filter(
    (s) => typeof s.url === "string" && s.url.trim().length > 0
  );

  return (
    <section id="hero" className="scroll-mt-20 py-14 md:py-24">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-start gap-4">
          {/* Monospace Eyebrow Pill */}
          {profile.handle && (
            <span className="inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-medium tabular-nums bg-muted text-text-secondary border border-border-subtle">
              {profile.handle}
            </span>
          )}

          {/* Display Hero Title */}
          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-balance text-text-primary uppercase">
            {profile.name}
          </h1>

          {/* Role Subtitle */}
          {profile.role && (
            <p className="font-sans text-lg md:text-xl font-medium text-text-secondary text-balance">
              {profile.role}
            </p>
          )}

          {/* Tagline */}
          {profile.tagline && (
            <p className="max-w-[62ch] font-sans text-base md:text-lg leading-relaxed text-pretty text-text-secondary">
              {profile.tagline}
            </p>
          )}

          {/* Action Row */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {/* Social Buttons (min 44x44px for WCAG 2.1 AA) */}
            {validSocials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="min-h-11 min-w-11 px-3 rounded-[10px] bg-surface text-text-secondary border border-border-subtle hover:text-text-primary hover:border-border-strong hover:bg-surface-hover active:scale-[0.96] transition-all duration-150 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}

            {/* Download CV Action */}
            {profile.hasResumeFile && profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                download
                className="min-h-11 px-5 rounded-[10px] bg-accent-primary text-accent-on-primary hover:bg-accent-primary-hover active:scale-[0.96] font-medium inline-flex items-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring text-sm md:text-base"
              >
                <Download size={18} aria-hidden="true" />
                <span>Download CV</span>
              </a>
            ) : (
              <div className="inline-flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowUnavailable((prev) => !prev)}
                  className="min-h-11 px-5 rounded-[10px] bg-accent-primary text-accent-on-primary hover:bg-accent-primary-hover active:scale-[0.96] font-medium inline-flex items-center gap-2 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring text-sm md:text-base"
                >
                  <Download size={18} aria-hidden="true" />
                  <span>Download CV</span>
                </button>
                {showUnavailable && (
                  <span
                    role="status"
                    aria-live="polite"
                    className="bg-status-error-bg text-status-error-text border border-border-subtle px-3 py-1.5 rounded-lg text-sm inline-flex items-center"
                  >
                    Resume not available right now.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
