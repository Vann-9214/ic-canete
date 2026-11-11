import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function GlobalNotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full mx-auto my-20 p-8 rounded-2xl bg-surface border border-border-subtle text-center shadow-card">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border bg-muted text-text-muted border-border-subtle mb-4">
          404 NOT FOUND
        </span>
        <h1 className="font-sans text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-2">
          Page could not be found
        </h1>
        <p className="font-sans text-sm md:text-base text-text-secondary mb-6 leading-relaxed">
          The page you are looking for does not exist or may have moved.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-accent-primary text-accent-on-primary font-medium text-sm hover:bg-accent-primary-hover active:scale-[0.96] transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to All Projects</span>
        </Link>
      </div>
    </main>
  );
}
