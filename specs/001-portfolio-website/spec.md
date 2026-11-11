# Feature Specification: ICCañete Personal Portfolio Website

**Feature Branch**: `001-portfolio-website`

**Created**: 2026-11-11

**Status**: Draft

**Input**: User description: "Use docs/system-architecture.md as the base. Write the spec with user stories, requirements, and acceptance criteria. Include every edge case from the doc. Don't ask me things the doc already answers."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Scan Personal Identity, Journey, Featured Work, and Skills on the Home Page (Priority: P1)

A recruiter, prospective client, or academic reviewer lands on the Home page to quickly understand who the portfolio owner is, what they do, their background and achievements, their highlighted projects, and their technical skills, with immediate options to visit social profiles or download the resume.

**Why this priority**: The Home page is the primary entry point for all visitors and delivers immediate value as a standalone portfolio summary even before visitors explore deeper pages.

**Independent Test**: Can be fully tested by opening the Home page, verifying the Hero identity and actions (social profile links and CV download), scrolling through the About Me narrative and unified timeline, checking the Featured Projects cards and "See all projects" button, and inspecting the Tech Stack items across desktop and mobile viewports.

**Acceptance Scenarios**:

1. **Given** a visitor opens the Home page, **When** the Hero section loads, **Then** they see the owner's name, role, configured social icon buttons, and a "Download CV" button positioned beside the social buttons.
2. **Given** a visitor views the Hero section, **When** they click a social icon button, **Then** the corresponding social profile opens in a new browser tab.
3. **Given** a resume PDF is available, **When** the visitor clicks "Download CV", **Then** the resume PDF is downloaded or opened.
4. **Given** a resume PDF is missing, **When** the visitor interacts with "Download CV", **Then** the site prevents navigation to a broken link and displays a short "resume not available" message instead.
5. **Given** a visitor scrolls to the About Me section, **When** both narrative text and timeline entries exist, **Then** the About Me narrative appears followed by ordered timeline entries showing each entry's type (`work`, `school`, `career`, `certification`, or `achievement`), title, place, dates (or "ongoing" when no end date is set), and description with visual differentiation by type.
6. **Given** a visitor scrolls to the Featured Projects section, **When** featured projects exist, **Then** each featured project renders as a card with its title, short description, image (or plain placeholder), and category tag, alongside a "See all projects" button.
7. **Given** a visitor scrolls to the Tech Stack section, **When** tech stack items exist, **Then** every item is displayed with its name and icon (or its name only if the icon fails to load).

---

### User Story 2 - Browse All Projects by Category and Inspect Full Project Details (Priority: P2)

A visitor wants to explore the full body of work across categories (such as Software, Hardware, and Game Dev), see the top project highlighted for each category, filter projects using category tabs, and open a dedicated detail page for any project to inspect all images, links, and downloadable files.

**Why this priority**: Deep project exploration proves capabilities to recruiters, clients, and reviewers looking for domain-specific work.

**Independent Test**: Can be tested by navigating to the All Projects page, switching between category tabs to verify the Projects Hero and Project Cards update to the selected category, opening a Project Detail page from a card or hero, verifying links/downloads/gallery rendering, and navigating back to confirm the previously selected category tab is preserved.

**Acceptance Scenarios**:

1. **Given** a visitor clicks "See all projects" or navigates to the All Projects page, **When** the page loads, **Then** the Projects Hero displays the page explanation text and the best project of the first populated category (showing its title, short description, and main image), followed by category tabs and the project cards for that category.
2. **Given** multiple populated project categories exist on the All Projects page, **When** the visitor clicks a different category tab, **Then** the Projects Hero updates to show that category's best project (or its first project if none is flagged as best) while keeping the explanation text unchanged, and the Project Cards list updates to show only projects in that category without leaving the page.
3. **Given** a visitor views a project in the Home Featured Projects section, the All Projects Hero, or the All Projects card grid, **When** they click the project, **Then** the Project Detail page opens showing the project's full information, all project pictures, external links (which open in a new tab), and downloadable files (which save when clicked).
4. **Given** a visitor opened a Project Detail page from a specific category on the All Projects page, **When** they use the back action to return to All Projects, **Then** the All Projects page restores the category they came from.
5. **Given** a visitor navigates to a project URL that does not exist, **When** the page loads, **Then** a not-found (404) page is shown with a working link back to the All Projects page.

---

### User Story 3 - Send a Direct Message via the Contact Form (Priority: P3)

A visitor on the Home page wants to reach out directly by filling out their name, email address, and message in the Contact Me section and receiving clear confirmation that their message was delivered.

**Why this priority**: Direct outreach converts portfolio visits into job interviews, freelance inquiries, or academic correspondence without requiring visitors to leave the site.

**Independent Test**: Can be tested by scrolling to the Contact Me section on the Home page, attempting invalid and valid submissions, verifying inline field validation and duplicate-click prevention, confirming email delivery with the visitor's address set as reply-to, and verifying both success confirmation (with form reset) and failure recovery (preserving typed input).

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the Contact Me section at the bottom of the Home page, **When** they enter a valid name, a valid email address, and a message within the allowed length limit and click send, **Then** the message is delivered to the portfolio owner's inbox with the visitor's email set as the reply-to address, a "message sent" confirmation is shown, and the form fields are cleared.
2. **Given** a visitor leaves any required field (`name`, `email`, or `message`) empty, enters an invalid email format, or exceeds the maximum message length, **When** they interact with or submit the form, **Then** submission is blocked and the form clearly indicates which field needs fixing (including when the message exceeds the length limit).
3. **Given** a message submission is currently in progress, **When** the visitor clicks the send button a second time, **Then** the duplicate click is ignored while the first request is sending.
4. **Given** a message submission fails due to a delivery error, dropped connection, or invalid server configuration, **When** the response returns, **Then** the visitor sees a clear error message suggesting they try again, their typed text remains intact in the form, and the form stays usable.

---

### User Story 4 - Navigate Site-Wide with Adaptive System Theme and Accessible Motion (Priority: P4)

A visitor moves across pages and Home sections using a persistent navigation bar, views the site in the light or dark theme matching their device setting, and experiences smooth animations that automatically respect reduced-motion preferences.

**Why this priority**: Cohesive navigation, automatic system theme matching, readable contrast, and accessible motion ensure a polished experience across all devices and user needs.

**Independent Test**: Can be tested by using the Navigation Bar on desktop and small screens across Home, All Projects, and Project Detail pages, toggling the operating system's dark/light mode live while viewing the site, and toggling the operating system's reduced-motion setting.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page of the site, **When** they view the Navigation Bar and click a navigation link, **Then** they are taken to the corresponding Home page section (navigating back to the Home page at that section if currently on another page) or to the All Projects page.
2. **Given** a visitor views the site on a small screen, **When** the Navigation Bar renders, **Then** the navigation links collapse into a toggleable menu so the bar does not overflow.
3. **Given** a visitor opens the site or changes their device color scheme while on the site, **When** the system reports dark mode or light mode, **Then** the site automatically displays and updates to the matching theme without any manual theme toggle on the site, defaulting to the light theme if no preference is reported.
4. **Given** a visitor opens pages or scrolls sections into view, **When** reduced motion is disabled on their device, **Then** content animates smoothly without delaying or blocking text visibility; **When** reduced motion is enabled, **Then** animations are reduced or turned off.

---

### Edge Cases

#### Home — Hero
- **Missing Resume PDF**: If the resume PDF file is missing or unavailable, clicking the Download CV button MUST NOT lead to a broken link and MUST display a short "resume not available" message instead.
- **Unset Social Link**: If a social link is omitted or empty in the profile data, its social icon button MUST NOT be rendered.
- **Slow Connection / Animation Delay**: If the visitor's connection is slow, text content MUST appear first and animations MUST NEVER block content visibility.

#### Home — About Me & Timeline
- **Empty About Me Text Only**: If the About Me text is empty but timeline entries exist, only the timeline is shown.
- **Empty Timeline Entries Only**: If there are no timeline entries but About Me text exists, only the About Me text is shown.
- **Both About Me and Timeline Empty**: If both the About Me text and timeline entries are empty, the entire About Me section is hidden.
- **Ongoing Timeline Entry**: If a timeline entry has no end date, its date range MUST be displayed as ongoing.
- **Long Text & Small Screens**: Very long text in About Me or timeline entries MUST wrap and remain readable on small screens, and the timeline layout MUST switch to a single column on small viewports.

#### Home — Featured Projects
- **No Featured Projects Flagged**: If no project is flagged as featured, the Featured Projects section MUST display only the "See all projects" button.
- **Missing Featured Project Image**: If a featured project has no image, its card MUST display a plain placeholder.
- **Incomplete Featured Project Data**: If a project is flagged as featured but has incomplete optional data, the card MUST render the available fields cleanly without breaking the page.

#### Home — Tech Stack
- **Empty Tech Stack Data**: If there are no tech stack items, the entire Tech Stack section MUST be hidden.
- **Broken Tech Stack Icon**: If a tech stack item's icon fails to load, the item MUST display its name only.

#### All Projects — Projects Hero & Category Tabs
- **Empty Page Explanation Text**: If the All Projects intro explanation text is empty, the Projects Hero MUST show only the best project of the selected category.
- **No Category Best Project Flagged**: If no project is flagged as the best project in the selected category, the Projects Hero MUST display the first project of that category.
- **Category With No Projects**: If a category has zero projects, that category and its tab MUST NOT be shown.
- **Single Populated Category**: If only one category has projects, the All Projects page MUST show that category's content without rendering extra category tabs.
- **Zero Projects Overall**: If there are no projects at all across the site, the All Projects page MUST display a "projects coming soon" message.

#### All Projects — Project Cards
- **Missing Project Card Image**: If a project has no image, its card MUST show a plain placeholder.
- **Very Long Short Description**: If a project's short description is very long, it MUST be truncated on the card so all project cards maintain a consistent size.

#### Project Detail Page
- **Non-Existent Project (404)**: If a visitor opens a project URL/identifier that does not exist, a not-found (404) page MUST appear with a link back to the All Projects page.
- **No External Links or Downloadable Files**: If a project has no external links or no downloadable files, those respective sections/controls MUST NOT be shown.
- **Broken External Link or Download**: If an external link or downloadable file target is unavailable, the rest of the Project Detail page MUST still render normally.
- **Failed Project Image**: If a project picture fails to load, the page MUST keep showing the remaining pictures and text content normally.
- **Many Project Pictures**: If a project has many pictures, all of them MUST be shown while keeping the page layout readable.

#### Site-Wide — Navigation, Theme, and Animations
- **Small Screen Navigation Overflow**: On small screens, navigation links MUST collapse into a menu so the Navigation Bar never overflows horizontally.
- **Cross-Page Home Section Links**: When a visitor clicks a Home section link in the Navigation Bar while on All Projects or a Project Detail page, the site MUST navigate back to the Home page scrolled to that target section.
- **Unreported System Theme Preference**: If the visitor's device does not report a dark or light preference, the site MUST display the light theme.
- **Theme Readability**: Both light and dark themes MUST keep all text readable against its background.
- **Reduced Motion Enabled**: If the visitor has reduced motion enabled in their device settings, page and scroll animations MUST be reduced or turned off.
- **Animation Failure**: If an animation fails to run for any reason, the underlying content MUST still be visible and usable.

#### Contact Form Flow
- **Empty Required Fields**: Any required field (`name`, `email`, `message`) left empty MUST be marked as required and prevent submission.
- **Message Over Maximum Length**: Very long messages MUST be accepted up to a defined maximum length, and the form MUST inform the visitor if they exceed that limit.
- **Invalid Email Format**: If the email address does not look valid, the form MUST NOT be sent and MUST indicate that the email field needs fixing.
- **Double Click on Send**: If the visitor clicks send twice, the second click MUST be ignored while the first submission is still in progress.
- **Spam Submissions**: Messages detected as spam MUST NOT be sent.
- **Delivery Failure or Dropped Connection**: If email delivery fails or the network connection drops, the submission MUST return an error so nothing is lost silently, keep the visitor's typed text in the form, and suggest trying again.
- **Missing or Invalid Email Service Credentials**: If the server email configuration/key is missing or invalid, the visitor MUST see the same friendly error message as any other delivery failure while the specific configuration issue is recorded in the server logs.
- **Accidental Resubmission After Success**: After a successful send, the form fields MUST be cleared automatically so the same message is not sent twice by accident.

## Requirements *(mandatory)*

### Functional Requirements

#### Home Page
- **FR-001**: The Home page MUST render as a single vertically scrolled page containing the Hero, About Me (with unified timeline), Featured Projects, Tech Stack, and Contact Me sections.
- **FR-002**: The Hero section MUST display the portfolio owner's name, role, configured social profile icon buttons, and a "Download CV" button positioned beside the social buttons.
- **FR-003**: Clicking a social icon button MUST open that profile in a new tab; social links that are not set in the profile data MUST NOT be shown.
- **FR-004**: Clicking "Download CV" MUST download or open the resume PDF when available, and MUST prevent broken navigation by showing a short "resume not available" message when the resume file is missing.
- **FR-005**: The About Me section MUST display the About Me narrative text followed by ordered timeline entries on a single unified timeline covering `work`, `school`, `career`, `certification`, and `achievement` entry types.
- **FR-006**: Each timeline entry MUST display its type, title, place, date range (showing "ongoing" when no end date is provided), and description, with clear visual distinction between entry types.
- **FR-007**: The About Me section MUST show only the timeline when the narrative text is empty, only the narrative text when timeline entries are empty, and hide the entire section when both are empty; on small screens, long text MUST wrap cleanly and the timeline MUST switch to a single column.
- **FR-008**: The Featured Projects section on the Home page MUST display cards for all projects flagged as featured (each showing its title, short description, category tag, and image or plain placeholder) along with a "See all projects" button that navigates to the All Projects page; if no project is flagged as featured, only the "See all projects" button MUST be shown; if a featured project has incomplete data, the card MUST show what is available without breaking the page.
- **FR-009**: The Tech Stack section MUST display every configured item with its name and icon, fall back to showing the item's name only if its icon fails to load, and hide the entire section if no tech stack items exist.

#### All Projects & Project Detail Pages
- **FR-010**: The All Projects page MUST open with a Projects Hero displaying a short page explanation (if present) and the best project of the currently selected category (defaulting to the first populated category), showing its title, short description, and main image; if no project in that category is flagged as best, the first project of that category MUST be shown.
- **FR-011**: The All Projects page MUST display Category Tabs for all categories that contain at least one project; if only one category contains projects, extra category tabs MUST NOT be shown; if no projects exist across all categories, a "projects coming soon" message MUST be displayed.
- **FR-012**: Selecting a Category Tab MUST update both the Projects Hero best project and the Project Cards list to the selected category without leaving the page, while keeping the page explanation text unchanged.
- **FR-013**: Each Project Card on the All Projects page MUST display the project's title, truncated short description (so cards maintain uniform height), category, and image (or a plain placeholder when no image is provided).
- **FR-014**: Clicking a project in the Featured Projects section, the Projects Hero, or the Project Cards list MUST open that project's Project Detail page.
- **FR-015**: The Project Detail page MUST display all available data for the project, including title, category, short description, full details, all project pictures (remaining readable even when many pictures exist and continuing to show content if any picture fails to load), external links (opening in a new tab), and downloadable files (saving when clicked); link or download sections MUST be hidden when none exist for that project.
- **FR-016**: Navigating back from a Project Detail page to the All Projects page MUST return the visitor to the category tab they came from.
- **FR-017**: Opening a Project Detail route for a project that does not exist MUST render a not-found (404) page with a link back to the All Projects page.

#### Site-Wide Navigation, Theme, and Motion
- **FR-018**: A persistent Navigation Bar MUST appear on every page with links to Home sections and the All Projects page, collapsing links into a menu on small screens to prevent overflow and routing Home section links back to the target section on the Home page when clicked from other pages.
- **FR-019**: The site MUST automatically match and live-update with the visitor's operating system dark or light mode preference, default to the light theme when no preference is reported, provide no manual theme toggle, and maintain WCAG 2.1 AA text contrast across both themes.
- **FR-020**: Page load, scroll-into-view, and page transition animations MUST never block text or content rendering, MUST degrade gracefully if an animation fails, and MUST be reduced or disabled when the visitor's device has reduced motion enabled.

#### Contact Form & Content Management
- **FR-021**: The Contact Me section at the bottom of the Home page MUST provide a form collecting the visitor's `name`, `email`, and `message`, enforcing required fields, valid email formatting, and a maximum message length (informing the visitor if exceeded) before submission.
- **FR-022**: The contact submission handler MUST ignore duplicate send clicks while a request is in flight, reject spam submissions, and send valid messages as an email to the portfolio owner's inbox with the visitor's email set as the reply-to address without storing contact messages in a database.
- **FR-023**: Upon contact submission completion, the site MUST either show a "message sent" confirmation and clear the form fields on success, or display a user-friendly error message (logging server/configuration errors internally without exposing sensitive details) while preserving the visitor's typed input on failure.
- **FR-024**: All portfolio content (profile, timeline entries, projects, All Projects intro, tech stack items) MUST be sourced from repository-managed content files with no user accounts, login pages, or admin interfaces, and decoupled from visual styling tokens so the site can be restyled without rewriting content.

### Key Entities

- **Profile**: Holds the portfolio owner's name, role, About Me narrative text, social profile links (platform name and URL), and resume PDF reference.
- **Timeline Entry**: Represents a milestone in the owner's journey, containing a `type` (`work`, `school`, `career`, `certification`, or `achievement`), `title`, `place`, `startDate`, optional `endDate` (treated as "ongoing" when absent), and `description`.
- **Project**: Represents a portfolio work item belonging to a single category, containing a unique `slug`/identifier, `title`, `shortDescription`, `category`, `fullDetails` (rich narrative), `images` (list of project pictures), optional `links` (label and URL), optional `downloads` (label and file path), `isFeatured` flag (for the Home page), and `isBestInCategory` flag (for the All Projects Hero).
- **Projects Page Intro**: Holds the short explanation text displayed at the top of the Projects Hero on the All Projects page.
- **Tech Stack Item**: Represents a skill, tool, or technology with a `name` and an `icon` reference.
- **Contact Message (Transient)**: Represents an outbound visitor inquiry containing `name`, `email`, and `message`; validated and transmitted via email only, never persisted.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor (recruiter, client, or reviewer) can locate the portfolio owner's role, download the resume (or see its availability status), and reach the Featured Projects section on the Home page within 30 seconds of landing.
- **SC-002**: Visitors on the All Projects page can switch between project categories and see the updated category hero and project cards in under 1 second without full-page reload delays.
- **SC-003**: 100% of documented empty, missing-asset, and error states (missing resume PDF, unset social links, empty sections, missing project images, broken icons, non-existent project URLs, and failed contact submissions) render fallback UI without unhandled runtime errors or broken layouts.
- **SC-004**: All pages and interactive states meet WCAG 2.1 AA accessibility criteria (including color contrast ratios of at least 4.5:1 for normal text and 3:1 for large text in both light and dark system themes, full keyboard operability, and zero motion when `prefers-reduced-motion` is active).
- **SC-005**: Visitors submitting the Contact Me form receive clear inline validation feedback immediately upon invalid input and receive final delivery confirmation or actionable error feedback (with input preserved) within 5 seconds of submitting.

## Assumptions

- **Single Category per Project**: Each project belongs to exactly one category (such as Software, Hardware, or Game Dev), as defined in `docs/system-architecture.md`.
- **Maximum Message Length Default**: The contact form enforces a reasonable maximum message length (e.g., 2,000–5,000 characters) with clear feedback when exceeded so visitors can send detailed inquiries without abuse.
- **Spam Prevention**: Basic non-intrusive spam protection (such as a hidden honeypot field and server-side rate/payload checks) is used so legitimate visitors are never blocked by third-party puzzles.
- **Ordering of Timeline Entries and Projects**: Timeline entries appear in chronological/reverse-chronological order as defined in the repository content files; when multiple or zero projects are marked as featured or best-in-category, deterministic ordering from the content files is used.
