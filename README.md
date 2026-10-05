# Aadarsha Pokharel — Portfolio

Next.js (App Router) + TypeScript + Tailwind CSS v4, shipped with Docker.

## Run with Docker (recommended)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose).

```bash
docker compose up --build
```

Then open http://localhost:3000

Useful commands:

```bash
docker compose up -d --build     # run in the background
docker compose logs -f web       # follow logs
docker compose down              # stop and remove the container
```

### Hot-reload dev mode (edit code, see changes instantly)

```bash
docker compose --profile dev up --build dev
```

### Plain `docker` (no compose)

```bash
docker build -t portfolio .
docker run -d --name portfolio -p 3000:3000 portfolio
```

> The first build needs internet access: `next/font` downloads JetBrains Mono
> from Google Fonts at build time.

## Run without Docker

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Animations

Cinematic motion built with plain CSS + tiny hooks (no animation library):

| Effect | Where |
| --- | --- |
| Kinetic hero title (letters rise through a mask) + staggered entrance | `Hero.tsx`, `SplitText.tsx` |
| Drifting light orbs + scroll parallax / fade on the hero | `globals.css` (`.orb`, `.hero-parallax`) |
| Scroll progress bar, parallax values | `ScrollEffects.tsx` |
| Cursor spotlight | `CursorGlow.tsx` |
| Spotlight + 3D tilt cards | `SpotlightCard.tsx` |
| Magnetic buttons | `Magnetic.tsx` |
| Words light up as you scroll (About) | `ScrollFill.tsx` |
| Mask / fade / scale reveals on scroll | `Reveal.tsx` |
| Tech-stack marquee | `TechMarquee.tsx` |
| Nav hides on scroll down, returns on scroll up | `Nav.tsx` |

All motion respects `prefers-reduced-motion`, and cursor effects are disabled on
touch devices. Tweak speeds and easing in the "Motion system" block of
`app/globals.css`.

## Where to edit things

| What | File |
| --- | --- |
| All page copy: bio, skills, projects, links, email | `components/Portfolio/content.ts` |
| Intro timings, colors, boot-log lines, GitHub URL | `components/Intro/constants.ts` |
| Page order | `app/page.tsx` |
| SEO title / description | `app/layout.tsx` |

The intro plays once per browser tab session. To replay it, open a new tab or
clear `portfolio-intro-played` from sessionStorage.
