# Genjux Dark Precision Redesign

## Goal

Rebuild the Genjux studio portal home page around the approved Stitch “Dark Precision” reference while preserving the existing product content, English copy, routes, accessibility, and standalone Bebilog and Nautilus product sites.

## Visual System

- Use a pure-black to blue-black field with a nearly invisible 32px technical grid.
- Use Inter for display and body typography, JetBrains Mono for metadata, navigation, filters, and tags.
- Use #0066ff only for primary controls, active filters, focus, and restrained hover emphasis; soft violet is a secondary detail only.
- Replace the coral/amber glass aesthetic with dark tonal surfaces, 1px hairline borders, 4px controls, 12px panel corners, and a 1200px desktop grid.
- Product cards use a subtle top-light gradient and a small blue border glow on hover, without layout displacement.

## Portal Layout

1. A sticky, compact header with the Genjux wordmark, existing studio routes, and the existing command-palette trigger.
2. A centered hero reading “Genjux” and “Carefully built independent software.”
3. A sticky, keyboard-accessible category filter for All, Productivity, Games, and Utilities.
4. An asymmetric Bento product matrix: Bebilog occupies the prominent wide panel; Nautilus occupies the companion panel. The app cards retain existing names, descriptions, tags, images, and destination routes.
5. A three-column studio information rail: capabilities, Experience behind Genjux, open-source contributions, and the existing contact CTA. It retains only existing studio content; it does not restore Selected Work.
6. A precise, low-contrast footer that retains the existing links and legal/status content.

## Interaction and Accessibility

- Filters are client-side buttons with `aria-pressed`; Productivity includes Nautilus, Utilities includes Bebilog, and Games presents a truthful empty state rather than an invented product.
- Filter transitions use existing Motion support or a short CSS opacity/reflow transition and respect reduced-motion settings.
- Product cards use real anchors to their existing routes, keyboard focus rings, accurate alt text, and semantic headings.
- The portal remains statically exportable. The standalone product pages retain their existing design and behavior.

## Verification

- Unit coverage proves filtering and route preservation.
- Browser coverage proves the filter controls, Bento product links, and retained studio headings are visible.
- Lint, unit tests, static build, and Playwright all pass.
