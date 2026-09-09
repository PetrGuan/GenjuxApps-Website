# Plan

## Confirmed behavior

- English is the default; Simplified Chinese is selected explicitly, not from
  browser language or geolocation.
- Preserve existing English URLs. Chinese equivalents use `/zh/...`.
- Remember the selection locally across the main site and all product pages.
- Chinese blog pages retain an English article when no Chinese translation is
  available, with a visible untranslated-content notice.
- Localize navigation, content, accessibility labels, metadata, product summaries,
  legal/support pages, and existing static product documents. Keep real screenshots,
  brand names, public contacts, currencies, and App Store region URLs intact.

## Approach

Use explicit locale props in shared renderers and build both language versions
statically. English and Chinese root layouts provide the correct document language
without request headers, middleware, or locale negotiation. Existing English routes
remain in an English route group; Chinese routes share translated renderers.

One routing helper handles locale prefixes, legacy Bebilog locale URLs, and the
deployment base path. One small browser script remembers manual choices and uses
declared alternate links to restore a preference. It does not translate the DOM,
detect browser language, or upload preferences for analytics. Hosting still
receives the ordinary requested page URL.

Reuse next-intl and existing Bebilog translations. Existing plain-HTML product
pages retain their designs and gain deterministic, build-time Chinese translations,
the same preference mechanism, and localized links to the rest of the site.

Add a site-wide global not-found document only as required by Next's documented
multiple-root-layout architecture. All original product URLs and legal documents
remain reachable.

## Validation and boundaries

Build root-domain and repository-base-path exports and inspect localized page
coverage, alternate URLs, language markers, and internal links. Do not run tests,
add UI/E2E tests, change native app projects, deploy, commit, or push.
