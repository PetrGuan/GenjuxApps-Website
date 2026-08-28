# Implementation

## Summary

Rebuilt the homepage as a product-only catalogue with a warm editorial visual system. Removed all homepage and navigation surfaces for personal/studio background, experience, capabilities, open-source work, contact, and the portrait. Added Pixel Wonders as the third product and locally hosted its product, support, privacy, and data-practices pages.

## Files changed

- Moved the root route group from `(studio)` to `(catalog)`.
- Rebuilt the homepage, header, footer, product matrix, and product cards.
- Removed studio information routes, components, data, portrait asset, obsolete 3D presentation components, and associated tests.
- Removed unused Three.js dependencies.
- Integrated Pixel Wonders from its local application and product-site projects, including its app icon and static pages.
- Replaced Pixel Wonders personal attribution with Genjux attribution and added return links to the catalogue.
- Updated metadata, README, component tests, and end-to-end expectations.

## Validation

- Targeted catalogue component tests pass.
- ESLint passes.
- The static production export builds successfully.
- Pixel Wonders' clean directory URL and its stylesheet and app icon all resolve from the production static server.

## Blockers

None.
