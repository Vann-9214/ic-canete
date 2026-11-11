# Phase 1 Data Model & Content Schemas

**Branch**: `001-portfolio-website` | **Date**: 2026-11-11 | **Spec**: [spec.md](./spec.md)

All portfolio content lives in the repository under `content/` and static downloadable/media assets live under `public/`. No database is used.

---

## 1. Content Directory Layout

```text
content/
├── profile.json               # Hero identity, About Me narrative, social links, resume path
├── timeline.json              # Ordered unified timeline entries (work, school, career, certification, achievement)
├── tech-stack.json            # Tech stack items (name, icon path, category group)
├── projects-intro.json        # Short explanation shown in the All Projects Hero
└── projects/                  # One MDX file per project (frontmatter + rich Markdown body)
    ├── autonomous-rover-telemetry.mdx
    ├── neon-drift-shader-engine.mdx
    └── sentinel-cloud-observability.mdx
```

---

## 2. Entity Schemas (`lib/types.ts` & `lib/validations/content.ts`)

### 2.1 `Profile` (`content/profile.json`)

| Field | Type | Required | Validation / Fallback Rule |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Yes | Non-empty string (e.g., `"Ivan Cañete"`). |
| `handle` | `string` | Yes | Short brand name (e.g., `"ICCañete"`). |
| `role` | `string` | Yes | Primary role headline (e.g., `"Software Engineer · Game Developer · Hardware Builder"`). |
| `tagline` | `string` | Yes | 1–2 sentence Hero summary. |
| `aboutMe` | `string[]` | No | Array of paragraphs for About Me. If empty (`[]`), only the timeline is rendered (`FR-007`). |
| `resumeUrl` | `string` | No | Path to resume PDF in `public/` (e.g., `"/resume.pdf"`). Server verifies file existence on disk; if missing or empty, Download CV shows `"Resume not available"` (`FR-004`). |
| `socials` | `SocialLink[]` | No | Array of `{ platform: "github" \| "linkedin" \| "x" \| "email" \| "youtube" \| "itchio", label: string, url: string }`. Items with empty/invalid `url` are filtered out (`FR-003`). |

#### Sample `content/profile.json`
```json
{
  "name": "Ivan Cañete",
  "handle": "ICCañete",
  "role": "Software Engineer · Game Developer · Hardware Builder",
  "tagline": "I build resilient web systems, interactive game mechanics, and physical computing prototypes that bridge code and hardware.",
  "aboutMe": [
    "I am a multidisciplinary developer focused on turning complex technical problems into clean, reliable experiences across full-stack software, real-time game engines, and embedded hardware.",
    "Whether architecting a Next.js web application, writing custom gameplay systems and shaders, or wiring microcontrollers to sensors, I care deeply about clarity, performance, and practical execution."
  ],
  "resumeUrl": "/resume.pdf",
  "socials": [
    {
      "platform": "github",
      "label": "GitHub",
      "url": "https://github.com/ic-canete"
    },
    {
      "platform": "linkedin",
      "label": "LinkedIn",
      "url": "https://www.linkedin.com/in/ic-canete"
    }
  ]
}
```

---

### 2.2 `TimelineEntry` (`content/timeline.json`)

| Field | Type | Required | Validation / Fallback Rule |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Yes | Unique identifier (e.g., `"tl-01"`). |
| `type` | `"work" \| "school" \| "career" \| "certification" \| "achievement"` | Yes | Determines semantic badge label, icon, and accent tint (`FR-006`). |
| `title` | `string` | Yes | Role, degree, certification, or award title. |
| `place` | `string` | Yes | Company, university, issuing organization, or event. |
| `startDate` | `string` | Yes | Display start date (e.g., `"2024"` or `"Sep 2023"`). |
| `endDate` | `string \| null` | No | Display end date. When `null`, `undefined`, or `""`, UI renders `"Ongoing"` (`FR-006`). |
| `description` | `string` | Yes | Concise summary of impact or coursework; wraps cleanly on mobile (`FR-007`). |
| `order` | `number` | Yes | Ascending sort priority for deterministic display order (`FR-005`). |

#### Sample `content/timeline.json`
```json
[
  {
    "id": "tl-1",
    "type": "work",
    "title": "Full-Stack & Creative Systems Developer",
    "place": "Independent / Freelance",
    "startDate": "2024",
    "endDate": null,
    "description": "Designing and shipping full-stack web applications, interactive prototypes, and custom hardware-software integrations for clients.",
    "order": 1
  },
  {
    "id": "tl-2",
    "type": "achievement",
    "title": "1st Place — Systems & Hardware Prototyping Showcase",
    "place": "Regional Engineering Symposium",
    "startDate": "2024",
    "endDate": "2024",
    "description": "Recognized for building a low-latency wireless telemetry bridge between an embedded sensor array and a browser dashboard.",
    "order": 2
  },
  {
    "id": "tl-3",
    "type": "certification",
    "title": "Full-Stack Web Development Certification",
    "place": "Zuitt Coding Bootcamp",
    "startDate": "2023",
    "endDate": "2024",
    "description": "Completed intensive full-stack engineering training covering modern TypeScript, React, Next.js, REST APIs, and systems architecture.",
    "order": 3
  },
  {
    "id": "tl-4",
    "type": "school",
    "title": "B.S. in Computer Engineering / Computer Science",
    "place": "University Program",
    "startDate": "2021",
    "endDate": null,
    "description": "Focused on software engineering, embedded microcontrollers, digital logic, and real-time computer graphics.",
    "order": 4
  }
]
```

---

### 2.3 `TechStackItem` (`content/tech-stack.json`)

| Field | Type | Required | Validation / Fallback Rule |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Yes | Display name of the tool/language (e.g., `"TypeScript"`). |
| `icon` | `string` | No | Path to SVG icon in `public/icons/tech/` or icon key. If empty or image fails to load, the UI renders the item's `name` only (`FR-009`). |
| `category` | `"Languages" \| "Frameworks & Web" \| "Game Dev" \| "Hardware & Tools"` | No | Optional grouping metadata. |

#### Sample `content/tech-stack.json`
```json
[
  { "name": "TypeScript", "icon": "/icons/tech/typescript.svg", "category": "Languages" },
  { "name": "Next.js", "icon": "/icons/tech/nextjs.svg", "category": "Frameworks & Web" },
  { "name": "React", "icon": "/icons/tech/react.svg", "category": "Frameworks & Web" },
  { "name": "Tailwind CSS", "icon": "/icons/tech/tailwindcss.svg", "category": "Frameworks & Web" },
  { "name": "C++ / C#", "icon": "/icons/tech/cpp.svg", "category": "Languages" },
  { "name": "Unity / Godot", "icon": "/icons/tech/unity.svg", "category": "Game Dev" },
  { "name": "Arduino / ESP32", "icon": "/icons/tech/arduino.svg", "category": "Hardware & Tools" },
  { "name": "Git & Linux", "icon": "/icons/tech/git.svg", "category": "Hardware & Tools" }
]
```

---

### 2.4 `ProjectsIntro` (`content/projects-intro.json`)

| Field | Type | Required | Validation / Fallback Rule |
| :--- | :--- | :--- | :--- |
| `headline` | `string` | No | Page title on `/projects` (defaults to `"All Projects"`). |
| `explanation` | `string` | No | Short explanation displayed at the top of the Projects Hero. If empty (`""`), only the category's best project card is shown (`FR-010`). |
| `categoryOrder` | `string[]` | No | Preferred tab ordering (e.g., `["Software", "Game Dev", "Hardware"]`). Any additional populated categories are appended alphabetically. |

#### Sample `content/projects-intro.json`
```json
{
  "headline": "All Projects",
  "explanation": "Browse my work across software engineering, game development, and hardware prototyping. Use the category tabs below to switch domains—each category highlights its flagship build at the top.",
  "categoryOrder": ["Software", "Game Dev", "Hardware"]
}
```

---

### 2.5 `Project` (`content/projects/<slug>.mdx`)

| Field | Type | Required | Validation / Fallback Rule |
| :--- | :--- | :--- | :--- |
| `slug` | `string` | Yes | Derived from filename (`[a-z0-9-]+`). Used as route param `/projects/[slug]`. |
| `title` | `string` | Yes | Project title (`FR-008`, `FR-013`, `FR-015`). |
| `shortDescription` | `string` | Yes | Summary shown on cards and hero; clamped to 3 lines on cards (`FR-013`). |
| `category` | `string` | Yes | Single category name (e.g., `"Software"`, `"Game Dev"`, `"Hardware"`). |
| `isFeatured` | `boolean` | No | Defaults to `false`. Flags project for Home Featured Projects section (`FR-008`). |
| `isBestInCategory` | `boolean` | No | Defaults to `false`. Flags project for the All Projects Hero when its category is active. If no project in a category has `true`, the first project in that category (by `order`) is selected (`FR-010`). |
| `order` | `number` | No | Defaults to `999`. Deterministic sort order within lists. |
| `images` | `ProjectImage[]` | No | Array of `{ src: string, alt: string, caption?: string }`. First image is the main card/hero image. If empty or missing, cards render a clean geometric placeholder (`FR-008`, `FR-013`). |
| `links` | `ProjectLink[]` | No | Array of `{ label: string, url: string }`. Entries with empty `label` or `url` are filtered out; section omitted on detail page if empty (`FR-015`). |
| `downloads` | `ProjectDownload[]` | No | Array of `{ label: string, fileUrl: string, fileSize?: string }`. Entries with empty `label` or `fileUrl` are filtered out; section omitted on detail page if empty (`FR-015`). |
| `fullDetails` | `string` (MDX body) | No | Rich Markdown/MDX narrative rendered on the Project Detail page (`FR-015`). |

#### Sample `content/projects/sentinel-cloud-observability.mdx`
```mdx
---
title: "Sentinel Telemetry & Incident Console"
shortDescription: "A high-density web observability dashboard for monitoring distributed services, latency budgets, and automated alert routing in real time."
category: "Software"
isFeatured: true
isBestInCategory: true
order: 1
images:
  - src: "/images/projects/sentinel-main.svg"
    alt: "Sentinel Telemetry main overview dashboard"
    caption: "Real-time service latency and incident timeline view."
  - src: "/images/projects/sentinel-alerts.svg"
    alt: "Sentinel alert routing rules matrix"
    caption: "Rule evaluation pipeline and webhook dispatch inspector."
links:
  - label: "Live Demo"
    url: "https://example.com/sentinel-demo"
  - label: "Source Repository"
    url: "https://github.com/ic-canete/sentinel-console"
downloads:
  - label: "Architecture Whitepaper (PDF)"
    fileUrl: "/downloads/sentinel-architecture.pdf"
    fileSize: "420 KB"
---

## Overview

Sentinel is a web observability console built to help small engineering teams spot latency regressions and triage service incidents without drowning in noisy alerts.

## Technical Highlights

- **Streaming Metrics Pipeline**: Aggregates percentile latency buckets (`p50`, `p95`, `p99`) with deterministic ring-buffer updates.
- **Zero-Noise Alert Routing**: Deduplicates flapping health checks before dispatching notifications.
```

---

### 2.6 `ContactSubmission` (Transient API Payload — `lib/validations/contact.ts`)

| Field | Type | Required | Validation Rule |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Yes | Trimmed length `1..100` characters (`FR-021`). |
| `email` | `string` | Yes | Trimmed valid email format (`z.string().email()`), max `254` chars (`FR-021`). |
| `message` | `string` | Yes | Trimmed length `1..2000` characters (`FR-021`). |
| `website` | `string` | No | Honeypot field (`max 0` chars for real humans). If non-empty, treated as spam and rejected (`FR-022`). |

**Persistence Rule**: `ContactSubmission` is **never** written to disk or any database. It exists only in request memory during validation and Resend email dispatch (`FR-022`).
