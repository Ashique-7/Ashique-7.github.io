# AKM Azimul Ashique Khan — Portfolio

This is a personal portfolio website showcasing my projects and achievements.

**Live site:** [https://ashique-7.github.io](https://ashique-7.github.io)

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev)
- Plain CSS with a small custom design system (`src/index.css`) — no UI framework
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Adding content

All content lives in JSON under `src/data/` — components never need to change:

- `src/data/profile.json` — name, tagline, bio, contact links
- `src/data/projects.json` — array of `{ title, description, tags, link, date, featured }`
- `src/data/achievements.json` — array of `{ title, description, date, category }`

To add a new project or achievement, just add an object to the relevant array. Set `"featured": true` on a project to show it in the highlighted section.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages. See the repo's **Settings → Pages** — Source should be set to "GitHub Actions".
