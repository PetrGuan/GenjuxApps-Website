# Plan

## Problem

The Lumadio product is present after the latest website update, but its catalogue and product pages still use an outdated SVG mark instead of the current application icon.

## Proposed approach

Import Lumadio's current 1024×1024 AppIcon asset and use it for every Lumadio icon surface in this site.

## Files likely involved

- `public/apps/lumadio/app-icon.png`
- `public/apps/lumadio/icon.svg`
- `lib/products.ts`
- `components/lumadio/lumadio-site.tsx`
- `tests/components/lumadio-site.test.tsx`

## Implementation steps

1. Pull the current website changes.
2. Copy the current Lumadio AppIcon from the Lumadio source project.
3. Replace all product and page references, remove the obsolete SVG, and validate the export.

## Validation

Run Lumadio component tests, lint, and the static build.

## Risks and open questions

None.
