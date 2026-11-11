# ICCañete Constitution

## Core Principles

### I. Fixed Stack & Repo-Driven Content
The application MUST be built exclusively with Next.js (pages and API routes), Resend (for contact
form email delivery to Gmail with visitor `reply-to`), and repository-committed JSON/MDX files for
all site content. No database, external CMS, user accounts, login flows, or admin pages MAY be
introduced. Contact messages and theme states MUST NOT be persisted.

**Rationale**: Keeps infrastructure zero-maintenance and ensures all portfolio data is
version-controlled alongside the code.

### II. Content-Styling Separation via Design Tokens
Portfolio content in JSON/MDX files MUST remain strictly decoupled from presentation and layout
components so the interface can be restyled without rewriting content. All UI styling MUST use
semantic design tokens and theme variables rather than hardcoded visual values or competing styling
systems.

**Rationale**: Allows visual refreshes and layout evolution over time without touching structured
career, timeline, or project data.

### III. System Theme Only
The site MUST automatically follow the visitor's operating system or browser color scheme
(`prefers-color-scheme`) and update live when the system setting changes. When no system preference
is reported, the site MUST default to the light theme. Manual theme toggles or stored theme
preferences MUST NOT be added.

**Rationale**: Respects native device preferences out of the box while avoiding unnecessary UI
controls and client storage state.

### IV. Accessibility & Reduced Motion
All pages, components, and interactive flows MUST conform to WCAG 2.1 AA standards, including
text contrast across both light and dark system themes, keyboard operability, and semantic HTML.
Animations MUST respect `prefers-reduced-motion` by reducing or disabling motion when enabled, and
slow connections or animation failures MUST NEVER block content visibility.

**Rationale**: Guarantees that recruiters, clients, and academic reviewers can scan and use the
portfolio reliably across all devices and assistive technologies.

### V. Solo-Build Simplicity
Implementations MUST favor the simplest direct solution (YAGNI) suited to a solo-maintained
codebase. Missing optional data (such as an unavailable resume PDF, missing project images, empty
categories, or failed icons) MUST degrade gracefully in place without over-engineered abstractions
or extra runtime services.

**Rationale**: Minimizes maintenance burden, build complexity, and operational risk for a solo
developer.

## Architecture & Data Constraints

- **Site Structure**: The portfolio MUST stay scoped to the `Home` page (`Hero`, `About Me` with
  unified timeline, `Featured Projects`, `Tech Stack`, `Contact Me`), the `All Projects` page
  (`Projects Hero`, `Category Tabs`, `Project Cards`), `Project Detail` pages (with a 404 fallback
  linking back to `All Projects`), and a responsive site-wide `Navigation Bar`.
- **Contact Form Flow**: The contact form MUST validate required fields (`name`, `email`,
  `message`), email format, message length limits, duplicate submissions, and spam before invoking
  the Next.js API route and Resend. Failed requests MUST report an error without losing the
  visitor's typed input; successful requests MUST confirm delivery and clear the form.

## Development Workflow & Quality Gates

- **Single Source of Truth**: Specifications and plans under `specs/` and architecture documentation
  in `docs/system-architecture.md` govern feature behavior. Any conflict between specifications and
  implementation MUST be surfaced before coding.
- **Verification**: Changes MUST pass project build and lint checks (`npm run build`,
  `npm run lint`) and verify light/dark system themes, `prefers-reduced-motion` behavior, and
  graceful empty/error states.

## Governance

This constitution supersedes conflicting practices in the repository. Amendments require updating
`.specify/memory/constitution.md`, recording the change in the Sync Impact Report, and bumping the
semantic version:
- **MAJOR**: Backward-incompatible principle removals, stack changes, or governance redefinitions.
- **MINOR**: New principles or sections, or materially expanded governance requirements.
- **PATCH**: Clarifications, wording refinements, or formatting fixes.

All specifications, implementation plans, tasks, and code changes MUST verify compliance with this
constitution.

**Version**: 1.0.0 | **Ratified**: 2026-11-11 | **Last Amended**: 2026-11-11
