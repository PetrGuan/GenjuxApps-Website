# Implementation

Implemented site-wide English/Simplified-Chinese support. Ready for review.

## Summary

- English remains the first-visit default, including when the browser's locale is
  Chinese. No browser-language or geolocation negotiation was added.
- Existing English URLs remain unchanged. Chinese equivalents use `/zh/...`.
- Every canonical main-site and in-repository product HTML page has an EN / 中文
  control, localized content/accessibility labels, and language-alternate links.
- The user's explicit selection is remembered in local browser storage across
  Next-rendered and static product pages. Switching preserves query and fragment.
- Added complete Chinese main-site, Lumadio, NeoWriter, Nautilus, and Pixel Wonders
  content, including their existing in-repository legal/support pages. Reused
  Bebilog's Chinese messages and unified its language control.
- Chinese blog pages show the English original with a visible untranslated-content
  notice when no published Chinese translation exists. The body retains its actual
  content-language marker. Chinese About content supports the same explicit fallback.
- Brand names, public contacts, real screenshot pixels, currencies, and App Store
  region URLs remain unchanged. Separately hosted external policies/services keep
  their own language handling rather than having guessed locale URLs.

## Files changed

- `app/(english)/`: existing English routes moved into a route group without URL changes.
- `app/(chinese)/zh/`: Chinese static route renderer and localized RSS endpoints.
- `app/global-not-found.tsx`, `components/root-document.tsx`: correct document
  languages across separate roots and a small bilingual unmatched-route page.
- `components/catalog/`, `components/neowriter/`, `components/lumadio/`: shared
  explicit-locale renderers, localized copy, metadata, and product shells.
- Shared navigation, cards, blog, social, and Bebilog language components.
- `i18n/routing.mjs`, declarations, page-route registry, catalogue translations,
  Lumadio messages, and static-product dictionaries.
- `public/site-language.js` and `.css`: shared language control/preference runtime.
- `scripts/prepare-localized-static.mjs`: strict, deterministic jsdom generation
  of six Chinese static HTML pages into ignored `public/zh/`.
- Static English product sources: language controls/alternates and the relevant
  browser-preference privacy disclosures.
- Content/RSS helpers, optional translation data, post/announcement language markers.
- Build index preparation, npm dev/build hooks, README, and existing/new unit assertions.

The existing next-intl and jsdom dependencies were reused; no dependencies were
added. The installed Next.js documented `globalNotFound` option is enabled because
multiple root layouts cannot share the former top-level not-found layout.

### Content maintenance

Chinese blog translations live under `content/blog/zh/` with matching English slug
and publication date. Draft/future English originals cannot be published by a
translation. `content/about.zh.md` holds the Chinese introduction.
Announcements can provide `translations.zh`; supporter group labels can use
`groupZh`. Missing owned-content translations are identified, not fabricated.

Shared assets stay at their original paths. Static dictionaries fail generation
when translations are missing or stale, rather than silently leaving English text
in a Chinese UI. Locale helpers prevent duplicate deployment prefixes and preserve
media URLs. Legacy `/apps/bebilog/en` and `/apps/bebilog/zh` remain usable and lead
to their canonical English/Chinese equivalents.

## Validation

Successful builds:

```bash
SITE_ORIGIN=http://127.0.0.1:3100 npm run build
SITE_ORIGIN=https://petrguan.github.io NEXT_PUBLIC_BASE_PATH=/GenjuxApps-Website npm run build:pages
```

Both configurations generated 54 Next static outputs plus the existing/static
product copies. Inspected 46 canonical English/Chinese HTML pages across the
framework and static sites for document language and matching language-switch
targets. Base-path inspection found no unprefixed local image/script/stylesheet
URLs. The final build restores root-hosted output and root-hosted generated
Chinese static files for the current local preview.

Using an isolated browser with a Chinese browser locale, the first English URL
remained English. Manual Chinese selection preserved query/fragment, persisted
across Lumadio, NeoWriter, Nautilus, and Pixel Wonders, and switched back to
English correctly. Both legacy Bebilog locale URLs reached the intended canonical
counterpart. Desktop/mobile layouts were inspected; Bebi's existing entry
animations were allowed to settle before capture.

No test runner or linter was executed. Unit assertions were added/updated for
locale routing, content fallback, metadata, and UI bindings for the owner to run.
Vitest's server-only marker is mapped to a test-only no-op for isolated helper
coverage; production server-only boundaries are unchanged.

No native app project was modified, and no new persistent server was started.
The already-requested local preview remains available.

## Blockers
None for the requested in-repository pages. This task does not translate external
destinations (for example App Store pages or separately hosted Bebi policies) or
alter text embedded inside the owner's real app screenshots.

No commits, pushes, or deployments were performed.
