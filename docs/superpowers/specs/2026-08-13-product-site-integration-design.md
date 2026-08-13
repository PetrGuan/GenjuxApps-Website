# Product Site Integration Design

## Goal

Make Genjux the shared entry point while preserving each product’s real marketing site inside the same deployment. Selecting Bebilog or Nautilus on the Genjux home page must render the corresponding existing website implementation, rather than the simplified product pages currently in Genjux.

## Route Model

Studio pages continue to use the Genjux shell:

- `/`
- `/about`
- `/changelog`
- `/contact`

Product pages are isolated from that shell so they can retain their original visual systems:

- `/apps/bebilog` renders the existing Bebilog English site directly; static export does not require a server redirect.
- `/apps/bebilog/en` renders the existing Bebilog English site.
- `/apps/bebilog/zh` preserves the existing Chinese Bebilog site as an optional language route; English remains the default.
- `/apps/nautilus` renders the existing Nautilus site.
- `/apps/nautilus/editions` renders Nautilus’s existing Editions page.

The existing dynamic Genjux product-detail route (`/apps/[slug]`) is removed because it duplicates the sites it now hands off to.

## App Shell Boundary

The root layout retains only document-level concerns: fonts, viewport metadata, and global body setup. A `(studio)` route group owns the Genjux header and footer, so studio pages continue to look and behave as they do now.

Product routes sit outside that group and render without the Genjux header/footer. This prevents nested navigation, preserves the individual product brands, and keeps every route statically exportable.

## Bebilog Migration

Bebilog’s existing page structure, components, feature visualizations, English and Chinese message files, and first-party images are copied into a focused `components/bebilog` and `public/apps/bebilog` boundary. Its original Next-intl provider remains, with the selected route locale supplying messages.

The copied route does not create nested `html` or `body` elements. Instead, its existing root variables and body presentation are applied to a `.bebilog-site` boundary. Its Tailwind utility markup, animations, Apple Intelligence copy, pricing, App Store links, sticky CTA, and language toggle stay intact.

## Nautilus Migration

Nautilus’s existing `index.html`, `editions.html`, first-party screenshots, App Store badge, and icon are migrated into `components/nautilus` and `public/apps/nautilus`. Its visual CSS is scoped beneath `.nautilus-site`, preserving the quiet editorial layout and its own typography without leaking into the studio.

The existing sticky CTA behavior becomes a small client component; all reading content, sections, links, and Edition navigation remain in the static initial HTML. The internal Editions link changes only to `/apps/nautilus/editions`.

## Shared Data and Navigation

The Genjux product catalog remains the source of card metadata and is updated to use the new static destinations. Each product card remains a normal same-origin link, so it works without JavaScript. Product-specific content is not duplicated in Genjux’s prior detail-page component.

## Assets and Dependencies

Only the current first-party assets and source copy from these local projects are used:

- `/Users/petr/Documents/GitHub/bebilog-website`
- `/Users/petr/Documents/GitHub/nautilus-website`

`next-intl` is added because Bebilog’s existing implementation depends on it. No iframe, CMS, database, server API, analytics, or third-party visual asset is introduced.

## Accessibility, Failure Behavior, and Performance

Every product page has semantic landmarks, visible keyboard focus, image alt text from its source site, and regular anchor-based navigation. The Bebilog locale route rejects unsupported locales at build time. The Nautilus sticky CTA uses a non-JavaScript static fallback when client JavaScript is unavailable.

Product pages are generated during the existing Next static export. Animations respect the site-wide reduced-motion rule, and no product page relies on a server request at runtime.

## Verification

- Unit tests prove the product catalog points to `/apps/bebilog` and `/apps/nautilus`.
- The static build emits the English and Chinese Bebilog paths plus both Nautilus paths.
- Browser tests click both Genjux cards and verify the product page’s original title/content appears.
- Browser tests verify Bebilog defaults to English and the Nautilus Editions link stays inside Genjux.
- Visual review checks the product routes have no Genjux header/footer and preserve their source site’s intended hierarchy at desktop and mobile sizes.
