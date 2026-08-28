# Genjux Apps Catalogue

The public product catalogue for Genjux software.

## Products

- **Bebilog** — a private baby tracker for iOS, with on-device Smart Log, everyday care records, and insights.
- **Nautilus** — a quiet native reader for Hacker News on iOS and iPadOS, with on-device summaries, private briefings, and offline reading.
- **Pixel Wonders** — a nature observation and pixel-painting game for iPhone.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run test:e2e
```

`npm run build` writes the static production site to `out/`.

## Deployment

Pushes to `main` automatically build and deploy the static export through GitHub Actions to GitHub Pages:

<https://petrguan.github.io/GenjuxApps-Website/>

The workflow sets the repository base path and writes the generated site to `out/`. The regular `npm run build` command remains suitable for root-domain hosts; `npm run build:pages` prepares copied static product pages for a configured `NEXT_PUBLIC_BASE_PATH`.

## Product routes

- `/apps/bebilog` — Bebilog’s English site.
- `/apps/bebilog/en` and `/apps/bebilog/zh` — Bebilog locale routes.
- `/apps/nautilus/index.html` — Nautilus’s original static site.
- `/apps/nautilus/editions.html` — Nautilus’s original Editions page.
- `/apps/pixel-wonders/index.html` — Pixel Wonders’ product site.

## Product source and assets

The two product sites are copied from their respective local sibling projects.

The Genjux product-card previews live in `public/products/`. Bebilog’s migrated source and media are in `components/bebilog/` and `public/apps/bebilog/`; Nautilus’s and Pixel Wonders’ original static documents and media are in `public/apps/`. Update these copies deliberately when their source marketing sites change.
