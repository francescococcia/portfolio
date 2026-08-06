# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal cybersecurity portfolio for Francesco Coccia — a single-page static site built with Astro v4 + React islands, deployed on Vercel. Dark "hacker terminal" aesthetic (JetBrains Mono + Inter, green `#00ff9d` / purple `#7b61ff` / red `#ff4560` accents on near-black).

## Commands

```bash
npm run dev      # dev server → http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

There are no tests or linters configured.

## Architecture

- **Single page**: `src/pages/index.astro` composes all section components in order: Nav → Hero → About → Skills → Experience → Projects → Hackathons → CTFLabs → Education → Contact. Sections are separated by `.divider` elements.
- **Content lives in `src/data/portfolio.json`** (personal info, summary, experience, education, skills, projects, certifications). Components import it directly. **Exceptions (hardcoded in components, not JSON)**: CTF platform cards and focus areas in `CTFLabs.astro`, the stat cards and status/languages details in `About.astro`, typing phrases in `Hero.astro`, nav links in `Nav.astro`. When updating content, check both the JSON and the component.
- **Almost everything is zero-JS Astro components** with scoped `<style>` blocks. The only React island is `src/components/ExperienceItem.tsx` (`client:load` in `Experience.astro`) for expand/collapse; its styles are in `ExperienceItem.css`, not a scoped block.
- **Vanilla `<script>` tags** handle the rest of the interactivity: typing effect in `Hero.astro` (uses `define:vars`), scroll/hamburger behavior in `Nav.astro`, and a global IntersectionObserver in `Layout.astro` that adds `.visible` to `.reveal` elements (scroll-triggered fade-in). To animate a new element, give it class `reveal` (optionally a `transition-delay` inline style for stagger).
- **Design tokens** are CSS custom properties in `src/styles/global.css` (`--bg-*`, `--accent-*`, `--font-mono/body`, `--section-gap`), alongside shared utility classes: `.container`, `.section-label`, `.section-title`, `.btn`/`.btn-primary`/`.btn-outline`, `.badge`, `.card`, `.reveal`, `.prompt`. Use these instead of re-inventing per-component styles.
- **SEO/OG meta** is in `src/layouts/Layout.astro` (accepts optional `title`/`description` props; canonical URL is hardcoded to `https://francescococcia.dev`).

## Conventions

- CSS class naming is BEM-ish per component: `.hero__name`, `.nav__link--open`, etc.
- Link fields in `portfolio.json` are stored **without scheme** (`github.com/...`, `linkedin.com/in/...`); components prepend `https://`.
- External links get `target="_blank" rel="noopener noreferrer"`; decorative elements get `aria-hidden="true"`.
- Mobile breakpoints: 768px is the primary one (nav hamburger, single-column layouts); Projects grid also steps at 900px/600px.

## Known gaps (as of 2026-08)

- The canonical URL in `Layout.astro` points to `https://francescococcia.dev`, a domain Francesco does **not** own yet. Once the Vercel project is connected, switch to the real production URL (ideally via `site` in `astro.config.mjs` + `Astro.site`) and make the `og:image` URL absolute at the same time.
- **No CV download by deliberate choice** — the portfolio itself is the CV. Don't re-add a CV button without asking.
- Repo: `github.com/francescococcia/portfolio` (public). Public contact email is intentionally the hotmail one in `portfolio.json`.
- `skills.databases`, `achievements`, and `spoken_languages` in `portfolio.json` are not rendered anywhere (About hardcodes languages).
- Hackathons section is intentionally minimal for now (name + date only, per Francesco); richer fields (project, placement, links) come later.
