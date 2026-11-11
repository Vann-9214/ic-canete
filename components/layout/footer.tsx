import React from "react";
import { getProfile } from "@/lib/content";

export function Footer() {
  const profile = getProfile();

  return (
    <footer className="border-t border-border-subtle py-8 mt-20">
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
        <div>
          © 2026 {profile.name} ({profile.handle})
        </div>
        {profile.socials && profile.socials.length > 0 && (
          <div className="flex items-center gap-4">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
