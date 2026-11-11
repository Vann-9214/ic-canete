# Quickstart & Validation Guide: ICCañete Personal Portfolio Website

**Branch**: `001-portfolio-website` | **Date**: 2026-11-11
**Related Artifacts**: [plan.md](./plan.md), [data-model.md](./data-model.md), [contracts/contact-api.md](./contracts/contact-api.md), [../design/DESIGN.md](../design/DESIGN.md)

---

## 1. Prerequisites & Environment Setup

1. **Node.js**: v20+ installed.
2. **Install Dependencies**:
   ```powershell
   npm install resend zod gray-matter next-mdx-remote lucide-react
   npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
   ```
3. **Environment Variables** (`.env.local` in repository root):
   ```ini
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_RECIPIENT_EMAIL=ivan@example.com
   CONTACT_FROM_EMAIL="ICCañete Portfolio <onboarding@resend.dev>"
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

---

## 2. Build, Lint, and Test Commands

```powershell
# Start local development server
npm run dev

# Run ESLint verification
npm run lint

# Run unit & component/edge-case test suite
npm run test

# Verify production build & static route generation
npm run build
```

---

## 3. End-to-End Verification Scenarios

### Scenario 1: Home Page Scanning & Fallbacks (`US1`)
1. Open `http://localhost:3000`.
2. **Hero**: Verify owner name, role, social icon buttons (opening in a new tab), and the `Download CV` button beside them.
3. **Missing Resume Fallback**: Temporarily rename `public/resume.pdf` (if present) and reload `/`; click `Download CV` and confirm no broken navigation occurs and the inline `"Resume not available"` message appears.
4. **About Me & Unified Timeline**: Scroll down to verify the narrative paragraphs and ordered timeline entries (`work`, `school`, `career`, `certification`, `achievement` badges, with `null` end dates shown as `"Ongoing"`).
5. **Featured Projects & Tech Stack**: Verify featured project cards show category badges and link to `/projects/[slug]`, `"See all projects"` links to `/projects`, and Tech Stack items gracefully fall back to text-only if an icon path fails to load.

### Scenario 2: All Projects Category Filtering & Project Detail (`US2`)
1. Open `http://localhost:3000/projects`.
2. Verify the **Projects Hero** displays the intro explanation from `content/projects-intro.json` and the `bestProject` of the first populated category (`Software`).
3. Click the `Game Dev` and `Hardware` **Category Tabs** and confirm:
   - Both the Projects Hero spotlight card and the Project Cards grid update immediately without a full-page reload.
   - The URL updates to `/projects?category=Game+Dev` / `/projects?category=Hardware`.
4. Click a project card while on `Hardware` to open `/projects/[slug]?from=Hardware`.
5. Verify the **Project Detail** page displays the full MDX case study, all images in the gallery, external links, and downloadable files.
6. Click `"Back to Hardware Projects"` (or browser back) and confirm `/projects` restores the `Hardware` tab.
7. Visit `http://localhost:3000/projects/non-existent-slug` and confirm the custom 404 view renders with a working link back to `/projects`.

### Scenario 3: Contact Form Validation & Resend Delivery (`US3`)
1. Scroll to `#contact` at the bottom of `http://localhost:3000`.
2. Submit with empty fields or an invalid email and confirm inline field error messages appear (`FR-021`).
3. Enter a message over 2,000 characters and confirm the character counter and validation error alert the user.
4. Submit valid `name`, `email`, and `message`:
   - Confirm duplicate clicks on the submit button are disabled while sending (`FR-022`).
   - With a valid `RESEND_API_KEY`, confirm a `200 OK` response shows the confirmation banner and clears the fields (`FR-023`).
   - With an invalid/missing `RESEND_API_KEY`, confirm a `500` response shows the friendly retry banner and preserves all typed text in the inputs (`FR-023`).

### Scenario 4: System Theme, Accessibility, and Reduced Motion (`US4`)
1. Toggle the OS color scheme between Light and Dark mode in system settings / DevTools Rendering panel:
   - Confirm the site switches live between Cool Alabaster (`#F8FAFC`) and Deep Obsidian Slate (`#0B0F17`) with no manual theme toggle on the page (`FR-019`).
2. Emulate `prefers-reduced-motion: reduce` in DevTools:
   - Confirm scroll-reveal animations and hover/tab transforms are disabled while all content remains immediately visible (`FR-020`).
3. Resize viewport to `375px` width:
   - Confirm the Navigation Bar collapses into an accessible mobile menu drawer/popover, the timeline switches to a single column, and all interactive targets are at least `44x44px`.
