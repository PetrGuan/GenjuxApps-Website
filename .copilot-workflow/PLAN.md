# Plan

## Problem

The current homepage interleaves product discovery with studio capabilities, experience, open-source work, a portrait, and contact material. The site should become a product-only catalogue.

## Proposed approach

Create a focused catalogue homepage with a new product showroom visual system. Keep the Bebilog and Nautilus product pages and their download paths intact, while removing personal and studio-information routes, components, navigation, content data, and tests.

## Files likely involved

- `app/(catalog)/page.tsx`
- `app/(catalog)/layout.tsx`
- `app/globals.css`
- `components/site-header.tsx`
- `components/site-footer.tsx`
- `components/product-matrix.tsx`
- `components/product-card.tsx`
- related tests and `README.md`

## Implementation steps

1. Replace the homepage and shared shell with product-only catalogue content.
2. Remove personal/studio routes, components, data, and navigation.
3. Update the visual system, metadata, documentation, and tests.

## Validation

Run the targeted component tests, lint, and static production build.

## Risks and open questions

The existing Bebilog detail site shares the global stylesheet, so catalogue styles must be scoped to avoid changing its visual design.
