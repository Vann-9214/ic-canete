# Design System & UI Specification: ICCañete Portfolio

**Visual Direction**: Direction 1 — Precision Engineering Studio
**Framework & Styling**: Next.js 16 (App Router) + Tailwind CSS v4 (`@theme inline` CSS variables)
**Theme Policy**: System Theme Only (`prefers-color-scheme`, defaulting to Light Mode; no manual toggle)
**Accessibility Standard**: WCAG 2.1 AA (`>= 4.5:1` normal text, `>= 3:1` large text & UI boundaries, `>= 44x44px` touch targets, `prefers-reduced-motion: reduce` support)

---

## 1. Design Tokens

All styling is driven by three-layer CSS custom properties defined in `app/globals.css` and exposed as semantic Tailwind utilities via `@theme inline`. Components MUST use semantic token classes (`bg-canvas`, `bg-surface`, `text-text-primary`, `border-border-subtle`, etc.) and NEVER hardcode raw hex values.

### 1.1 Color Tokens (Light Default & System Dark Mode)

| Semantic CSS Variable | Tailwind Utility | Light Mode (`:root` default) | Dark Mode (`prefers-color-scheme: dark`) | Usage & Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- |
| `--bg-canvas` | `bg-canvas` | `#F8FAFC` | `#0B0F17` | Page background canvas |
| `--bg-surface` | `bg-surface` | `#FFFFFF` | `#111827` | Cards, Projects Hero, Contact container |
| `--bg-surface-hover` | `bg-surface-hover` | `#F1F5F9` | `#1E293B` | Interactive card/row hover surface |
| `--bg-muted` | `bg-muted` | `#F1F5F9` | `#1E293B` | Input backgrounds, image placeholders, subtle pills |
| `--bg-glass` | `bg-glass` | `rgba(248, 250, 252, 0.85)` | `rgba(11, 15, 23, 0.85)` | Sticky Navigation Bar (`backdrop-blur-md`) |
| `--text-primary` | `text-text-primary` | `#0F172A` (`16.5:1` on canvas) | `#F8FAFC` (`17.4:1` on canvas) | Headings, primary body copy, active labels |
| `--text-secondary` | `text-text-secondary` | `#475569` (`7.5:1` on canvas) | `#94A3B8` (`6.4:1` on canvas) | Descriptions, timeline body, captions |
| `--text-muted` | `text-text-muted` | `#64748B` (`4.8:1` on surface) | `#CBD5E1` (`11.2:1` on surface) | Metadata labels, character counter, helper text |
| `--accent-primary` | `bg-accent-primary` / `text-accent-primary` | `#2563EB` (`5.1:1` vs `#FFFFFF`) | `#60A5FA` (`7.8:1` vs `#0B0F17`) | Primary buttons, active tab indicator, links |
| `--accent-primary-hover` | `bg-accent-primary-hover` | `#1D4ED8` | `#93C5FD` | Hover state for primary buttons/links |
| `--accent-on-primary` | `text-accent-on-primary` | `#FFFFFF` | `#0B0F17` | Text/icon color inside primary CTA buttons |
| `--border-subtle` | `border-border-subtle` | `#E2E8F0` | `#1E293B` | Default `1px` card, section, and input borders |
| `--border-strong` | `border-border-strong` | `#CBD5E1` | `#334155` | Hover card border and active input border |
| `--focus-ring` | `ring-focus-ring` | `#2563EB` | `#60A5FA` | `2px` keyboard focus ring (`outline-offset: 2px`) |
| `--status-success-bg` | `bg-status-success-bg` | `#ECFDF5` | `#064E3B` | Contact form success banner surface |
| `--status-success-text` | `text-status-success-text` | `#065F46` (`7.1:1`) | `#A7F3D0` (`10.4:1`) | Contact form success banner text |
| `--status-error-bg` | `bg-status-error-bg` | `#FEF2F2` | `#450A0A` | Contact form error banner / missing CV notice |
| `--status-error-text` | `text-status-error-text` | `#991B1B` (`7.4:1`) | `#FECACA` (`11.1:1`) | Field error text & error banner copy |
| `--image-outline` | `outline-image-outline` | `oklch(0 0 0 / 0.08)` | `oklch(1 0 0 / 0.10)` | Pure neutral `1px` inner outline on all images |

### 1.2 Semantic Category & Timeline Badge Tokens

Used by `CategoryBadge` (`Software`, `Game Dev`, `Hardware`, plus a default fallback for any additional category) and `TimelineBadge` (`work`, `school`, `career`, `certification`, `achievement`). All pairs achieve `>= 4.8:1` contrast.

| Badge Semantic Key | Light Background | Light Text & Border | Dark Background | Dark Text & Border | Mapped Domain / Timeline Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Blue (`info`)** | `#EFF6FF` | Text `#1E40AF`, Border `#BFDBFE` | `#172554` | Text `#93C5FD`, Border `#1E3A8A` | Category: `Software` · Timeline: `work` |
| **Violet (`creative`)** | `#F5F3FF` | Text `#5B21B6`, Border `#DDD6FE` | `#2E1065` | Text `#C4B5FD`, Border `#4C1D95` | Category: `Game Dev` · Timeline: `career` |
| **Amber (`hardware`)** | `#FFFBEB` | Text `#92400E`, Border `#FDE68A` | `#451A03` | Text `#FCD34D`, Border `#78350F` | Category: `Hardware` · Timeline: `achievement` |
| **Emerald (`academic`)** | `#ECFDF5` | Text `#065F46`, Border `#A7F3D0` | `#022C22` | Text `#6EE7B7`, Border `#065F46` | Timeline: `school` |
| **Cyan (`credential`)** | `#ECFEFF` | Text `#155E75`, Border `#A5F3FC` | `#083344` | Text `#67E8F9`, Border `#155E75` | Timeline: `certification` |
| **Neutral (`default`)** | `#F1F5F9` | Text `#334155`, Border `#CBD5E1` | `#1E293B` | Text `#E2E8F0`, Border `#334155` | Any other custom project category |

### 1.3 Typography Scale

Fonts are loaded in `app/layout.tsx` using `next/font/google`:
- `--font-sans`: `Geist` (weights `400`, `500`, `600`, `700`)
- `--font-mono`: `Geist Mono` (weights `400`, `500`, `600`)

| Token Role | Font Family | Desktop Size (`>= 768px`) | Mobile Size (`< 768px`) | Line Height | Weight & Tracking | CSS / Tailwind Classes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero (`h1`)** | `var(--font-sans)` | `3.0rem` (`48px`) | `2.25rem` (`36px`) | `1.12` | `700`, `-0.03em` | `font-sans text-4xl md:text-5xl font-bold tracking-tight text-balance` |
| **Page Title (`h1` subpage)** | `var(--font-sans)` | `2.25rem` (`36px`) | `1.875rem` (`30px`) | `1.18` | `700`, `-0.025em` | `font-sans text-3xl md:text-4xl font-bold tracking-tight text-balance` |
| **Section Heading (`h2`)** | `var(--font-sans)` | `1.75rem` (`28px`) | `1.5rem` (`24px`) | `1.25` | `600`, `-0.02em` | `font-sans text-2xl md:text-[28px] font-semibold tracking-tight text-balance` |
| **Card / Entry Title (`h3`)** | `var(--font-sans)` | `1.25rem` (`20px`) | `1.125rem` (`18px`) | `1.35` | `600`, `-0.01em` | `font-sans text-lg md:text-xl font-semibold text-balance` |
| **Body Large (Hero / Intro)** | `var(--font-sans)` | `1.125rem` (`18px`) | `1.0rem` (`16px`) | `1.65` | `400`, `0` | `font-sans text-base md:text-lg leading-relaxed text-pretty` |
| **Body Standard** | `var(--font-sans)` | `1.0rem` (`16px`) | `1.0rem` (`16px`) | `1.65` | `400`, `0` | `font-sans text-base leading-relaxed text-pretty` |
| **Body Small / Secondary** | `var(--font-sans)` | `0.875rem` (`14px`) | `0.875rem` (`14px`) | `1.5` | `400`, `0` | `font-sans text-sm leading-normal text-pretty` |
| **Monospace Meta / Badge** | `var(--font-mono)` | `0.75rem` (`12px`) | `0.75rem` (`12px`) | `1.4` | `500`, `0.02em` | `font-mono text-xs font-medium tabular-nums` |

### 1.4 Spacing, Concentric Border Radii, and Elevation

- **Spacing Scale (`8px` rhythm)**:
  - Tight inline gap: `8px` (`gap-2`)
  - Standard control/badge gap: `12px` (`gap-3`)
  - Card internal padding: `24px` (`p-6`) on desktop, `20px` (`p-5`) on mobile
  - Grid gap between cards: `24px` (`gap-6`) on desktop, `16px` (`gap-4`) on mobile
  - Section vertical padding: `80px` (`py-20`) on desktop, `56px` (`py-14`) on mobile
- **Concentric Border Radius System (`outerRadius = innerRadius + padding`)**:
  - **Outer Feature Container / Spotlight Hero**: `20px` (`rounded-[20px]`) with `12px` inner media padding → inner media radius `8px` (`rounded-lg`)
  - **Standard Project / Timeline / Contact Card**: `16px` (`rounded-2xl`)
  - **Buttons, Inputs, Category Tabs**: `10px` (`rounded-[10px]`)
  - **Category & Timeline Badges**: `9999px` (`rounded-full`)
- **Elevation Shadows**:
  - `--shadow-card`: `0 1px 2px 0 rgb(15 23 42 / 0.04), 0 4px 12px -2px rgb(15 23 42 / 0.06)` (Light) / `0 1px 2px 0 rgb(0 0 0 / 0.35), 0 6px 16px -4px rgb(0 0 0 / 0.45)` (Dark)
  - `--shadow-card-hover`: `0 4px 8px -2px rgb(15 23 42 / 0.06), 0 12px 24px -4px rgb(15 23 42 / 0.10)` (Light) / `0 8px 24px -4px rgb(0 0 0 / 0.65)` (Dark)

### 1.5 Exact `app/globals.css` Token Implementation

```css
@import "tailwindcss";

:root {
  --bg-canvas: #F8FAFC;
  --bg-surface: #FFFFFF;
  --bg-surface-hover: #F1F5F9;
  --bg-muted: #F1F5F9;
  --bg-glass: rgba(248, 250, 252, 0.85);

  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #64748B;

  --accent-primary: #2563EB;
  --accent-primary-hover: #1D4ED8;
  --accent-on-primary: #FFFFFF;

  --border-subtle: #E2E8F0;
  --border-strong: #CBD5E1;
  --focus-ring: #2563EB;

  --status-success-bg: #ECFDF5;
  --status-success-text: #065F46;
  --status-error-bg: #FEF2F2;
  --status-error-text: #991B1B;

  --image-outline: oklch(0 0 0 / 0.08);
  --shadow-card: 0 1px 2px 0 rgb(15 23 42 / 0.04), 0 4px 12px -2px rgb(15 23 42 / 0.06);
  --shadow-card-hover: 0 4px 8px -2px rgb(15 23 42 / 0.06), 0 12px 24px -4px rgb(15 23 42 / 0.10);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-canvas: #0B0F17;
    --bg-surface: #111827;
    --bg-surface-hover: #1E293B;
    --bg-muted: #1E293B;
    --bg-glass: rgba(11, 15, 23, 0.85);

    --text-primary: #F8FAFC;
    --text-secondary: #94A3B8;
    --text-muted: #CBD5E1;

    --accent-primary: #60A5FA;
    --accent-primary-hover: #93C5FD;
    --accent-on-primary: #0B0F17;

    --border-subtle: #1E293B;
    --border-strong: #334155;
    --focus-ring: #60A5FA;

    --status-success-bg: #064E3B;
    --status-success-text: #A7F3D0;
    --status-error-bg: #450A0A;
    --status-error-text: #FECACA;

    --image-outline: oklch(1 0 0 / 0.10);
    --shadow-card: 0 1px 2px 0 rgb(0 0 0 / 0.35), 0 6px 16px -4px rgb(0 0 0 / 0.45);
    --shadow-card-hover: 0 8px 24px -4px rgb(0 0 0 / 0.65);
  }
}

@theme inline {
  --color-canvas: var(--bg-canvas);
  --color-surface: var(--bg-surface);
  --color-surface-hover: var(--bg-surface-hover);
  --color-muted: var(--bg-muted);
  --color-glass: var(--bg-glass);

  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-text-muted: var(--text-muted);

  --color-accent-primary: var(--accent-primary);
  --color-accent-primary-hover: var(--accent-primary-hover);
  --color-accent-on-primary: var(--accent-on-primary);

  --color-border-subtle: var(--border-subtle);
  --color-border-strong: var(--border-strong);
  --color-focus-ring: var(--focus-ring);

  --color-status-success-bg: var(--status-success-bg);
  --color-status-success-text: var(--status-success-text);
  --color-status-error-bg: var(--status-error-bg);
  --color-status-error-text: var(--status-error-text);

  --color-image-outline: var(--image-outline);
  --shadow-card: var(--shadow-card);
  --shadow-card-hover: var(--shadow-card-hover);

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

---

## 2. Layout & Breakpoints

### 2.1 Responsive Breakpoints

| Breakpoint Name | Viewport Width | Container Max Width | Horizontal Gutter | Grid Columns |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (default)** | `320px – 639px` | `100%` | `16px` (`px-4`) | 1 column (`grid-cols-1`) |
| **Small (`sm`)** | `640px – 767px` | `640px` | `24px` (`sm:px-6`) | 1–2 columns (`sm:grid-cols-2` for Tech Stack) |
| **Medium (`md`)** | `768px – 1023px` | `768px` | `32px` (`md:px-8`) | 2 columns (`md:grid-cols-2` for Project Cards) |
| **Large (`lg`)** | `1024px – 1279px` | `1120px` (`max-w-[1120px]`) | `32px` (`lg:px-8`) | 12-column layout / 3-column Project Cards (`lg:grid-cols-3`) |
| **Extra Large (`xl`)** | `>= 1280px` | `1120px` (`max-w-[1120px]`) | `32px` (`xl:px-8`) | Centered `1120px` container (`mx-auto`) |

### 2.2 Global Layout & Scroll Rules

- **Sticky Navigation Bar**: Fixed height `64px` (`h-16`), `sticky top-0 z-40 bg-glass backdrop-blur-md border-b border-border-subtle`.
- **Section Anchor Offset**: Every Home section (`#hero`, `#about`, `#projects`, `#tech-stack`, `#contact`) MUST include `scroll-mt-20` (`80px` scroll margin top) so anchored scrolling from the Navigation Bar never hides section headings behind the `64px` sticky header.
- **Readable Text Measure**: Long-form narrative paragraphs (`About Me`, `Projects Intro`, `Project Detail MDX`) MUST be constrained to `max-w-[68ch]` so lines never stretch edge-to-edge on desktop monitors.

---

## 3. Wireframes for Each Page

### 3.1 Page 1: Home Page (`/`)

#### Desktop Wireframe (`>= 1024px`)

```text
+--------------------------------------------------------------------------------------------------+
| [ICCañete]                                    [About] [Projects] [Tech Stack] [Contact] [All ->] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|  IVAN CAÑETE                                                                                     |
|  Software Engineer · Game Developer · Hardware Builder                                           |
|  I build resilient web systems, interactive game mechanics, and physical computing prototypes    |
|  that bridge code and hardware.                                                                  |
|                                                                                                  |
|  [GitHub Icon] [LinkedIn Icon]   [ Download CV (PDF) ]                                           |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
|  01 / ABOUT ME & JOURNEY                                                                         |
|  +-----------------------------------+  +-----------------------------------------------------+  |
|  | About Me Narrative (4 cols)       |  | Unified Timeline (8 cols, vertical rail)            |  |
|  |                                   |  |                                                     |  |
|  | Paragraph 1 of story read from    |  | (o) [WORK]        2024 — Ongoing                    |  |
|  | profile.json...                   |  |  |  Full-Stack & Creative Systems Developer         |  |
|  |                                   |  |  |  Independent / Freelance                         |  |
|  | Paragraph 2 of story...           |  |  |  Description text...                             |  |
|  |                                   |  |  |                                                  |  |
|  |                                   |  | (o) [ACHIEVEMENT] 2024                              |  |
|  |                                   |  |  |  1st Place — Systems & Hardware Showcase         |  |
|  |                                   |  |  |  Regional Engineering Symposium                  |  |
|  |                                   |  |  |                                                  |  |
|  |                                   |  | (o) [CERTIFICATION] 2023 — 2024                     |  |
|  |                                   |  |  |  Full-Stack Web Development Certification        |  |
|  |                                   |  |  |                                                  |  |
|  |                                   |  | (o) [SCHOOL]      2021 — Ongoing                    |  |
|  |                                   |  |     B.S. in Computer Engineering                    |  |
|  +-----------------------------------+  +-----------------------------------------------------+  |
+--------------------------------------------------------------------------------------------------+
|  02 / FEATURED PROJECTS                                                   [ See all projects -> ]|
|  +------------------------------+ +------------------------------+ +---------------------------+ |
|  | [16:9 Image / Placeholder]   | | [16:9 Image / Placeholder]   | | [16:9 Image / Placeholder]| |
|  | [Software]                   | | [Game Dev]                   | | [Hardware]                | |
|  | Sentinel Telemetry Console   | | Neon Drift Shader Engine     | | Autonomous Rover Telemetry| |
|  | 3-line clamped short         | | 3-line clamped short         | | 3-line clamped short      | |
|  | description...               | | description...               | | description...            | |
|  +------------------------------+ +------------------------------+ +---------------------------+ |
+--------------------------------------------------------------------------------------------------+
|  03 / TECH STACK                                                                                 |
|  +--------------------+ +--------------------+ +--------------------+ +------------------------+ |
|  | [icon] TypeScript  | | [icon] Next.js     | | [icon] React       | | [icon] Tailwind CSS    | |
|  +--------------------+ +--------------------+ +--------------------+ +------------------------+ |
|  +--------------------+ +--------------------+ +--------------------+ +------------------------+ |
|  | [icon] C++ / C#    | | [icon] Unity/Godot | | [icon] Arduino     | | [icon] Git & Linux     | |
|  +--------------------+ +--------------------+ +--------------------+ +------------------------+ |
+--------------------------------------------------------------------------------------------------+
|  04 / CONTACT ME                                                                                 |
|  +--------------------------------------------------------------------------------------------+  |
|  | Have a role, project, or question? Send me a direct message.                               |  |
|  |                                                                                            |  |
|  | Name *                             Email *                                                 |  |
|  | [_______________________________]  [____________________________________________________]  |  |
|  |                                                                                            |  |
|  | Message *                                                                    0 / 2000      |  |
|  | [_______________________________________________________________________________________]  |  |
|  | [_______________________________________________________________________________________]  |  |
|  |                                                                                            |  |
|  | [ Send Message ]                                                                           |  |
|  +--------------------------------------------------------------------------------------------+  |
+--------------------------------------------------------------------------------------------------+
|  © 2026 Ivan Cañete (ICCañete)                                            [GitHub] [LinkedIn]    |
+--------------------------------------------------------------------------------------------------+
```

#### Mobile Wireframe (`< 768px`, `375px` reference)

```text
+----------------------------------------+
| [ICCañete]                      [Menu] |
+----------------------------------------+
| IVAN CAÑETE                            |
| Software · Game Dev · Hardware         |
| Short tagline text wraps cleanly...    |
|                                        |
| [GH] [IN]  [ Download CV (PDF) ]       |
+----------------------------------------+
| 01 / ABOUT ME & JOURNEY                |
| Narrative paragraph 1...               |
| Narrative paragraph 2...               |
|                                        |
| (o) [WORK] 2024 — Ongoing              |
|  |  Full-Stack Developer               |
|  |  Independent / Freelance            |
| (o) [SCHOOL] 2021 — Ongoing            |
|     B.S. in Computer Engineering       |
+----------------------------------------+
| 02 / FEATURED PROJECTS                 |
| +------------------------------------+ |
| | [16:9 Image]                       | |
| | [Software]                         | |
| | Sentinel Telemetry Console         | |
| | Clamped short description...       | |
| +------------------------------------+ |
| [      See all projects ->           ] |
+----------------------------------------+
| 03 / TECH STACK (2-col grid)           |
| [icon] TypeScript  | [icon] Next.js    |
| [icon] C++ / C#    | [icon] Arduino    |
+----------------------------------------+
| 04 / CONTACT ME                        |
| Name *    [__________________________] |
| Email *   [__________________________] |
| Message * [__________________________] |
| [           Send Message             ] |
+----------------------------------------+
```

---

### 3.2 Page 2: All Projects Page (`/projects`)

#### Desktop Wireframe (`>= 1024px`)

```text
+--------------------------------------------------------------------------------------------------+
| [ICCañete]                                    [About] [Projects] [Tech Stack] [Contact] [All ->] |
+--------------------------------------------------------------------------------------------------+
|  ALL PROJECTS                                                                                    |
|  Browse my work across software engineering, game development, and hardware prototyping.         |
|  Use the category tabs below to switch domains—each category highlights its flagship build.      |
|                                                                                                  |
|  +--------------------------------------------------------------------------------------------+  |
|  | FEATURED IN SOFTWARE (Projects Hero Spotlight Card — Clickable -> /projects/[slug])        |  |
|  | +------------------------------------------+  +-----------------------------------------+  |  |
|  | |                                          |  | [Software]  [★ Featured in Category]    |  |  |
|  | |      16:9 Main Project Picture           |  |                                         |  |  |
|  | |      (or Geometric Placeholder)          |  | Sentinel Telemetry & Incident Console   |  |  |
|  | |                                          |  |                                         |  |  |
|  | |                                          |  | High-density web observability          |  |  |
|  | |                                          |  | dashboard for monitoring distributed... |  |  |
|  | |                                          |  |                                         |  |  |
|  | |                                          |  | Open Project Details ->                 |  |  |
|  | +------------------------------------------+  +-----------------------------------------+  |  |
|  +--------------------------------------------------------------------------------------------+  |
|                                                                                                  |
|  CATEGORY TABS (Hidden if <= 1 populated category)                                               |
|  [ ● Software (2) ]   [ ○ Game Dev (1) ]   [ ○ Hardware (1) ]                                    |
|  ----------------------------------------------------------------------------------------------  |
|                                                                                                  |
|  PROJECTS IN SOFTWARE (3-column uniform grid)                                                    |
|  +------------------------------+ +------------------------------+ +---------------------------+ |
|  | [16:9 Image / Placeholder]   | | [16:9 Image / Placeholder]   | |                           | |
|  | [Software]                   | | [Software]                   | |                           | |
|  | Sentinel Telemetry Console   | | Edge Cache Router CLI        | |                           | |
|  | 3-line clamped summary...    | | 3-line clamped summary...    | |                           | |
|  +------------------------------+ +------------------------------+ +---------------------------+ |
+--------------------------------------------------------------------------------------------------+
```

#### Mobile Wireframe (`< 768px`)

```text
+----------------------------------------+
| [ICCañete]                      [Menu] |
+----------------------------------------+
| ALL PROJECTS                           |
| Short explanation text...              |
|                                        |
| +------------------------------------+ |
| | [16:9 Best Project Image]          | |
| | [Software] [★ Best in Category]    | |
| | Sentinel Telemetry Console         | |
| | Short description...               | |
| | Open Project Details ->            | |
| +------------------------------------+ |
|                                        |
| [● Software] [○ Game Dev] [○ Hardware] |
|                                        |
| +------------------------------------+ |
| | [16:9 Card Image]                  | |
| | [Software]                         | |
| | Sentinel Telemetry Console         | |
| | 3-line clamped summary...          | |
| +------------------------------------+ |
+----------------------------------------+
```

---

### 3.3 Page 3: Project Detail Page (`/projects/[slug]`) & 404 Page

#### Desktop Wireframe (`>= 1024px`)

```text
+--------------------------------------------------------------------------------------------------+
| [ICCañete]                                    [About] [Projects] [Tech Stack] [Contact] [All ->] |
+--------------------------------------------------------------------------------------------------+
|  [ <- Back to Software Projects ] (Restores /projects?category=Software)                         |
|                                                                                                  |
|  [Software]                                                                                      |
|  SENTINEL TELEMETRY & INCIDENT CONSOLE                                                           |
|  A high-density web observability dashboard for monitoring distributed services, latency         |
|  budgets, and automated alert routing in real time.                                              |
|                                                                                                  |
|  EXTERNAL LINKS & DOWNLOADS BAR (Each group hidden if empty)                                     |
|  [ Live Demo ↗ ]  [ Source Repository ↗ ]    |    [ ⬇ Architecture Whitepaper (PDF · 420 KB) ]   |
|  ----------------------------------------------------------------------------------------------  |
|                                                                                                  |
|  +--------------------------------------------------------------------------------------------+  |
|  |                                                                                            |  |
|  |                         Primary Hero Image (16:9, rounded-[20px])                          |  |
|  |                                                                                            |  |
|  +--------------------------------------------------------------------------------------------+  |
|                                                                                                  |
|  PROJECT DETAILS (Max-width 68ch readable prose container)                                       |
|  ## Overview                                                                                     |
|  Full narrative and technical case study rendered from MDX...                                    |
|                                                                                                  |
|  ## Technical Highlights                                                                         |
|  - Bullet points, architecture details, and outcomes...                                          |
|                                                                                                  |
|  ----------------------------------------------------------------------------------------------  |
|  PROJECT GALLERY (All pictures for this project; responsive 2-col grid on desktop, 1-col mobile) |
|  +---------------------------------------------+  +-------------------------------------------+  |
|  | [Picture 1]                                 |  | [Picture 2]                               |  |
|  | Caption 1                                   |  | Caption 2                                 |  |
|  +---------------------------------------------+  +-------------------------------------------+  |
+--------------------------------------------------------------------------------------------------+
```

#### Project Not Found (`404`) Wireframe (`app/projects/[slug]/not-found.tsx`)

```text
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|                                        [ 404 NOT FOUND ]                                         |
|                                     Project could not be found                                   |
|                The project you are looking for does not exist or may have moved.                 |
|                                                                                                  |
|                                   [ <- Back to All Projects ]                                    |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
```

---

## 4. Component List with States

Every component below has explicit visual and functional rules for all states so implementation requires zero guesswork.

### 4.1 `Navbar` (`components/layout/navbar.tsx`)
- **Structure**: Sticky header (`h-16`) with brand link (`ICCañete` → `/`) on the left, desktop navigation links (`About` → `/#about`, `Projects` → `/#projects`, `Tech Stack` → `/#tech-stack`, `Contact` → `/#contact`, and `All Projects` pill button → `/projects`) on the right, and a mobile hamburger button (`< 768px`, `min-h-11 min-w-11` / `44x44px`).
- **States**:
  - `default`: `text-text-secondary` on nav links; `bg-muted text-text-primary border border-border-subtle` on `All Projects` pill.
  - `hover`: Nav links transition to `text-text-primary`; `All Projects` pill transitions to `border-border-strong bg-surface-hover`.
  - `focus-visible`: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring`.
  - `active (mobile menu open)`: Mobile button toggles `aria-expanded="true"`, rendering a full-width dropdown drawer below the header (`bg-surface border-b border-border-subtle p-4 flex flex-col gap-2`); clicking any link or pressing `Escape` closes the drawer.

### 4.2 `HeroSection` (`components/home/hero-section.tsx`)
- **Props**: `{ profile: ProfileData }`.
- **Structure**: Displays `profile.handle` monospace eyebrow badge, `profile.name` (`h1`), `profile.role` subtitle, `profile.tagline` (`max-w-[62ch]`), and an action row (`flex flex-wrap items-center gap-3`) containing configured social icon buttons (`44x44px` each, `target="_blank" rel="noopener noreferrer"`) beside the `Download CV` button.
- **States**:
  - `default (resume available, hasResumeFile === true)`: `Download CV` renders as `<a href={profile.resumeUrl} download>` styled with `bg-accent-primary text-accent-on-primary px-5 min-h-11 rounded-[10px] font-medium inline-flex items-center gap-2`.
  - `hover / active`: `hover:bg-accent-primary-hover active:scale-[0.96] transition-all duration-150`.
  - `missing resume (hasResumeFile === false)`: Clicking `Download CV` (rendered as `<button type="button">`) does NOT navigate; instead it toggles an inline status pill (`role="status" aria-live="polite"`) right beside the button reading `"Resume not available right now."` styled with `bg-status-error-bg text-status-error-text border border-border-subtle px-3 py-1.5 rounded-lg text-sm`.
  - `missing social link`: Any social entry with an empty `url` is omitted before rendering (`FR-003`).

### 4.3 `AboutTimeline` (`components/home/about-timeline.tsx`)
- **Props**: `{ aboutMe: string[]; timeline: TimelineEntry[] }`.
- **Structure**: 12-column responsive container (`lg:grid lg:grid-cols-12 lg:gap-12`). Left column (`lg:col-span-5`) holds `About Me` narrative paragraphs; right column (`lg:col-span-7`) holds the vertical timeline rail (`border-l border-border-subtle pl-6 space-y-6`).
- **States**:
  - `both present`: Renders 5-col narrative + 7-col timeline on desktop (stacked single-column on `< 1024px`).
  - `aboutMe empty (`aboutMe.length === 0`)`: Narrative column is omitted; timeline spans full width (`lg:col-span-12`, `max-w-3xl`).
  - `timeline empty (`timeline.length === 0`)`: Timeline column is omitted; narrative spans full width (`lg:col-span-12`, `max-w-[68ch]`).
  - `both empty`: Returns `null` (entire `#about` section is hidden, `FR-007`).
  - `ongoing entry (`!entry.endDate`)`: Date badge renders `${entry.startDate} — Ongoing`.

### 4.4 `TimelineBadge` (`components/ui/timeline-badge.tsx`)
- **Props**: `{ type: TimelineEntry["type"] }`.
- **Structure**: Pill badge (`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border`) with a matching `14px` Lucide icon (`Briefcase` for `work`, `GraduationCap` for `school`, `Compass` for `career`, `Award` for `certification`, `Trophy` for `achievement`) and color tokens from Section 1.2.

### 4.5 `FeaturedProjects` (`components/home/featured-projects.tsx`)
- **Props**: `{ projects: Project[] }`.
- **Structure**: Section header with `"See all projects"` link button (`/projects`) + 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`) of `ProjectCard` components.
- **States**:
  - `default (projects.length > 0)`: Renders featured project cards + `"See all projects"` button.
  - `empty featured (projects.length === 0)`: Renders the section header and a centered card container holding only the `"See all projects"` primary CTA button (`FR-008`).

### 4.6 `TechStackSection` (`components/home/tech-stack-section.tsx`)
- **Props**: `{ items: TechStackItem[] }`.
- **Structure**: Responsive grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4`) of tech tiles (`bg-surface border border-border-subtle rounded-xl p-4 flex items-center gap-3`).
- **States**:
  - `default`: Shows `24x24px` SVG icon + `item.name` in `text-sm font-medium text-text-primary`.
  - `icon load error or empty icon`: `onError` handler sets local `iconError = true` and hides the `<img>`, rendering `item.name` cleanly by itself (`FR-009`).
  - `empty list (items.length === 0)`: Returns `null` (entire `#tech-stack` section is hidden, `FR-009`).

### 4.7 `ProjectsBrowser` (`components/projects/projects-browser.tsx`), `ProjectsHero` (`components/projects/projects-hero.tsx`), and `CategoryTabs` (`components/projects/category-tabs.tsx`)
- **Props**: `{ intro: ProjectsIntro; categories: { category: string; bestProject: Project; projects: Project[] }[]; initialCategory?: string }`.
- **States**:
  - `zero projects overall (`categories.length === 0`)`: Renders the page heading and an empty-state panel (`bg-surface border border-border-subtle rounded-2xl p-12 text-center`) displaying `"Projects coming soon"` (`FR-011`).
  - `single populated category (`categories.length === 1`)`: Renders `ProjectsHero` and `ProjectCard` grid for that category, and hides `CategoryTabs` completely (`FR-011`).
  - `multiple categories (`categories.length > 1`)`: Renders accessible `role="tablist"` with buttons (`role="tab"`, `aria-selected`, `min-h-11 px-4 rounded-[10px] font-mono text-sm`). Active tab uses `bg-accent-primary text-accent-on-primary`; inactive tabs use `bg-surface text-text-secondary border border-border-subtle hover:border-border-strong hover:text-text-primary`.
  - `empty intro explanation (`!intro.explanation`)`: `ProjectsHero` omits the intro paragraph and renders only the `bestProject` spotlight card (`FR-010`).

### 4.8 `ProjectCard` (`components/projects/project-card.tsx`)
- **Props**: `{ project: Project; fromCategory?: string }`.
- **Structure**: Full-card `<Link href={`/projects/${project.slug}${fromCategory ? `?from=${encodeURIComponent(fromCategory)}` : ""}`}>` (`group flex flex-col h-full bg-surface border border-border-subtle rounded-2xl overflow-hidden shadow-[var(--shadow-card)]`).
- **States**:
  - `default`: Top `16:9` media container (`aspect-video bg-muted relative overflow-hidden border-b border-border-subtle`), body with `CategoryBadge`, `h3` title (`group-hover:text-accent-primary transition-colors`), and `shortDescription` truncated to 3 lines (`line-clamp-3 text-sm text-text-secondary`).
  - `hover`: `hover:border-border-strong hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all duration-200`.
  - `missing or broken image`: Renders `ImageWithFallback` geometric placeholder (subtle grid pattern + `FolderCode` / category icon + `"Preview unavailable"` in `text-xs font-mono text-text-muted`) (`FR-008`, `FR-013`).
  - `incomplete optional data`: Missing description or category gracefully falls back to `""` / `"Project"` without throwing (`FR-008`).

### 4.9 `ProjectGallery` (`components/projects/project-gallery.tsx`)
- **Props**: `{ images: ProjectImage[]; projectTitle: string }`.
- **Structure**: Responsive grid (`grid-cols-1 md:grid-cols-2 gap-6`) displaying all pictures in `project.images`. Each figure has a `16:9` frame (`rounded-xl overflow-hidden bg-muted outline-1 -outline-offset-1 outline-[var(--image-outline)]`) and an optional `figcaption`.
- **States**:
  - `image fails to load`: Individual broken image swaps to the clean placeholder box with its `alt` / `caption` preserved so the rest of the gallery and page remain intact (`FR-015`).
  - `empty images (`images.length === 0`)`: Gallery section is hidden; top hero media shows the clean placeholder.

### 4.10 `ContactForm` (`components/home/contact-form.tsx`)
- **Structure**: Client form (`noValidate`) with `name` text input, `email` input, `message` textarea (with live `0 / 2000` `tabular-nums` character counter), hidden `website` honeypot input (`className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true"`), and submit button.
- **States**:
  - `default (idle)`: Inputs use `bg-muted border border-border-subtle rounded-[10px] px-4 py-2.5 text-text-primary focus:border-accent-primary focus:outline-2 focus:outline-focus-ring`.
  - `field invalid (empty required, bad email, or message > 2000 chars)`: Input border turns `border-status-error-text`, `aria-invalid="true"`, and an inline `<p role="alert" className="text-xs text-status-error-text mt-1.5">` displays the specific field error (`FR-021`). Over-limit character counter turns `text-status-error-text font-semibold`.
  - `submitting (in-flight)`: Submit button sets `disabled={true}` and `aria-busy="true"`, ignores any second click (`FR-022`), and shows a spinning `Loader2` icon + `"Sending..."`.
  - `success (200 OK)`: Form clears `name`, `email`, and `message` to `""` (`FR-023`) and displays a green confirmation banner (`role="status"`, `bg-status-success-bg text-status-success-text border border-border-subtle rounded-xl p-4`): *"Message sent! Thank you for reaching out—I'll get back to you soon."*
  - `error (400 / 429 / 500 or network drop)`: Form **retains** the visitor's typed `name`, `email`, and `message` (`FR-023`), re-enables the submit button, and displays a red error banner (`role="alert"`, `bg-status-error-bg text-status-error-text border border-border-subtle rounded-xl p-4`) suggesting they try again.

### 4.11 Shared Primitives & Layout Wrappers

- **`Footer` (`components/layout/footer.tsx`)**:
  - **Structure**: `border-t border-border-subtle py-8 mt-20` container (`mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary`).
  - **States**: Renders copyright text on the left and configured `profile.socials` links (`target="_blank" rel="noopener noreferrer"`, omitting any empty `url`) on the right.
- **`SectionWrapper` (`components/ui/section-wrapper.tsx`)**:
  - **Props**: `{ id: string; index?: string; title?: string; action?: React.ReactNode; children: React.ReactNode }`.
  - **Structure**: `<section id={id} className="scroll-mt-20 py-14 md:py-20">` with `<div className="mx-auto max-w-[1120px] px-4 sm:px-6 md:px-8">`. Renders optional header bar (`flex items-end justify-between gap-4 mb-8`) containing monospace index (`01 /`, `font-mono text-xs text-text-muted`) + `h2` (`text-2xl md:text-[28px] font-semibold tracking-tight text-text-primary`) and optional `action` slot (e.g., `"See all projects"` link).
- **`Reveal` (`components/ui/reveal.tsx`)**:
  - **Props**: `{ children: React.ReactNode; delayMs?: number; className?: string }`.
  - **States**: Renders children visible in initial SSR markup so slow connections or failed scripts never block content (`FR-020`); when `IntersectionObserver` is active and `prefers-reduced-motion` is not enabled, transitions `opacity` and `translateY(8px -> 0)` over `260ms cubic-bezier(0.22, 1, 0.36, 1)`.
- **`CategoryBadge` (`components/ui/category-badge.tsx`)**:
  - **Props**: `{ category: string }`.
  - **States**: Applies the semantic token pair from Section 1.2 (`Software` → Blue `info`, `Game Dev` → Violet `creative`, `Hardware` → Amber `hardware`, any other category → Neutral `default`) with `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border`.
- **`ImageWithFallback` (`components/ui/image-with-fallback.tsx`)**:
  - **Props**: `{ src?: string; alt: string; className?: string }`.
  - **States**: Renders `<img>` with `outline-1 -outline-offset-1 outline-image-outline` when `src` is valid; switches to a geometric placeholder box (`bg-muted flex flex-col items-center justify-center gap-2 text-text-muted font-mono text-xs`) if `src` is empty or `onError` triggers (`FR-008`, `FR-013`, `FR-015`).
- **`ContactSection` (`components/home/contact-section.tsx`)**:
  - **Structure**: Wraps `ContactForm` inside `<SectionWrapper id="contact" index="04" title="Contact Me">` and a card frame (`rounded-2xl bg-surface border border-border-subtle p-6 md:p-8 shadow-card`).
- **Project Detail Links & Downloads Bar (`app/projects/[slug]/page.tsx`)**:
  - **States**: External `links` open in a new tab (`target="_blank" rel="noopener noreferrer"`) and `downloads` include the `download` attribute. If `links` is empty, the links group is omitted; if `downloads` is empty, the downloads group is omitted; if a link or download target is unreachable, it is isolated to that anchor action and never disrupts page rendering (`FR-015`).

---

## 5. Motion Specification

### 5.1 Core Motion Rules
1. **Non-Blocking Content First (`FR-020`)**: Server-rendered HTML is always visible immediately. Animations enhance perceived responsiveness and never gate text behind JavaScript loading states.
2. **Interruptible CSS Transitions**: Interactive hover, focus, and active states use explicit CSS `transition-property` declarations (`transition-[transform,opacity,border-color,background-color,box-shadow]`)—never `transition: all`.

### 5.2 Timing, Easing, and Choreography Table

| Interaction / Element | CSS Properties Animated | Duration | Easing Curve | Stagger / Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **Page / Section Reveal (`Reveal`)** | `opacity: 0 -> 1`, `transform: translateY(8px) -> translateY(0)` | `260ms` | `cubic-bezier(0.22, 1, 0.36, 1)` | Triggered once via `IntersectionObserver` (`threshold: 0.1`); degrades to visible if observer unavailable |
| **Featured / Category Card Row** | `opacity`, `transform` | `260ms` | `cubic-bezier(0.22, 1, 0.36, 1)` | `80ms` stagger per card in row (`max 240ms` total delay) |
| **Category Tab Content Switch** | `opacity: 0.4 -> 1`, `transform: translateY(4px) -> translateY(0)` | `150ms` | `cubic-bezier(0.2, 0, 0, 1)` | Triggered on `selectedCategory` change in `ProjectsBrowser` |
| **Project Card Hover** | `transform: translateY(-2px)`, `border-color`, `box-shadow` | `180ms` | `ease-out` | Pointer hover (`@media (hover: hover)`) |
| **Button & Tab Press Feedback** | `transform: scale(0.96)` | `100ms` | `ease-out` | `:active` state (`active:scale-[0.96]`) |
| **Mobile Menu Drawer Open/Close** | `opacity`, `transform: translateY(-4px -> 0)` | `160ms` | `ease-out` | Hamburger toggle click |

### 5.3 Reduced Motion Override (`@media (prefers-reduced-motion: reduce)`)

Included in `app/globals.css` and respected by `Reveal` and all interactive components (`FR-020`):

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .reveal-hidden {
    opacity: 1 !important;
    transform: none !important;
  }
}
```
