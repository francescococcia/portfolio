# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal cybersecurity portfolio for Francesco Coccia — a single-page static site built with Astro v4 (zero JS frameworks), deployed on Vercel. "Clean & modern" design system (2026-08 redesign): light-first with dark mode toggle, monochrome ink + one green accent, hairline rules, Geist + Geist Mono. Francesco's explicit taste: no themed gimmicks (no terminal theater, stamps, particles) — quiet professional design.

## Commands

```bash
npm run dev      # dev server → http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the production build locally

node scripts/og-image.cjs   # regenerate public/og-image.png (1200×630 social card)
```

There are no tests or linters configured.

## Deployment

Pushing to `main` deploys to production (https://francescococcia.vercel.app) via Vercel Git integration (project `website`). There is no staging — verify `npm run build` locally before pushing.

## Architecture

- **Single page**: `src/pages/index.astro` composes section components in order: Nav → Hero → Projects (`#work`) → Experience → Hackathons → Skills (`#skills`, titled "Toolbox") → Education → Contact.
- **Content lives in `src/data/portfolio.json`** (personal info, experience, education, skills, projects with `category`/`tagline`/`highlights`/`visual`, certifications, hackathons). **Exceptions (hardcoded in components)**: hero headline/pitch/fact-strip in `Hero.astro`, project SVG visuals in `ProjectCard.astro` (keyed by the JSON `visual` field: `extension`/`terminal`/`rank`), the in-progress certs row in `Education.astro`, nav links in `Nav.astro`, contact copy in `Contact.astro`.
- **100% zero-JS-framework Astro** with scoped `<style>` blocks — no React (removed in the redesign). Interactivity is vanilla `<script>` tags: theme toggle + mobile sheet in `Nav.astro`, `<dialog>` modal wiring in `Projects.astro` (cards carry `data-modal`, dialogs close via `[data-close]` or backdrop click), and a global IntersectionObserver in `Layout.astro` adding `.visible` to `.reveal` elements. To animate a new element: class `reveal` (+ optional inline `transition-delay` for stagger).
- **Theme system**: light is default; dark applies via `[data-theme="dark"]` on `<html>`. A FOUC-prevention inline script in `Layout.astro` head reads localStorage then `prefers-color-scheme` before paint; the Nav toggle persists to localStorage. All colors go through tokens — never hardcode hex in components.
- **Design tokens** in `src/styles/global.css`: colors (`--bg`, `--surface`, `--ink`, `--ink-2`, `--line`, `--accent`, `--accent-soft`, `--shadow`), fonts (`--font-sans` Geist, `--font-mono` Geist Mono), motion (`--dur-micro/ui/reveal`, `--ease-out`). Shared utilities: `.container`, `.sec-head`/`.sec-meta`, `.btn`/`.btn-fill`/`.btn-line`, `.chip`/`.chips`, `.reveal`, `.rails` (fixed full-height hairlines rendered in Layout).
- **SEO/OG meta + JSON-LD Person schema** in `src/layouts/Layout.astro` (canonical + absolute og:image derive from `Astro.site` in `astro.config.mjs`).

## Conventions

- CSS class naming is BEM-ish per component: `.hero__pitch`, `.nav__sheet--open`, `.pcard__viz`, etc.
- Link fields in `portfolio.json` are stored **without scheme** (`github.com/...`); components prepend `https://`.
- External links get `target="_blank" rel="noopener noreferrer"`; decorative elements get `aria-hidden="true"`.
- Motion: use the motion tokens; entrances ease-out 150–500ms; every animation must respect the global `prefers-reduced-motion` block in `global.css`.
- Mobile: primary nav breakpoint at 760px (pill collapses to burger + sheet); list rows (hackathons/education) stack at 600px.

## Gotchas

- A local git hook can re-commit/amend automatically (observed commit-hash churn right after committing). Verify `git log` after each commit.
- `.claude/` and `.claude-flow/` are local AI-tooling state, intentionally gitignored.
- The OG image text uses `tspan dx=` offsets for word spacing — librsvg (sharp's SVG renderer) collapses regular spaces and `&#160;` entities between tspans.
- The global `* { margin: 0 }` reset kills native `<dialog>` centering — `.pmodal` restores `margin: auto`. Keep that if adding new dialogs.
- The OG image (`scripts/og-image.cjs`) still renders the old dark-terminal style — regenerate to match the redesign when touching it.

## Known gaps (as of 2026-08)

- The production site is `https://francescococcia.vercel.app` (set as `site` in `astro.config.mjs`; `Layout.astro` derives canonical + absolute `og:image` from `Astro.site`). Francesco deliberately has no custom domain for now — if he buys one later, change `site` and connect it in Vercel.
- **No CV download by deliberate choice** — the portfolio itself is the CV. Don't re-add a CV button without asking.
- Repo: `github.com/francescococcia/portfolio` (public). Public contact email is intentionally the hotmail one in `portfolio.json`.
- `skills.databases`, `achievements`, `spoken_languages`, and `summary` in `portfolio.json` are not rendered anywhere after the redesign.
- Hackathons section is intentionally minimal for now (name + date only, per Francesco); richer fields (project, placement, links) come later.
- Planned enhancements not yet built: live TryHackMe/HackTheBox rank badges on the CTF project card, real GitHub repo link for CyberApply (currently points at the profile).
