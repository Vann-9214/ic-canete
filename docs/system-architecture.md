System Architecture

1. Title
   ICCañete (I See Cañete)
2. Description
   ICCañete (I See Cañete) is a personal portfolio website that shows who you are, what you do, your career and achievements, and your projects across software, game dev, hardware, and more. Visitors can read your story, download your resume, see featured projects, browse every project by category, open a full page for each project, and message you directly. It is meant to be quick to scan for anyone, whether a recruiter, a client, or a school. The design is simple and clean with animation, follows the visitor's system theme, and can be restyled later.
3. Feature
   Type: Module
   Tab 1: Home — The main single page, scrolled top to bottom. It introduces you, tells your story, and previews your best work before sending visitors deeper.
   Mini-feature 1: Hero
   Full Description The first thing a visitor sees. It tells them who you are and what you do, and gives them two quick actions: reach you through your socials, or take your resume with them. The Download CV button sits beside the social buttons.
   How It Works
   The visitor opens the site and lands on the Hero.
   They see your name, role, social icon buttons, and the Download CV button.
   Clicking a social icon opens that profile in a new tab.
   Clicking Download CV downloads or opens your resume PDF.
   Edge Cases / Errors
   If the resume PDF is missing, the button does not lead to a broken link and shows a short "resume not available" message instead.
   If a social link is not set in the profile data, its icon is not shown.
   If the visitor's connection is slow, the text appears first and animations never block the content.
   Mini-feature 2: About Me
   Full Description One section that tells visitors who you are and what you do, and shows your journey through work, school, and career, with certifications and achievements placed on the same timeline. Your story and your timeline tell the same thing, so they sit together and visitors read them in one place.
   How It Works
   The visitor scrolls down from the Hero.
   The About Me text appears, read from the profile data file.
   The timeline follows it, with entries in order. Each entry shows its type, title, place, dates, and description.
   Each entry is marked by its type (work, school, career, certification, or achievement) so visitors can tell them apart.
   Edge Cases / Errors
   If the About Me text is empty, only the timeline is shown. If there are no timeline entries, only the text is shown. If both are empty, the section is hidden.
   If an entry has no end date, it is shown as ongoing.
   Very long text wraps and stays readable on small screens, and the timeline switches to a single column.
   Mini-feature 3: Featured Projects
   Full Description Shows a few of your main projects on the Home page so visitors see your best work without leaving the page. Each card carries a category tag, and a "See all projects" button leads to the full list on the All Projects page.
   How It Works
   The visitor scrolls to the Projects section.
   The site shows the projects flagged as featured in the project data, each as a card with a category tag.
   Clicking a card opens that project's detail page.
   Clicking "See all projects" opens the All Projects tab.
   Edge Cases / Errors
   If no project is flagged as featured, the section shows only the "See all projects" button.
   If a project has no image, the card shows a plain placeholder.
   If a project is flagged as featured but its data is incomplete, the card shows what is available and does not break the page.
   Mini-feature 4: Tech Stack
   Full Description Shows the tools, languages, and technologies you use, so visitors can see your skills at a glance.
   How It Works
   The visitor scrolls to the Tech Stack section.
   The site shows every item from the tech stack data, each with its name and icon.
   Edge Cases / Errors
   If there are no tech stack items, the section is hidden.
   If an icon fails to load, the item shows its name only.
   Tab 2: All Projects — A separate page for all your projects. It opens on a hero that shows the best project of a category, with tabs to switch between categories such as Software, Hardware, and Game Dev. Clicking a project opens its full details.
   Mini-feature 1: Projects Hero
   Full Description The first thing visitors see after clicking "See all projects". It starts with a short explanation of what this page is for: it holds all your projects, separated by category, and the tabs let visitors pick the kind of work they want to see. Below the explanation it shows the best project of the selected category, so every category has its own top project up front.
   How It Works
   The visitor clicks "See all projects" and the All Projects page opens.
   The hero shows the short explanation of the page, read from the content files.
   Below it, the hero shows the best project of the first category by default, with its title, short description, and main image.
   Clicking the best project opens that project's detail page.
   When the visitor switches category tabs, the best project in the hero changes to that category's. The explanation stays the same.
   Edge Cases / Errors
   If the explanation text is empty, the hero shows only the best project.
   If no project is flagged as the best in a category, the hero shows the first project of that category.
   If a category has no projects, it is not shown.
   If there are no projects at all, the page shows a "projects coming soon" message.
   Mini-feature 2: Category Tabs
   Full Description Tabs that let visitors switch between Software, Hardware, Game Dev, and any other categories. Switching a tab changes the hero and the list of projects without leaving the page.
   How It Works
   The visitor sees one tab for each category on the All Projects page.
   They click a tab.
   The hero and the project cards change to that category.
   When the visitor goes back from a project's detail page, the page returns to the category they came from.
   Edge Cases / Errors
   If there is only one category, the page shows that category without extra tabs.
   If a category has no projects, its tab is not shown.
   Mini-feature 3: Project Cards
   Full Description The projects of the selected category show as cards under the hero. Each card gives a quick summary so visitors can decide whether to open the full page.
   How It Works
   The visitor looks through the cards of the selected category.
   Each card shows its title, short description, and category.
   Clicking a card opens that project's detail page.
   Edge Cases / Errors
   If a project has no image, the card shows a plain placeholder.
   If a short description is very long, it is cut off on the card so every card stays a similar size.
   Mini-feature 4: Project Detail Page
   Full Description A full page with every detail about one project, read from that project's data file. It shows all the pictures you have for that project. If the project has links, such as a live site or a repository, or downloadable files, they are shown too. Nothing about the project is left out.
   How It Works
   The visitor clicks a project card, the Projects Hero, or a featured card on the Home page.
   The detail page opens with the full information of that project and all of its pictures.
   If the project has links or downloadable files, they appear on the page.
   Clicking a link opens it in a new tab. Clicking a download saves the file.
   The visitor can go back to the category they came from.
   Edge Cases / Errors
   If the visitor opens a project that does not exist, a not-found (404) page appears with a link back to All Projects.
   If a project has no links or no downloadable files, those parts are not shown.
   If a link or a download no longer works, the rest of the page still shows normally.
   If a picture fails to load, the page keeps showing the rest of the content.
   If a project has many pictures, all of them are shown and the page stays readable.
   Tab 3: Site-Wide — Features that appear across all pages.
   Mini-feature 1: Navigation Bar
   Full Description A bar present on every page that helps visitors move around the site.
   How It Works
   The visitor sees the navigation bar on any page.
   Clicking a link takes them to that section of the Home page or to the All Projects page.
   Edge Cases / Errors
   On small screens, the links collapse into a menu so the bar does not overflow.
   When the visitor is on another page, such as All Projects, links to Home sections take them back to the Home page at that section.
   Mini-feature 2: System Theme
   Full Description The site follows the visitor's device setting: dark when their system is in dark mode and light when it is in light mode. There is no toggle on the site.
   How It Works
   The visitor opens the site.
   The site reads the system's dark or light setting and shows the matching theme.
   If the visitor changes the system setting while on the site, the theme changes with it.
   Edge Cases / Errors
   If the device does not report a preference, the site shows the light theme.
   Both themes keep text readable against the background.
   Mini-feature 3: Animations
   Full Description Smooth animations that make the site feel responsive: when the page loads, when sections appear as the visitor scrolls, and when moving between pages. They stay simple so the site looks clean, not busy.
   How It Works
   The visitor opens a page and its content animates in.
   As the visitor scrolls, each section animates in when it comes into view.
   Edge Cases / Errors
   If the visitor has reduced motion turned on in their device settings, animations are reduced or turned off.
   If an animation fails to run, the content still shows normally.
   Type: Flow
   Contact Form (sits in the Contact Me section at the bottom of the Home page)
   Step 1: Fill Out Form
   Full Description The visitor enters their name, email, and message in the Contact Me section. The form collects what you need to read and answer them.
   How It Works
   The visitor scrolls to the Contact Me section.
   They type their name, email, and message.
   Edge Cases / Errors
   Fields left empty are marked as required.
   A very long message is accepted up to a set length, and the form tells the visitor if they go over.
   Step 2: Submit
   Full Description The visitor sends the form. The site checks the fields before sending anything, so you only receive complete, valid messages.
   How It Works
   The visitor clicks the send button.
   The site checks that every field is filled and the email looks valid.
   If the check passes, the form is sent to the Next.js API route.
   Edge Cases / Errors
   If a field is empty or the email is invalid, the form is not sent and the visitor sees which field needs fixing.
   If the visitor clicks send twice, the second click is ignored while the first is sending.
   Messages that look like spam are not sent.
   Step 3: Send Email
   Full Description A Next.js API route receives the message and sends it to your Gmail through Resend. The visitor's email is set as the reply-to, so you can answer them directly from Gmail.
   How It Works
   The API route receives the name, email, and message.
   It sends an email to your Gmail through Resend, with the visitor's email as the reply-to.
   It returns success or failure to the page.
   Edge Cases / Errors
   If Resend fails or the connection drops, the route returns an error and nothing is lost silently.
   If the API key is missing or wrong, the visitor sees the same error as any other failure and the problem shows in the server logs.
   Step 4: Confirmation
   Full Description The visitor is told whether their message went through, so they know whether to wait for a reply or try again.
   How It Works
   If sending worked, the visitor sees a "message sent" confirmation.
   If sending failed, the visitor sees an error message and their typed text is kept so they can try again.
   Edge Cases / Errors
   After a successful send, the fields are cleared so the same message is not sent twice by accident.
   If sending failed, the message suggests trying again and keeps the form usable.
4. Platform
   Website, built with Next.js. A Next.js API route handles the contact form. Solo build.
5. Tech Stack
   Next.js (pages and API route)
   Resend (sends contact form emails to Gmail)
   JSON / MDX files in the repo (all site content)
6. Data
   Everything lives as JSON / MDX files in the repo, edited in code, with no database.
   Profile: About Me text, social links, and the resume PDF.
   Timeline entries: each has a type (work, school, career, certification, or achievement), title, place, dates, and description.
   Projects: each holds its title, short description, category, full details, all of its pictures, its links, and its downloadable files. Two flags mark whether the project is featured on the Home page and whether it is the best project of its category. Each project belongs to one category.
   All Projects intro: the short explanation shown in the Projects Hero.
   Tech stack items: each holds a name and icon.
   Contact messages: not stored. They are sent as email only.
   Theme: not stored. It comes from the visitor's system setting.
7. Accounts and Roles
   No accounts. The site has no login and no admin page, because all content is edited in the repo by you. Visitors can view everything, download the resume and project files, and send a message through the contact form.
8. UI / Visual Style
   Simple and clean with animation. The theme follows the visitor's system dark or light mode. Built so the design can be improved or restyled later without rewriting the content.
9. Target Users
   Anyone who wants to know what you do: recruiters and employers, freelance clients, and schools or scholarship reviewers. They want to quickly see your background, achievements, and projects, and to be able to contact you.
