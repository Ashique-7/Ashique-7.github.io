# AI Tool Usage Log
Tool used: Claude Code

## Session 1 — [18/07/2026]
Prompt:
I'm building a portfolio website for a university assignment. Set this up as a Vite + React project intended to deploy on GitHub Pages via GitHub Actions.

CONTEXT
- I'm a student in my 4th semester, so this needs to be easy to extend with new projects, achievements, and writing over the next 2+ years without touching layout code.
- Visual style: visually fancy, custom design with tasteful animations — not a generic template. I want it to feel intentional and distinct, not like a default Bootstrap/Tailwind starter.

STEP 1 — Design system first
Before writing any components, propose a small design system: color palette, one display font + one body font (from Google Fonts), spacing scale, and a general visual direction (e.g. dark mode, editorial, brutalist minimal, etc. — pick something that supports "fancy but clean"). Show me this before building components so everything stays consistent.

STEP 2 — Project structure
Set up this structure:
- src/data/profile.json — name, tagline, bio, email, github, linkedin
- src/data/projects.json — array of {title, description, tags, link, date, featured}
- src/data/achievements.json — array of {title, description, date, category} (category covers academic, research, competitions, etc.)
- src/components/ — Hero, About, Projects, Achievements, Contact, Footer as separate components
- All components should read from the JSON data files, not hardcode content. This is important — I need to be able to add a new project by editing JSON only.

STEP 3 — Sections to build
- Hero: name, tagline, short intro
- About: bio + photo placeholder
- Projects: card grid, pulling from projects.json, with a "featured" section for highlighted work
- Achievements: pulling from achievements.json, grouped by category
- Contact: email, GitHub, LinkedIn links (from profile.json), clearly visible
- Footer: simple, maybe a copyright line

STEP 4 — Animation
Add subtle, purposeful animation: scroll-triggered fade/slide-ins for sections, a small hero entrance animation, hover states on project cards. Use CSS transitions/keyframes where possible; only pull in a library (like Framer Motion) if it meaningfully simplifies things. Don't over-animate — it should feel polished, not busy.

STEP 5 — Deployment
Configure vite.config.js with the correct base path for GitHub Pages, and add a GitHub Actions workflow (.github/workflows/deploy.yml) that builds and deploys to GitHub Pages on push to main. Tell me what I need to change in my GitHub repo settings to make this work.

STEP 6 — Housekeeping files
Also create:
- .gitignore (node_modules, dist, .env, .DS_Store)
- A README.md stub with placeholders for project name, description, and live link

Please explain each major decision briefly as you go (design choices, why a library is used, etc.) so I understand the codebase, since I'll need to keep extending it myself.

## Session 1 — [18/07/2026]
Prompt:

I want to add polished scroll-based animations to the site, similar to what you'd see on awwwards.com-style portfolios. Please:

1. Install and set up Framer Motion for scroll-triggered animations (or GSAP + ScrollTrigger if you think it's better suited — your call, but explain why).
2. Add scroll-reveal animations to each section (Hero, About, Projects, Achievements, Contact) — elements should fade in and slide up slightly (20-30px) as they enter the viewport, with a slight stagger if there are multiple items (like project cards).
3. Add a subtle parallax effect to the hero section background so it moves slightly slower than the scroll speed.
4. Consider adding Lenis for smooth scrolling site-wide, if it doesn't conflict with the above.
5. Keep animation duration and easing consistent across the site (define these as constants/config, not repeated inline) so it feels cohesive.
6. Make sure animations don't block content from being visible if JavaScript fails to load or on slow connections — content should be visible by default, animation is progressive enhancement.

Explain briefly what each library is doing so I understand how to add similar animations to new sections later.
