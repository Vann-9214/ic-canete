# Implementation Plan: ICCañete Personal Portfolio Website

**Branch**: `001-portfolio-website` | **Date**: 2026-11-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-portfolio-website/spec.md` and visual direction from `/specs/design/research.md`

---

## Summary

Build the **ICCañete (I See Cañete)** personal portfolio website on the existing Next.js 16 (App Router, root `app/` directory), React 19, TypeScript 5, and Tailwind CSS v4 scaffold. All portfolio content (profile, unified timeline, featured/category projects across Software, Game Dev, and Hardware, All Projects intro, and tech stack) is stored in repository JSON and MDX files under `content/` and validated with `zod`. Styling follows **Direction 1 — Precision Engineering Studio** from [specs/design/research.md](../design/research.md) and [specs/design/DESIGN.md](../design/DESIGN.md), implemented through semantic CSS custom properties in `app/globals.css` that automatically follow the visitor's system theme (`prefers-color-scheme`, defaulting to light) and respect `prefers-reduced-motion`. A Next.js Route Handler (`POST /api/contact`) validates and forwards contact messages to Gmail via Resend with the visitor's email set as `replyTo`.

---

## Technical Context

**Language/Version**: TypeScript 5 (`strict: true`), Node.js 20+, React 19.3.0, Next.js 16.4.6 (App Router, root `app/` directory without `src/`)
**Primary Dependencies**:
- Installed: `next@16.4.6`, `react@19.3.0`, `react-dom@19.3.0`, `tailwindcss@4.3.3`, `@tailwindcss/turbopack@4.3.3`
- To Add (Runtime):
  - `resend` — sends Contact Me emails to Gmail with visitor `replyTo`
  - `zod` — runtime schema validation for JSON/MDX content files and contact form payloads
  - `gray-matter` — parses YAML frontmatter from `content/projects/*.mdx`
  - `next-mdx-remote` — renders project MDX body (`fullDetails`) in React Server Components (`next-mdx-remote/rsc`)
  - `lucide-react` — crisp, consistent `1.5px` stroke vector icons
- To Add (Dev/Test):
  - `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` — unit and component tests for content loaders, edge-case fallbacks, and contact form API/UI
**Storage**: Repository-committed JSON and MDX files in `content/` + static files in `public/` (no database, no external CMS, no persisted user/theme/message state)
**Testing**: `vitest` + `@testing-library/react` (`npm run test`), plus `npm run lint` and `npm run build`
**Target Platform**: Modern desktop and mobile web browsers (320px–2560px+), static/hybrid deployment (Vercel / Node.js)
**Project Type**: Next.js 16 Web Application (App Router)
**Performance Goals**: Instant text rendering on first byte (SSR/SSG), `<100ms` client-side category switching on `/projects`, zero layout shift (`CLS = 0`), Lighthouse Performance & Accessibility `>= 95`
**Constraints**: System theme only (`prefers-color-scheme`, light fallback, no toggle), WCAG 2.1 AA contrast (`>= 4.5:1` normal text, `>= 3:1` large text/UI), `prefers-reduced-motion` respected, solo-build simplicity (YAGNI)
**Scale/Scope**: 3 primary routes (`/`, `/projects`, `/projects/[slug]`), 1 custom 404 boundary (`app/projects/[slug]/not-found.tsx` + `app/not-found.tsx`), 1 API route (`POST /api/contact`), and ~15 focused UI components

---

## Constitution Check

*GATE: Evaluated before Phase 0 research and re-verified after Phase 1 design against [.specify/memory/constitution.md](../../.specify/memory/constitution.md).*

| Constitution Principle | Status | Verification Evidence |
| :--- | :--- | :--- |
| **I. Fixed Stack & Repo-Driven Content** | **PASS** | Uses Next.js 16 (`app/`), Resend (`app/api/contact/route.ts`), and repo JSON/MDX (`content/`). No database, CMS, login, or persisted state. |
| **II. Content-Styling Separation via Design Tokens** | **PASS** | `content/` holds pure data/MDX; `app/globals.css` defines Primitive → Semantic → Component CSS tokens mapped via Tailwind v4 `@theme inline`. |
| **III. System Theme Only** | **PASS** | `:root` defines Light Mode default tokens; `@media (prefers-color-scheme: dark)` overrides semantic tokens live. No manual theme toggle or `localStorage` theme state exists. |
| **IV. Accessibility & Reduced Motion** | **PASS** | All token pairs in [specs/design/DESIGN.md](../design/DESIGN.md) meet or exceed WCAG 2.1 AA (`>= 4.5:1`), interactive hit targets are `>= 44x44px` on mobile, and `@media (prefers-reduced-motion: reduce)` disables transforms/animations. |
| **V. Solo-Build Simplicity** | **PASS** | Flat root-level modular folder structure, only 5 small runtime packages added, and deterministic server-side content helpers with in-place fallbacks for every edge case. |

---

## Project Structure

### Documentation (this feature)

```text
specs/
├── 001-portfolio-website/
│   ├── spec.md                  # Feature specification (US1–US4, FR-001–FR-024, 31 edge cases)
│   ├── plan.md                  # This technical implementation plan
│   ├── research.md              # Phase 0 architectural & package decisions
│   ├── data-model.md            # Phase 1 entity schemas & sample JSON/MDX data
│   ├── quickstart.md            # Phase 1 runnable setup & verification guide
│   ├── contracts/
│   │   ├── contact-api.md       # POST /api/contact request/response & Resend contract
│   │   └── content-loader.md    # Server content loader API & fallback guarantees
│   └── checklists/
│       └── requirements.md      # Spec quality checklist
└── design/
    ├── research.md              # Portfolio UX research & 3 visual directions (Direction 1 chosen)
    └── DESIGN.md                # Complete design tokens, breakpoints, wireframes, component states, motion spec
```

### Source Code (repository root — no `src/` directory)

```text
app/
├── globals.css                  # Three-layer CSS tokens, @theme inline, system dark mode, reduced-motion rules
├── layout.tsx                   # Root layout: Geist & Geist Mono fonts, site-wide metadata, Navbar, Footer
├── page.tsx                     # Home page (/): Hero, About & Timeline, Featured Projects, Tech Stack, Contact Me
├── not-found.tsx                # Global 404 fallback page
├── opengraph-image.tsx          # Generated 1200x630 OpenGraph preview image route
├── robots.ts                    # Generated robots.txt metadata route
├── sitemap.ts                   # Generated sitemap.xml metadata route from all project slugs
├── projects/
│   ├── page.tsx                 # All Projects page (/projects): Projects Hero, Category Tabs, Project Cards grid
│   └── [slug]/
│       ├── page.tsx             # Project Detail page (/projects/[slug]): full details, gallery, links, downloads
│       └── not-found.tsx        # Project-specific 404 page with link back to /projects (FR-017)
└── api/
    └── contact/
        └── route.ts             # POST /api/contact: Zod validation, honeypot/rate-limit check, Resend delivery

components/
├── layout/
│   ├── navbar.tsx               # Persistent responsive Navigation Bar (desktop links + mobile drawer)
│   └── footer.tsx               # Minimal site footer with social links & copyright
├── home/
│   ├── hero-section.tsx         # Name, role, tagline, social icon buttons, Download CV + missing-PDF fallback
│   ├── about-timeline.tsx       # About Me narrative + unified timeline with 5 semantic entry badges
│   ├── featured-projects.tsx    # Featured project cards + "See all projects" CTA + empty-featured fallback
│   ├── tech-stack-section.tsx   # Tech stack grid with per-icon onError fallback to text-only
│   ├── contact-section.tsx      # Contact Me section container (Phase 0 mount shell -> Phase 1 Stream C full view)
│   └── contact-form.tsx         # Client contact form: inline validation, char counter, loading lock, retry state
├── projects/
│   ├── projects-browser.tsx     # Client wrapper syncing Category Tabs with Projects Hero & Project Cards grid
│   ├── projects-hero.tsx        # Page explanation + selected category's bestProject spotlight card
│   ├── category-tabs.tsx        # Accessible tablist for switching categories (hidden if <= 1 category)
│   ├── project-card.tsx         # Uniform-height card with category badge, 3-line clamp, image/placeholder fallback
│   └── project-gallery.tsx      # Readable multi-image gallery with per-image error fallback
└── ui/
    ├── section-wrapper.tsx      # Shared section container with scroll-mt-20 anchor offset and header
    ├── category-badge.tsx       # Semantic pill for Software, Game Dev, Hardware, or custom categories
    ├── timeline-badge.tsx       # Semantic pill + icon for work, school, career, certification, achievement
    ├── image-with-fallback.tsx  # Client image wrapper that renders a clean geometric placeholder on load error
    └── reveal.tsx               # Non-blocking scroll-into-view CSS reveal wrapper respecting reduced-motion

content/
├── profile.json                 # Owner identity, About Me paragraphs, social links, resume path
├── timeline.json                # Unified timeline entries (work, school, career, certification, achievement)
├── tech-stack.json              # Tools, languages, and technologies with icon paths
├── projects-intro.json          # All Projects page explanation & preferred category tab order
└── projects/                    # Individual project MDX files
    ├── sentinel-cloud-observability.mdx
    ├── neon-drift-shader-engine.mdx
    └── autonomous-rover-telemetry.mdx

lib/
├── types.ts                     # TypeScript interfaces for Profile, TimelineEntry, TechStackItem, Project, Contact
├── content.ts                   # Server-side content readers, Zod parsers, category grouping, resume check
├── rate-limit.ts                # Lightweight in-memory IP rate limiter for POST /api/contact
└── validations/
    ├── content.ts               # Zod schemas with graceful fallback defaults for JSON/MDX content
    └── contact.ts               # Shared Zod schema for Contact Me client form and API route

public/
├── resume.pdf                   # Downloadable CV PDF
├── icons/
│   └── tech/                    # SVG icons for tech stack items
├── images/
│   └── projects/                # Project screenshots, gameplay captures, and hardware photos
└── downloads/                   # Optional downloadable project artifacts (PDFs, builds, schematics)

tests/
├── setup.ts                     # Vitest + Testing Library setup
├── content.test.ts              # Unit tests for content loaders and all missing/empty data edge cases
├── contact-api.test.ts          # Unit/integration tests for POST /api/contact validation, spam, and Resend errors
└── components.test.tsx          # Component tests for Hero CV fallback, Timeline ongoing dates, Category Tabs, Contact Form

vitest.config.ts                 # Vitest runner configuration with @/* path alias and jsdom environment
```

**Structure Decision**: Uses the existing root-level Next.js 16 App Router convention (`app/` at repository root, `@/*` path alias mapped to `./*` in `tsconfig.json`) with clean top-level `components/`, `content/`, `lib/`, `public/`, and `tests/` directories.

---

## Technical Design Details

### 1. Packages to Add

| Package | Type | Version Target | Purpose |
| :--- | :--- | :--- | :--- |
| `resend` | `dependencies` | `^4.1.0` | Sends contact form emails via Resend API (`FR-022`). |
| `zod` | `dependencies` | `^3.24.0` | Validates content files (`content/*`) and contact payloads (`FR-021`). |
| `gray-matter` | `dependencies` | `^4.0.3` | Extracts frontmatter metadata from `content/projects/*.mdx` (`FR-024`). |
| `next-mdx-remote` | `dependencies` | `^5.0.0` | Compiles and renders MDX project details in Server Components (`FR-015`). |
| `lucide-react` | `dependencies` | `^1.16.0` (or `^0.475.0`) | Crisp `1.5px` stroke icons for navigation, social links, timeline badges, and external links. |
| `vitest`, `@vitejs/plugin-react`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom` | `devDependencies` | Latest compatible | Runs automated tests for content schemas, edge cases, and API route handlers. |

### 2. Content Schemas & Sample Data Summary

Full field-level schemas and sample files are specified in [data-model.md](./data-model.md) and [contracts/content-loader.md](./contracts/content-loader.md):
- **`content/profile.json`**: `name`, `handle`, `role`, `tagline`, `aboutMe: string[]`, `resumeUrl`, `socials: { platform, label, url }[]`. Server loader computes `hasResumeFile` by verifying `public/resume.pdf` exists on disk.
- **`content/timeline.json`**: Array of `{ id, type: "work" | "school" | "career" | "certification" | "achievement", title, place, startDate, endDate: string | null, description, order }`. Missing/null `endDate` renders as `"Ongoing"`.
- **`content/tech-stack.json`**: Array of `{ name, icon, category }`. Empty array hides the Tech Stack section; broken icon image falls back to rendering `name` only.
- **`content/projects-intro.json`**: `{ headline, explanation, categoryOrder }`. Empty `explanation` hides the intro paragraph while keeping the category's best project card visible.
- **`content/projects/<slug>.mdx`**: YAML frontmatter (`title`, `shortDescription`, `category`, `isFeatured`, `isBestInCategory`, `order`, `images`, `links`, `downloads`) + Markdown/MDX body (`fullDetails`). Sample projects are seeded across `"Software"`, `"Game Dev"`, and `"Hardware"`.

### 3. Contact API Route (`app/api/contact/route.ts`)

Full request/response contract is defined in [contracts/contact-api.md](./contracts/contact-api.md):
1. Parse JSON body and validate against `contactSchema` (`name`: 1–100 chars, `email`: valid email, `message`: 1–2,000 chars, `website`: honeypot must be empty).
2. Check per-IP rate limit (`lib/rate-limit.ts`: max 3 requests per 10 minutes per IP).
3. Verify `process.env.RESEND_API_KEY` and `process.env.CONTACT_RECIPIENT_EMAIL` exist; if missing, log diagnostic error via `console.error` and return `500` with the standard safe user-facing retry message (`FR-023`).
4. Dispatch email through `new Resend(process.env.RESEND_API_KEY).emails.send({ from, to, replyTo: email, subject, text })`.
5. Return `{ ok: true, message }` (`200`) on success or `{ ok: false, message }` (`500`) if Resend returns an error or throws, ensuring no message is ever lost silently and client input remains intact on failure.

### 4. SEO & Metadata Strategy

- **Root Metadata (`app/layout.tsx`)**:
  - Uses Next.js 16 `Metadata` API with `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")`.
  - Title template: `{ default: "Ivan Cañete (ICCañete) — Software, Game Dev & Hardware Portfolio", template: "%s | ICCañete" }`.
  - OpenGraph (`type: "website"`, `siteName: "ICCañete"`, title, description) and Twitter (`card: "summary_large_image"`) metadata derived from `getProfile()`.
- **All Projects Page (`app/projects/page.tsx`)**:
  - Static `metadata` export with title `"All Projects"` and description from `getProjectsIntro().explanation`.
- **Project Detail Page (`app/projects/[slug]/page.tsx`)**:
  - Implements `generateStaticParams()` from `getAllProjects()` so every project page is statically prerendered at build time.
  - Implements `generateMetadata({ params })` (awaiting `params: Promise<{ slug: string }>` per Next.js 16 conventions) to set page `title: project.title`, `description: project.shortDescription`, and OpenGraph image from `project.images[0]?.src`.
- **Crawler Discovery (`app/sitemap.ts` & `app/robots.ts`)**:
  - `app/sitemap.ts` automatically lists `/`, `/projects`, and every `/projects/[slug]` route.
  - `app/robots.ts` allows indexing of all public routes and points to `/sitemap.xml`.

---

## Complexity Tracking

> No Constitution violations exist. All five core principles pass without exception.
