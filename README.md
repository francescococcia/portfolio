# Francesco Coccia — Cyber Security Portfolio

Personal portfolio website built with Astro + React islands, deployed on Vercel.

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → import your repo
3. Vercel auto-detects Astro — no config needed (vercel.json is already set)
4. Every push to `main` triggers an automatic redeploy

## Updating Content

All content lives in one file:

```
src/data/portfolio.json
```

Edit this file to update experience, skills, projects, certifications, or personal info. The site rebuilds automatically on Vercel when you push changes.

## Project Structure

```
├── public/
│   ├── favicon.svg
│   └── og-image.png        ← Social share preview (OG/Twitter card)
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Experience.astro
│   │   ├── ExperienceItem.tsx  ← React island (expand/collapse)
│   │   ├── Projects.astro
│   │   ├── ProjectCard.astro
│   │   ├── Hackathons.astro
│   │   ├── CTFLabs.astro
│   │   ├── Education.astro
│   │   ├── Contact.astro
│   │   └── Nav.astro
│   ├── data/
│   │   └── portfolio.json      ← Edit this to update content
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── vercel.json
└── package.json
```

## Tech Stack

- [Astro v4](https://astro.build) — static site framework
- [React](https://react.dev) — interactive islands (experience expand/collapse)
- [Vercel](https://vercel.com) — hosting & CI/CD
