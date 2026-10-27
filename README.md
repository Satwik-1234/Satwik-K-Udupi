# Satwik K. Udupi — portfolio & Pravaha Tattva Solutions

Two sites in one repo, one deployment (GitHub Pages):

| Route | What |
| --- | --- |
| `/` | Personal portfolio — "editorial cartography" design |
| `/pravaha-tattva` | Company site for Pravaha Tattva Solutions (same system, indigo/gold identity) |

**Stack:** Vite · React · TypeScript · Tailwind (utilities) · framer-motion · Lenis smooth scroll · raw WebGL (the hero contour map).

## Run

```sh
npm ci
npm run dev      # http://localhost:8080/Satwik-K-Udupi/
npm run build
```

## Where things live

- `src/atlas/` — the design system and all sections (`AtlasShell`, `ContourField` WebGL map, `sections/*`)
- `src/styles/atlas.css` — tokens (paper / ink / water / signal) and base components
- `src/data/portfolio.ts` — **all content**: projects, experience, maps, certifications, contact details
- `src/lib/hydrocast.ts` — Hydrocast data adapter

## Adding work

- **New public map:** drop a `.webp` in `src/assets/maps/`, add an entry to `maps` in `src/data/portfolio.ts`.
- **New case study:** add an object to `plates` (and its maps).
- **Government / confidential work:** add to `redacted` — list only what is cleared for public view.

## HydroCast live data

The HydroCast panel reads the real forecast from the public repository
[`satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast`](https://github.com/satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast)
(`data/runs/runs_index.json` + the latest `CYC_*.json`) via GitHub's raw CDN — no backend or API key.
If GitHub is unreachable it falls back to a clearly labelled demo series. See `src/lib/hydrocast.ts`.

## Share card

`public/og.jpg` is the social-preview image (1200×630). Update the `og:image` URL in `index.html` if you use a custom domain.
