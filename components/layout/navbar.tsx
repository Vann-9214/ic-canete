"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const navLinks = [
    { label: "About", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Tech Stack", href: "/#tech-stack" },
    { label: "Contact", href: "/#contact" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="h-16 sticky top-0 z-40 bg-glass backdrop-blur-md border-b border-border-subtle">
      <div className="mx-auto max-w-[1120px] h-full px-4 sm:px-6 md:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-base font-semibold tracking-tight text-text-primary hover:text-accent-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
          onClick={closeMenu}
        >
          ICCañete
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/projects"
            className="text-sm font-mono font-medium px-3 py-1.5 rounded-[10px] bg-muted text-text-primary border border-border-subtle hover:border-border-strong hover:bg-surface-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            All Projects →
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden min-h-11 min-w-11 flex items-center justify-center rounded-[10px] text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-surface border-b border-border-subtle p-4 flex flex-col gap-2 transition-all duration-160 ease-out"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="px-3 py-2.5 rounded-[10px] text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/projects"
            onClick={closeMenu}
            className="mt-2 px-3 py-2.5 rounded-[10px] text-sm font-mono font-medium text-center bg-muted text-text-primary border border-border-subtle hover:border-border-strong hover:bg-surface-hover transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            All Projects →
          </Link>
        </div>
      )}
    </header>
  );
}
