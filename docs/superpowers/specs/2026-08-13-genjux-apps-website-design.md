# Genjux Apps Website — Design

## Goal

Build the public home for Genjux’s independent, native Apple-platform apps. The site will introduce the studio, present Bebilog and Nautilus as distinct products, and direct visitors to product-specific pages and their App Store listings.

The visual baseline is the approved Stitch concept in `/Users/petr/Downloads/stitch_petr_guan_product_studio`: a dark “laboratory cinematic” product studio with a 12-column grid, translucent glass surfaces, technical metadata, and restrained, purposeful motion.

## Scope

The first release contains these static routes:

- `/` — studio home and product selector.
- `/apps/bebilog` — Bebilog product overview and App Store CTA.
- `/apps/nautilus` — Nautilus product overview and App Store CTA.
- `/about` — short studio/developer statement.
- `/changelog` — initial product release notes, authored locally.
- `/contact` — contact path and external links.

The site has no database, authentication, analytics, forms backend, or server-side API in this release. App Store, privacy, and support links are external destinations.

## Technology

- Next.js 16, React 19, and TypeScript.
- Tailwind CSS 4 for the tokenized visual system and responsive layout.
- Framer Motion for page reveal, hover, palette, and card interactions.
- React Three Fiber only for the optional hero “product constellation”, dynamically loaded on capable desktop browsers.
- A single client-side canvas shader component for the atmospheric hero background, disabled when WebGL is unavailable or motion is reduced.
- Static export via `output: "export"`, preserving deployment portability across GitHub Pages, Cloudflare Pages, and Vercel.

All visuals are local first-party assets copied or referenced from the existing Bebilog and Nautilus websites. No stock imagery or third-party tracking scripts are used.

## Information Model

A typed `products` data module is the source of truth for product copy and links. Each product record supplies its name, route, App Store URL, platform label, tagline, key capabilities, accent tokens, and artwork paths.

Page templates consume product records rather than duplicating product facts. Bebilog uses coral with soft yellow/lavender support; Nautilus uses muted ivory, amber, and blue-grey accents. The surrounding studio system remains near-black and neutral.

## Home Page

1. Fixed top navigation: studio wordmark, product/about/changelog/contact links, language-ready affordance, and a `⌘ K` trigger.
2. Hero: headline “Small apps. Deeply considered.”, short studio statement, contextual metadata, and the optional product constellation.
3. Product palette: keyboard-accessible selector for Bebilog and Nautilus; `1` and `2` select an item only when the palette has focus/open state.
4. Asymmetric product cards: Bebilog occupies seven desktop columns and Nautilus five. Each carries real app artwork, product-specific ambient details, capability tags, and a visible route CTA.
5. “Built with intent” strip: Native-first, On-device AI, Privacy by design, and No trackers.
6. Footer: product and studio links, copyright, and an unobtrusive independent-builder status label.

## Product Pages

Each product page follows the shared shell while allowing its own tone.

- **Bebilog:** intelligent baby tracking, twelve record types, on-device Smart Log, insights, privacy-first storage, and the iOS App Store CTA.
- **Nautilus:** quiet Hacker News reading, on-device thread summaries, Private Briefing, Story Rules, Radar, offline reading, privacy posture, and the iOS App Store CTA.

Product information must remain truthful to the existing marketing sites. Claims, pricing, and availability are stored in product content data, making changes explicit and reviewable.

## Component Boundaries

- `SiteShell`: header, command palette, shared background and footer.
- `ProductCard`: reusable home-page card with product-specific visual slot.
- `ProductHero` and `ProductFeatureGrid`: product page composition over structured product data.
- `Constellation`: lazy client-only 3D hero enhancement; never required for content access.
- `AtmosphereCanvas`: client-only background shader with a static CSS fallback.
- `MotionSafe`: centralized reduced-motion behavior for Framer Motion and visual enhancements.

## Responsive, Accessibility, and Failure Behavior

The desktop layout uses twelve columns above 1024px, eight at tablet widths, and four on mobile. Product cards stack on mobile; the command palette becomes a compact, fully keyboard-operable selector.

All routes must be usable without JavaScript beyond normal navigation. Canvas/3D failure produces a static layered glow, never an empty hero. Motion respects `prefers-reduced-motion`; keyboard shortcuts do not capture typing in inputs; semantic landmarks, descriptive image alt text, visible focus states, and sufficient contrast are required.

## Verification

- `npm run lint` completes with no errors.
- `npm run build` completes and emits the static export.
- Manual responsive review at mobile, tablet, and desktop widths.
- Keyboard checks for navigation, product palette, focus visibility, and external links.
- Reduced-motion and disabled-WebGL fallback checks.
- Production build visual review against the Stitch composition, while using real product artwork and avoiding duplicate generated canvas IDs.

## Deferred Decisions

- Exact deployment host and custom domain.
- Whether the public release begins bilingual; routes and content are structured to allow localization without shipping it prematurely.
- A future contact-form provider, if email/contact links are insufficient.
