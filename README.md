# Genjux Apps

The public product studio for Genjux’s independent Apple-platform apps.

## Products

- **Bebilog** — a private baby tracker for iOS, with on-device Smart Log, everyday care records, and insights.
- **Nautilus** — a quiet native reader for Hacker News on iOS and iPadOS, with on-device summaries, private briefings, and offline reading.

## Studio content

The home page also presents Genjux’s capabilities, selected work, experience, open-source contributions, and an invitation to work with the studio. Its factual material is adapted from a local source portfolio and expressed in Genjux’s own visual language without personal identity or original-site styling.

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

The project uses Next.js static export, so deploy the generated `out/` directory to a static host such as GitHub Pages, Cloudflare Pages, or Vercel.

## Product routes

- `/apps/bebilog` — Bebilog’s English site.
- `/apps/bebilog/en` and `/apps/bebilog/zh` — Bebilog locale routes.
- `/apps/nautilus/index.html` — Nautilus’s original static site.
- `/apps/nautilus/editions.html` — Nautilus’s original Editions page.

## Product source and assets

The two product sites are copied from their respective local sibling projects.

The Genjux product-card previews live in `public/products/`. Bebilog’s migrated source and media are in `components/bebilog/` and `public/apps/bebilog/`; Nautilus’s original static documents and media are in `public/apps/nautilus/`. Update these copies deliberately when their source marketing sites change.
