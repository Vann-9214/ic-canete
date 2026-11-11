# Developer Portfolio Design Research & Visual Directions

**Project**: ICCañete (I See Cañete)
**Date**: 2026-11-11
**References**: [docs/system-architecture.md](../../docs/system-architecture.md), [specs/001-portfolio-website/spec.md](../001-portfolio-website/spec.md), [.specify/memory/constitution.md](../../.specify/memory/constitution.md)

---

## 1. How Target Audiences Scan a Developer Portfolio

Research into technical recruiting, engineering hiring managers, freelance client conversion, and academic/scholarship review reveals a strict **three-stage scanning funnel**:

### Stage 1: The 30–60 Second Triage Pass (Recruiters & Admissions Screeners)
- **Goal**: Confirm identity, role alignment, baseline professionalism, and immediate access to the resume.
- **Scanning Pattern**: F-pattern starting at the **Hero**. Reviewers look for:
  1. **Clear Identity & Value Proposition**: Name, specific role/focus, and a concise 1–2 sentence positioning statement.
  2. **Immediate Actions**: Working **Download CV** button right next to social/GitHub/LinkedIn links.
  3. **Chronological Credibility**: A quick scroll through the **About Me & Unified Timeline** to see education, work history, certifications, and achievements in one place without hunting across pages.
- **What Causes Immediate Drop-Off**: Slow-loading splash animations that delay text rendering, vague taglines (*"I turn coffee into code"*), broken resume/project links, or self-rated skill percentage bars (*"JavaScript 90%"*).

### Stage 2: The 45–90 Second Technical & Capability Pass (Hiring Managers & Freelance Clients)
- **Goal**: Verify real-world execution across domains (**Software**, **Game Dev**, **Hardware**) and evaluate whether the work is production-grade or tutorial boilerplate.
- **Scanning Pattern**:
  1. **Featured Projects on Home**: Reviewers scan 3–4 curated cards, looking at the visual preview, **category tag**, and 1–2 sentence summary.
  2. **Category Filtering on All Projects**: Domain-specific reviewers (e.g., a game studio lead vs. an embedded systems reviewer vs. a web client) switch directly to their relevant **Category Tab** (`Software`, `Game Dev`, `Hardware`) and inspect that category's **Best Project** in the Projects Hero.
  3. **Tech Stack Scan**: A quick visual check of tools and languages (with recognizable icons + labels) to confirm stack familiarity.

### Stage 3: The 5–10 Minute Deep Dive (Shortlisted Evaluation)
- **Goal**: Inspect engineering depth on **1–2 Project Detail Pages** and initiate contact.
- **What Reviewers Look For**:
  - Complete narrative: problem statement, constraints, architecture/implementation details, and results.
  - Visual proof: full image gallery (UI screenshots, gameplay frames, hardware/PCB photos, diagrams).
  - Tangible artifacts: working **Live Site / Repository links** and **Downloadable files** (builds, schematics, papers).
  - Frictionless outreach: a clean **Contact Me** form at the bottom of the Home page with immediate validation and confirmation.

---

## 2. Well-Regarded Portfolio Benchmarks

### Multidisciplinary Portfolios (Software + Game Dev + Hardware)

| Portfolio | Discipline Mix | Key Structural Takeaway for ICCañete |
| :--- | :--- | :--- |
| **Alana Balagot** (`alanabalagot.com`) | Senior Software Engineer, Hardware/CAD Fabrication, Interactive Installations | Frames diverse projects around **outcomes and systems** rather than isolated languages. Pairs hardware photography and software screenshots inside consistent card frames with clear category badges. |
| **Santi Grau** (`santigrau.com`) | Real-Time 3D/Game Tech, UI/UX, Robotics & Hardware Prototyping | Shows the **cross-disciplinary bridge** on detail pages—placing schematics, physical prototypes, and software interfaces side by side in a clean neutral gallery so rich media never clashes with page colors. |
| **Francisco Múrias** | Technical Artist, Game Developer, Systems/Tools Engineer | Uses **category-first filtering** so reviewers can immediately isolate game development work from software/tooling without visual clutter. |
| **Chris Silich** (`chrissilich.com`) | Full-Stack Web (React/Next.js), Physical Computing (Arduino/Sensors), Unity | Proves that web apps, hardware builds, and Unity games feel cohesive when unified by **strict typography, uniform card proportions, and a neutral surface palette**. |

### Clean Design Engineering Benchmarks

| Portfolio | Core Philosophy | Key Craft Details to Adopt |
| :--- | :--- | :--- |
| **Brittany Chiang** (`brittanychiang.com`) | Content-forward, ultra-scannable developer narrative | Impeccable visual hierarchy between role titles, date ranges, descriptions, and category/tech pills; WCAG-compliant contrast and keyboard navigation. |
| **Emil Kowalski** (`emilkowal.ski`) | Purposeful motion and tactile component polish | Restraint in animation: subtle `ease-out` entrance staggers, `scale(0.96)` button press feedback, interruptible CSS transitions, and strict `prefers-reduced-motion` support. |
| **Paco Coursey** (`paco.me`) & **Rauno Freiberg** (`rauno.me`) | Quiet luxury through typography, spacing rhythm, and surface craft | Perceptually balanced light/dark palettes (warm off-white in light mode, deep obsidian-slate in dark mode), concentric border radii, and subtle `1px` neutral image outlines (`oklch(0 0 0 / 0.1)` light / `oklch(1 0 0 / 0.1)` dark). |

---

## 3. Current Clean Design Trends (2025–2026)

1. **Modular Bento & Structured Editorial Grids**:
   - Content is organized into clean, predictable cards with concentric corner radii (`outerRadius = innerRadius + padding`), `1px` structural borders, and uniform card heights (`line-clamp` on card summaries).
2. **High-Contrast Variable Typography + Monospace Metadata**:
   - Crisp geometric/neo-grotesque sans-serif headings (`text-wrap: balance`) paired with comfortable body copy (`60–70ch` measure, `text-wrap: pretty`) and monospace accents (`tabular-nums`) for timeline date ranges, category badges, and file downloads.
3. **Perceptual System-Driven Light & Dark Themes**:
   - Automatic `prefers-color-scheme` adaptation without UI clutter. Stark `#FFFFFF` and `#000000` are replaced with eye-friendly warm alabaster (`#F8FAFC`) and deep carbon-slate (`#0B0F17`), allowing colorful game dev screenshots and hardware photos to pop without color cast.
4. **Restrained, Non-Blocking Micro-Interactions**:
   - Content is always visible immediately on slow connections. Motion is limited to subtle scroll-into-view reveals, smooth category tab transitions, and tactile hover/press states—collapsing cleanly to instant transitions when `prefers-reduced-motion: reduce` is active.

---

## 4. Three Proposed Visual Directions

All three directions strictly obey the [ICCañete Constitution](../../.specify/memory/constitution.md): **Next.js + Resend + JSON/MDX**, **design-token separation**, **system theme only (light default fallback)**, **WCAG 2.1 AA contrast**, **`prefers-reduced-motion` compliance**, and **solo-build simplicity**.

---

### Direction 1: Precision Engineering Studio *(Recommended)*

> **Inspiration**: Linear, Emil Kowalski, Brittany Chiang, Santi Grau
> **Core Idea**: A modern design-engineering aesthetic that pairs a neutral architectural canvas with high-signal typography and subtle semantic category accents—equally flattering for software UIs, game art, and hardware photography.

- **Mood**: Crisp, authoritative, approachable, and contemporary. Signals strong engineering craft without feeling gimmicky.
- **Layout**:
  - **Container & Grid**: `1120px` max-width container with a 12-column responsive grid (`24px` desktop gap, `16px` mobile gap) and an `8px` spacing rhythm.
  - **Home**: High-clarity Hero with inline social icon buttons + primary `Download CV` button; two-column desktop (single-column mobile) **About Me + Unified Timeline** featuring distinct semantic badges for `work`, `school`, `career`, `certification`, and `achievement`; 2–3 column **Featured Projects** card grid (`16px` outer radius, `8px` inner image radius); compact **Tech Stack** pill/tile grid; focused **Contact Me** card at the bottom.
  - **All Projects**: Split-layout **Projects Hero** (intro explanation on top, featured category spotlight card below with 16:9 media + summary), sticky-friendly **Category Tabs** bar, and a uniform 3-column **Project Cards** grid.
- **Typography**:
  - **Headings & Body**: `Geist Sans` (already configured in the repository via `next/font`) — geometric clarity, `-0.02em` tracking on headings (`text-wrap: balance`), `1.65` line-height on body (`text-wrap: pretty`).
  - **Metadata, Dates & Category Tags**: `Geist Mono` with `font-variant-numeric: tabular-nums` for timeline dates (`2024 — Ongoing`), category pills (`Software`, `Game Dev`, `Hardware`), and file download metadata.
- **Light & Dark Color Tokens (WCAG 2.1 AA Verified)**:

  | Semantic Token | Light Mode (`prefers-color-scheme: light` / default) | Dark Mode (`prefers-color-scheme: dark`) | Contrast Note |
  | :--- | :--- | :--- | :--- |
  | `--bg-canvas` | `#F8FAFC` (Cool Alabaster) | `#0B0F17` (Deep Obsidian Slate) | Base page surface |
  | `--bg-surface` | `#FFFFFF` (Pure Elevated Card) | `#111827` (Elevated Slate Card) | Card / Hero container |
  | `--bg-muted` | `#F1F5F9` (Soft Slate Subtle) | `#1E293B` (Muted Slate Pill/Input) | Badges, placeholders, inputs |
  | `--text-primary` | `#0F172A` (16.5:1 on canvas) | `#F8FAFC` (17.4:1 on canvas) | Exceeds AAA (`>7:1`) |
  | `--text-secondary` | `#475569` (7.5:1 on canvas) | `#94A3B8` (6.4:1 on canvas) | Exceeds AA (`>4.5:1`) |
  | `--accent-primary` | `#2563EB` (Royal Cobalt, 5.1:1) | `#60A5FA` (Luminous Sky, 7.8:1) | Primary CTA & active tab |
  | `--border-subtle` | `#E2E8F0` + `1px` image outline `oklch(0 0 0 / 0.08)` | `#1E293B` + `1px` image outline `oklch(1 0 0 / 0.10)` | Structural hairlines |
  | **Category Badges** | Subtle tinted surface + `>4.5:1` label (`Software`: Blue, `Game Dev`: Violet, `Hardware`: Amber) | Dark translucent tint + bright accessible label | Instant domain scanning |

- **Motion**:
  - **Page & Section Reveal**: Non-blocking CSS/IntersectionObserver reveal (`opacity: 0 -> 1`, `translateY(8px -> 0)`, `260ms cubic-bezier(0.22, 1, 0.36, 1)`), with `80ms` stagger on project card rows.
  - **Interactions**: Cards lift subtly via border/shadow tint (`180ms ease-out`); buttons respond with `active:scale-[0.96]`; Category Tabs switch project views with a crisp `150ms` opacity/translate cross-fade.
  - **Reduced Motion**: Under `@media (prefers-reduced-motion: reduce)`, all transforms and staggers are disabled (`transition-duration: 0.01ms`), keeping static hover/focus color cues intact.

#### Audience Fit (Direction 1)

| Audience | Pros | Cons |
| :--- | :--- | :--- |
| **Recruiters & Hiring Managers** | Instant 30-second scan; familiar, zero-friction hierarchy; timeline and category tags are Effortless to parse. | Less "experimental art-piece" shock value than a WebGL playground (intentional tradeoff for reliability). |
| **Freelance Clients** | Signals high product polish, reliability, and modern UI sensibility—builds immediate trust that you ship clean software. | None significant; looks like a modern SaaS/agency-grade product. |
| **Schools & Scholarship Reviewers** | Clean academic legibility; timeline clearly highlights education, certifications, and achievements alongside technical depth. | Slightly more industry/product-oriented than a traditional academic CV (though still formal and structured). |

---

### Direction 2: Editorial Monograph

> **Inspiration**: Read.cv, Stripe Press, Paco Coursey
> **Core Idea**: A warm, publication-inspired layout where typography and storytelling lead, reading like a curated engineering monograph or design journal.

- **Mood**: Thoughtful, scholarly, calm, and understated.
- **Layout**:
  - Narrower reading column (`840px` max-width) with generous vertical whitespace (`64px–96px` section rhythm), horizontal hairlines (`1px` rules) separating timeline entries, and a 2-column magazine layout for Project Cards.
- **Typography**:
  - **Headings**: High-contrast editorial serif (`Instrument Serif` or `Newsreader`).
  - **Body**: Warm humanist sans-serif (`Plus Jakarta Sans` or `Inter`).
  - **Metadata**: `IBM Plex Mono` (`tabular-nums`) for dates and indices.
- **Light & Dark Color Tokens (WCAG 2.1 AA Verified)**:
  - **Light Mode**: Warm parchment paper (`#FAF8F5`), ivory cards (`#FFFFFF`), deep charcoal ink (`#1C1917`, 16.1:1), warm stone secondary text (`#57534E`, 6.8:1), burnt terracotta accent (`#B45309`, 5.0:1), warm stone border (`#E7E5E4`).
  - **Dark Mode**: Warm espresso carbon (`#121110`), dark umber cards (`#1C1917`), warm alabaster text (`#F5F5F4`, 16.8:1), muted stone secondary (`#A8A29E`, 6.2:1), warm amber accent (`#F59E0B`, 8.9:1), dark stone border (`#292524`).
- **Motion**:
  - Ultra-minimal: soft opacity fades (`180ms ease-out`) and subtle link underline animations; almost zero vertical/spatial motion.

#### Audience Fit (Direction 2)

| Audience | Pros | Cons |
| :--- | :--- | :--- |
| **Recruiters & Hiring Managers** | Extremely fast to read; feels mature and senior; zero visual noise. | Can feel slightly too quiet or "writer/researcher-focused" for game dev or interactive engineering roles. |
| **Freelance Clients** | Communicates thoughtfulness, clear communication skills, and bespoke craft. | Clients looking for bold, high-tech product UI or game dev energy may find the serif/parchment tone too literary. |
| **Schools & Scholarship Reviewers** | **Strongest academic resonance**—reads like a prestigious fellowship portfolio or research publication. | Narrower 2-column grid shows fewer project cards above the fold on large monitors. |

---

### Direction 3: Kinetic Lab / Blueprint

> **Inspiration**: Teenage Engineering, Nothing OS, Industrial R&D Portfolios
> **Core Idea**: An exposed-grid, technical specification sheet aesthetic inspired by hardware schematics, CAD blueprints, and game engine debug HUDs.

- **Mood**: Technical, tactile, experimental, and systems-obsessed.
- **Layout**:
  - Exposed `1px` structural grid lines dividing the viewport into labeled cells; project cards styled like technical data sheets with index numbers (`PRJ-01`), exposed metadata headers, and corner crosshair/bracket accents.
- **Typography**:
  - **Headings**: `Space Grotesk` (bold, squared-off technical geometry).
  - **Body**: `IBM Plex Sans` (engineered readability).
  - **Metadata & UI Controls**: Heavy use of `JetBrains Mono` (`uppercase`, `tracking-wider`, `tabular-nums`) for navigation, category tabs, and timeline tags.
- **Light & Dark Color Tokens (WCAG 2.1 AA Verified)**:
  - **Light Mode**: Drafting paper gray (`#F3F4F6`), crisp white cells (`#FFFFFF`), jet ink (`#111827`, 16.2:1), technical slate (`#4B5563`, 6.9:1), international signal orange accent (`#C2410C`, 5.4:1), exposed grid border (`#D1D5DB`).
  - **Dark Mode**: Carbon matrix (`#090A0F`), anodized panel (`#12151E`), phosphor white (`#F1F5F9`, 17.1:1), steel gray (`#94A3B8`, 6.5:1), high-vis orange accent (`#FB923C`, 8.2:1) + status green (`#34D399`), grid border (`#222738`).
- **Motion**:
  - Snappy mechanical transitions (`150ms cubic-bezier(0.16, 1, 0.3, 1)`), instant border-highlight sweeps on card hover, and stepped reveal animations.

#### Audience Fit (Direction 3)

| Audience | Pros | Cons |
| :--- | :--- | :--- |
| **Recruiters & Hiring Managers** | Immediately memorable for **Hardware, Embedded, and Game Systems** roles; screams "builder". | Exposed grid lines and dense monospace labels can feel visually busy during a rapid 30-second generalist scan. |
| **Freelance Clients** | Great for technical/R&D or game-dev clients who want a hard-engineering specialist. | Non-technical small-business or web clients may find the industrial blueprint look intimidating or niche. |
| **Schools & Scholarship Reviewers** | Highlights engineering identity and technical curiosity strongly. | Less conventional for general academic reviewers compared to Direction 1 or 2. |

---

## 5. Side-by-Side Comparison & Final Recommendation

| Criterion | Direction 1: Precision Engineering Studio ⭐ | Direction 2: Editorial Monograph | Direction 3: Kinetic Lab / Blueprint |
| :--- | :--- | :--- | :--- |
| **30-Second Recruiter Scan** | **Excellent** (Clear hierarchy + badges) | **Very Good** (Text-forward) | **Good** (High visual density) |
| **Freelance Client Appeal** | **Excellent** (Polished product feel) | **Good** (Editorial/agency feel) | **Moderate** (Niche technical feel) |
| **School / Academic Appeal** | **Very Good** (Structured & readable) | **Excellent** (Publication feel) | **Good** (Engineering lab feel) |
| **Fits Software + Game Dev + Hardware** | **Best** (Neutral frame + semantic category pills) | **Good** (Best for long-form writing) | **Good** (Leans heavily hardware/systems) |
| **Solo-Build & Restyle Simplicity** | **High** (Uses built-in `Geist` + clean semantic tokens) | **High** (Requires adding serif font) | **Medium** (Exposed grid borders need careful responsive tuning) |

### Recommendation: **Direction 1 — Precision Engineering Studio**

**Why Direction 1 is the best fit for ICCañete**:
1. **Works for All Three Audiences**: It gives recruiters instant 30-second scannability, shows freelance clients modern product-grade UI polish, and presents schools with a clean, authoritative timeline of academic and career milestones.
2. **Built for Multidisciplinary Work**: Because the canvas (`#F8FAFC` light / `#0B0F17` dark) is perceptually neutral, colorful Game Dev screenshots, Hardware PCB/prototype photos, and Software architecture diagrams sit side by side without clashing—while subtle semantic category pills (`Software`, `Game Dev`, `Hardware`) and timeline badges (`work`, `school`, `career`, `certification`, `achievement`) make filtering effortless.
3. **Zero-Friction Solo Implementation**: It builds directly on the `Geist` and `Geist Mono` fonts already installed in the Next.js project and maps 1:1 to a small set of semantic CSS variables (`--bg-canvas`, `--bg-surface`, `--text-primary`, `--accent-primary`, etc.) so the entire site can be restyled later without touching a single JSON/MDX content file.

---

## 6. Decision Record

- **Selected Initial Direction**: **Direction 1 — Precision Engineering Studio** (confirmed on `2026-11-11`).
- **Flexibility Note**: All visual tokens (colors, radii, spacing, typography, and motion durations) will be defined as semantic CSS variables in the theme layer, decoupled from component logic and JSON/MDX content so the UI can be refined or restyled at any time without reworking content or page structure.

