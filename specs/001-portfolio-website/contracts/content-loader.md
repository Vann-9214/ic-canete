# Contract: Repository Content Loader (`lib/content.ts`)

**File**: `lib/content.ts`
**Requirements Covered**: `FR-001`–`FR-017`, `FR-024`

All functions execute on the server (React Server Components / build-time static generation) and read from `content/` and `public/`.

---

## 1. Exported Functions & Signatures

```ts
export interface ProfileData extends Profile {
  hasResumeFile: boolean; // True only if resumeUrl is non-empty AND file exists under public/
}

export function getProfile(): ProfileData;
export function getTimeline(): TimelineEntry[];
export function getTechStack(): TechStackItem[];
export function getProjectsIntro(): ProjectsIntro;
export function getAllProjects(): Project[];
export function getFeaturedProjects(): Project[];
export function getCategoriesWithProjects(): {
  category: string;
  bestProject: Project;
  projects: Project[];
}[];
export function getProjectBySlug(slug: string): Project | null;
```

---

## 2. Behavioral & Edge-Case Guarantees

1. **`getProfile()`**:
   - Filters out any `socials` item whose `url` is empty or whitespace (`FR-003`).
   - Checks `fs.existsSync(path.join(process.cwd(), "public", resumeRelativePath))` and sets `hasResumeFile` accordingly so the Hero never renders a broken link when the PDF is missing (`FR-004`).
2. **`getTimeline()`**:
   - Returns timeline entries sorted ascending by `order`.
   - Normalizes empty or omitted `endDate` to `null` (rendered as `"Ongoing"` in UI, `FR-006`).
   - Returns `[]` safely if `content/timeline.json` is empty.
3. **`getTechStack()`**:
   - Filters out malformed entries missing a `name` and returns `[]` if empty so the Tech Stack section hides cleanly (`FR-009`).
4. **`getAllProjects()` & `getFeaturedProjects()`**:
   - Reads all `.mdx` files in `content/projects/`, parses frontmatter with `gray-matter`, and applies tolerant defaults for missing optional fields (`images: []`, `links: []`, `downloads: []`, `isFeatured: false`, `isBestInCategory: false`, `order: 999`) so incomplete project data never crashes the build or page (`FR-008`).
   - Filters out any entry in `links` or `downloads` whose `label` or `url`/`fileUrl` is empty or whitespace so malformed or unavailable link/download items never break the Project Detail page (`FR-015`).
5. **`getCategoriesWithProjects()`**:
   - Groups projects by `category`.
   - Excludes any category with `0` projects (`FR-011`).
   - Orders categories according to `projects-intro.json`'s `categoryOrder`, followed by any additional populated categories in alphabetical order.
   - Selects `bestProject` for each category as the first project with `isBestInCategory === true`, or falls back to `projects[0]` if none is flagged (`FR-010`).
6. **`getProjectBySlug(slug)`**:
   - Returns the matching `Project` (including raw MDX `fullDetails` body) or `null` if no file matches `slug` (triggering `notFound()` in `app/projects/[slug]/page.tsx`, `FR-017`).
