# Genjux Dark Precision Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved Stitch-inspired Dark Precision portal without changing the site’s product content or routes.

**Architecture:** A small client-side `ProductMatrix` owns category-filter state and renders existing `products` records. The server-rendered home page composes the hero, matrix, and existing studio content. Global CSS replaces the portal’s visual tokens and layout while leaving standalone product-site styles functional.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Framer Motion, Vitest, React Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-14-stitch-portfolio-redesign-design.md`

## Global Constraints

- Preserve all current product names, English descriptions, product routes, studio facts, and the removal of Selected Work.
- Do not use the Stitch example’s generated image URL, fabricated projects, fabricated copy, social links, or © 2024 line.
- Preserve Bebilog and Nautilus standalone product pages and their “Back to Genjux” behavior.
- Use Inter/JetBrains Mono, blue #0066ff primary actions, a black technical grid, outlined tonal surfaces, and no coral/amber portal accents.
- Keep the result accessible, responsive, static-exportable, and reduced-motion safe.

### Task 1: Add the interactive product matrix

**Files:**
- Create: `components/product-matrix.tsx`
- Modify: `lib/products.ts`
- Create: `tests/components/product-matrix.test.tsx`

- [ ] Write a failing test that clicks Utilities and finds only the Bebilog product link, then clicks Games and finds the truthful empty state.
- [ ] Run `npm run test -- tests/components/product-matrix.test.tsx` and observe the missing-component failure.
- [ ] Add `ProductCategory` metadata to existing product records and implement `ProductMatrix` with `aria-pressed` filters, existing product routes, and a Games empty state.
- [ ] Re-run `npm run test -- tests/components/product-matrix.test.tsx` and commit with `feat: add product matrix filters`.

### Task 2: Recompose the portal and studio rail

**Files:**
- Modify: `app/(studio)/page.tsx`
- Modify: `components/studio-capabilities.tsx`
- Modify: `components/studio-experience.tsx`
- Modify: `components/open-source-contributions.tsx`
- Modify: `components/studio-contact-cta.tsx`
- Modify: `tests/e2e/site.spec.ts`

- [ ] Write a failing browser assertion for the category filter, Bento product region, and retained Experience behind Genjux heading.
- [ ] Run `npm run test:e2e -- -g "Dark Precision portal"` and observe the expected failure.
- [ ] Replace the old hero, selector, intent strip, and card grid with the precision hero, `ProductMatrix`, and three-column studio rail. Preserve existing content and destinations.
- [ ] Re-run the focused browser test and commit with `feat: compose Dark Precision portal`.

### Task 3: Apply Dark Precision styling and validate responsive behavior

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `app/globals.css`

- [ ] Apply the approved tokens, header/footer hierarchy, 32px grid, Bento panels, responsive layout, filter states, and motion-safe hover effects.
- [ ] Run `npm run lint && npm run test && npm run build && npm run test:e2e`.
- [ ] Inspect desktop and mobile local preview in the browser; commit with `feat: restyle Genjux portal`.
