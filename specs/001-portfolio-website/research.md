# Phase 0 Technical Research: ICCañete Personal Portfolio Website

**Branch**: `001-portfolio-website` | **Date**: 2026-11-11 | **Spec**: [spec.md](./spec.md)
**Visual Research Reference**: [../design/research.md](../design/research.md)

---

## 1. Content Storage & Parsing Architecture (JSON + MDX)

- **Decision**: Store structured collection data in repository JSON files (`content/profile.json`, `content/timeline.json`, `content/tech-stack.json`, `content/projects-intro.json`) and individual project entries as MDX files (`content/projects/<slug>.mdx`) with YAML frontmatter parsed via `gray-matter` and rendered on the server via `next-mdx-remote/rsc` (or plain Markdown/JSX paragraphs via `next-mdx-remote/rsc`), validated at load time with `zod`.
- **Rationale**:
  - Profile, timeline entries, tech stack items, and the All Projects intro are flat, structured records that benefit from strict JSON schema validation and zero-overhead parsing.
  - Project detail pages (`fullDetails`) contain multi-paragraph technical case studies (problem statement, architecture, hardware/software breakdown, outcomes) that are much easier to author and maintain in `.mdx` files with structured frontmatter for `title`, `shortDescription`, `category`, `isFeatured`, `isBestInCategory`, `order`, `images`, `links`, and `downloads`.
  - Validating all JSON and MDX frontmatter with `zod` guarantees type safety and allows graceful fallback handling when optional fields are omitted or incomplete (`FR-008`, `FR-015`).
- **Alternatives Considered**:
  - *Single giant `projects.json` file*: Rejected because writing multi-paragraph project narratives inside escaped JSON strings is error-prone for a solo developer.
  - *Contentlayer*: Rejected because Contentlayer is unmaintained and incompatible with Next.js 16.
  - *Database / Headless CMS*: Strictly prohibited by Principle I of the [ICCañete Constitution](../../.specify/memory/constitution.md).

---

## 2. Styling & Design Token Integration in Tailwind CSS v4

- **Decision**: Define a three-layer CSS custom property system (Primitive → Semantic → Component tokens) in `app/globals.css`, expose semantic tokens to Tailwind v4 via `@theme inline`, and switch tokens automatically using `@media (prefers-color-scheme: dark)` with light mode as the `:root` default.
- **Rationale**:
  - Tailwind v4 uses CSS-first configuration (`@import "tailwindcss";` and `@theme inline`). Mapping `--color-canvas`, `--color-surface`, `--color-text-primary`, `--color-accent`, etc. in `@theme inline` lets components use clean semantic utilities (`bg-canvas`, `bg-surface`, `text-text-primary`, `border-border-subtle`) without a `tailwind.config.ts` file or `dark:` class duplication on every element.
  - Because `:root` defines the Light Mode tokens and `@media (prefers-color-scheme: dark)` overrides the semantic variables at `:root`, the browser automatically applies Light Mode when no preference is reported and live-updates when the OS theme changes (`FR-019`), with zero client-side JavaScript or flash of unstyled content.
- **Alternatives Considered**:
  - *`next-themes` class-based dark mode*: Rejected because the constitution forbids manual theme toggles and persisted theme state; pure CSS `@media (prefers-color-scheme: dark)` is simpler, zero-bundle-size, and immune to hydration mismatches.

---

## 3. Contact Form Delivery, Validation, and Spam Protection

- **Decision**: Implement a Next.js App Router Route Handler at `app/api/contact/route.ts` using the official `resend` SDK, shared `zod` schema validation (`lib/validations/contact.ts`), a hidden honeypot field (`website`) for bot rejection, and an in-memory per-IP rate limiter (`max 3 requests per 10 minutes`).
- **Rationale**:
  - Next.js 16 Route Handlers (`POST` in `app/api/contact/route.ts`) run exclusively on the server, keeping `RESEND_API_KEY` and `CONTACT_RECIPIENT_EMAIL` private.
  - Sharing the `zod` schema between the client form (`components/home/contact-form.tsx`) and the Route Handler guarantees identical rules for required fields (`name`, `email`, `message`), email format, and maximum message length (`2000` characters).
  - A hidden honeypot field (`website` input with `tabIndex={-1}`, `autoComplete="off"`, and `aria-hidden="true"`) plus basic rate-limiting satisfies `FR-022` (spam rejection) while respecting the guideline against third-party CAPTCHAs and keeping the UX frictionless for recruiters and clients.
- **Alternatives Considered**:
  - *Third-party form services (Formspree / EmailJS)*: Rejected because the constitution mandates a Next.js API route + Resend.

---

## 4. Category State Preservation Between All Projects and Project Detail Pages

- **Decision**: Synchronize the selected category on `/projects` with a URL search parameter (`/projects?category=Software`) and pass `?from=<category>` on links from `/projects` to `/projects/[slug]` so the "Back to Projects" link on the Project Detail page links directly to `/projects?category=<from>` (and browser back navigation naturally restores the URL state).
- **Rationale**:
  - Satisfies `FR-012` (switching category tabs updates the Projects Hero and Project Cards without a full page reload) and `FR-016` (going back from a Project Detail page returns the visitor to the category they came from).
  - Also makes category views directly shareable by URL (e.g., sending `/projects?category=Game+Dev` to a game studio recruiter).
- **Alternatives Considered**:
  - *`sessionStorage` only*: Rejected because it does not support shareable category URLs and requires extra client-side synchronization on hydration.

---

## 5. Icons, Asset Fallbacks, and Motion Implementation

- **Decision**:
  - Use `lucide-react` for consistent `1.5px` stroke SVG UI icons and category/timeline glyphs, plus inline SVG / `public/icons/tech/*.svg` with an automatic `onError` / text-only fallback component for Tech Stack icons (`FR-009`).
  - Check `public/resume.pdf` availability on the server in `lib/content.ts` (`fs.existsSync`) and pass `hasResume: boolean` to the Hero component so missing resume files render the inline `"Resume not available"` feedback without navigating to a broken URL (`FR-004`).
  - Use lightweight CSS transitions and a small `IntersectionObserver` reveal wrapper (`components/ui/reveal.tsx`) with `@media (prefers-reduced-motion: reduce)` CSS rules so text is always rendered immediately in the HTML response and never blocked by slow networks or failed scripts (`FR-020`).
- **Rationale**:
  - Keeps client JavaScript bundle size minimal, avoids heavy animation libraries, and guarantees 100% SSR/SSG text visibility even before hydration.
- **Alternatives Considered**:
  - *Heavy WebGL / GSAP scroll-jacking*: Rejected due to solo-build complexity and risk of blocking content on slow connections.

---

## 6. Testing & Verification Tooling

- **Decision**: Add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` for unit and component/integration testing of content loaders, edge-case fallbacks, contact form validation, and the `/api/contact` route handler, alongside `npm run build` and `npm run lint`.
- **Rationale**:
  - Fast, zero-config compatible with Next.js 16 + TypeScript, and allows automated verification of all 31 edge cases documented in `spec.md`.
- **Alternatives Considered**:
  - *Jest*: Slower setup with ESM and Next.js 16 TypeScript configuration compared to Vitest.
