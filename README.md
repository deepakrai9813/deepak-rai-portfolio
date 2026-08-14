# Deepak Rai — Full-Stack Developer Portfolio

A bold, high-contrast portfolio website inspired by the [Alexfolio](https://dribbble.com/shots/26873011-Free-Alexfolio-Portfolio-template) template (Volt.Supply). Built with **React + Vite + Framer Motion**.

![Stack](https://img.shields.io/badge/React-19-blue) ![Stack](https://img.shields.io/badge/Vite-6-purple) ![Stack](https://img.shields.io/badge/Framer%20Motion-12-lime)

## Features

- Big, bold typography (Space Grotesk + Inter)
- **Dark / light theme** with toggle and persisted preference
- Smooth scroll-reveal animations + scroll progress bar (Framer Motion)
- Rotating role headline, ambient background glows
- Real projects from [GitHub](https://github.com/deepakrai9813) with CSS-built UI previews + scroll parallax
- **Live GitHub activity strip** — fetches your most recent repos from the GitHub API
- Testimonials section, branded preloader, Lenis smooth scrolling
- Working contact form (composes a prefilled email), copy-to-clipboard email
- Downloadable CV (`public/Deepak-Resume.pdf`), OG share image (`public/og-image.png`)
- Full-stack + AI integration skills section
- Fully responsive with mobile menu
- SEO meta tags, `prefers-reduced-motion` support

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run preview # preview the production build
```

## Customizing

| What | Where |
| --- | --- |
| **Photo** | Replace `public/deepak-rai.png` (keeps the same name) or update the `src` in `src/components/Hero.jsx` and `src/components/About.jsx` |
| **Projects** | `src/components/Works.jsx` — the `PROJECTS` array (title, repo link, live demo, description, tags). Previews are CSS-built in `src/components/ProjectPreview.jsx` (`bian / leadfinder / debe` variants); swap in real screenshots anytime |
| **Skills** | `src/components/Skills.jsx` — the `SKILLS` array (includes the AI & ML Integration card) |
| **Bio / stats** | `src/components/About.jsx` |
| **Contact / socials** | `src/components/Contact.jsx` + `src/components/Footer.jsx` — GitHub, LinkedIn & email (`deepakkumar740@gmail.com`) all point to your real profiles |
| **Rotating roles** | `src/components/Hero.jsx` — the `ROLES` array |
| **Accent color & theme** | `src/index.css` — `--accent` and the `[data-theme]` variable blocks |
| **Marquee items** | `src/components/Marquee.jsx` |

## Deploying

Build with `npm run build` and host the `dist/` folder anywhere — GitHub Pages, Netlify, Vercel, or any static host. Asset paths are relative, so subpath hosting (e.g. `user.github.io/repo/`) works out of the box.

## Project structure

```
public/
  deepak-rai.png      # your photo
  favicon.svg
src/
  index.css           # design system: tokens, themes, components
  App.jsx             # page composition
  components/         # Nav, Hero, Marquee, About, Skills, Works, Contact, Footer…
  hooks/useTheme.js   # dark/light theme logic
```
