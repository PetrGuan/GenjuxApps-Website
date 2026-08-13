# Genjux Apps

The public product studio for Genjux’s independent Apple-platform apps.

## Products

- **Bebilog** — a private baby tracker for iOS, with on-device Smart Log, everyday care records, and insights.
- **Nautilus** — a quiet native reader for Hacker News on iOS and iPadOS, with on-device summaries, private briefings, and offline reading.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

`npm run build` writes the static production site to `out/`.

## Deployment

The project uses Next.js static export, so deploy the generated `out/` directory to a static host such as GitHub Pages, Cloudflare Pages, or Vercel.

## Product assets

The committed assets in `public/products/` originate from these sibling projects:

- `/Users/petr/Documents/GitHub/bebilog-website`
- `/Users/petr/Documents/GitHub/nautilus-website`

They are first-party product artwork; update them deliberately when the source product marketing sites change.
