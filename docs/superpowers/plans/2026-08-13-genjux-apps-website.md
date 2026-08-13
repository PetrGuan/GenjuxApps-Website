# Genjux Apps Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a static, accessible multi-page product studio for Genjux that presents Bebilog and Nautilus with the approved laboratory-cinematic visual system.

**Architecture:** A Next.js App Router site consumes a typed local product catalog to generate the home page and two product routes. Server-rendered page composition remains usable without JavaScript; client-only islands add the command palette, atmospheric canvas, and lazy 3D constellation. All first-party artwork lives under `public/products`, and `output: "export"` produces a host-neutral static bundle.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, React Three Fiber, Vitest, React Testing Library, Playwright.

## Global Constraints

- Use Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, and React Three Fiber; do not introduce a CMS, database, analytics SDK, form backend, or UI component framework.
- Configure `output: "export"` and `images.unoptimized: true`; the production output must not require a Node server.
- Preserve truthful product claims from the existing Bebilog and Nautilus websites; put product facts, routes, external URLs, and visual tokens in one typed module.
- Reuse only first-party assets from `/Users/petr/Documents/GitHub/bebilog-website` and `/Users/petr/Documents/GitHub/nautilus-website`.
- Every route must expose content and navigation without JavaScript; Canvas and 3D are progressive enhancements with CSS fallbacks.
- Respect `prefers-reduced-motion`, retain visible keyboard focus, use semantic landmarks, and do not globally capture `1` or `2` while a user is typing.
- The design is original work guided by the local Stitch concept, not a copied Raycast interface.

---

## File Structure

```text
app/
  about/page.tsx                 # Studio statement
  apps/[slug]/page.tsx           # Static Bebilog and Nautilus pages
  changelog/page.tsx             # Locally authored release notes
  contact/page.tsx               # Contact and external links
  layout.tsx                     # Fonts, metadata and shared shell
  page.tsx                       # Studio home
  globals.css                    # Tokens, grid, glass, motion fallback
components/
  atmosphere-canvas.tsx          # Safe WebGL atmospheric enhancement
  command-palette.tsx            # Accessible dialog and product navigation
  constellation.tsx              # Lazy React Three Fiber hero island
  home-hero.tsx                  # Home headline, ambient layers and CTA
  motion-safe.tsx                # Shared reduced-motion wrapper
  product-card.tsx               # Product card used by the home grid
  product-page-content.tsx       # Product page hero and capability content
  site-footer.tsx                # Shared footer
  site-header.tsx                # Shared navigation and palette trigger
lib/
  products.ts                    # Typed product catalog and lookup helpers
  routes.ts                      # Static studio navigation data
public/products/
  bebilog/                       # Bebilog icon, hero screenshot and badge
  nautilus/                      # Nautilus icon, hero screenshot and badge
tests/
  components/                    # React component behavior tests
  lib/                            # Catalog and route behavior tests
  e2e/                            # Browser navigation and accessibility checks
```

### Task 1: Create the static Next.js foundation and test tooling

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/setup.ts`
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `app/not-found.tsx`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: none.
- Produces: `npm run dev`, `npm run lint`, `npm run test`, `npm run test:e2e`, and `npm run build`; all later tasks use the `@/*` alias and App Router layout.

- [x] **Step 1: Initialize dependencies and scripts**

Create `package.json` with these scripts and dependency families:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "npx serve@14 out",
    "lint": "eslint .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Install `next@16`, `react@19`, `react-dom@19`, `framer-motion`, `three`, `@react-three/fiber`, and `@react-three/drei` as runtime dependencies. Install `typescript`, `tailwindcss`, `@tailwindcss/postcss`, `eslint`, `eslint-config-next`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `playwright`, and their matching type packages as development dependencies.

- [x] **Step 2: Configure static export and test environments**

Set `next.config.ts` to the exact production constraint:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

Configure Vitest with `environment: "jsdom"`, `setupFiles: ["./tests/setup.ts"]`, and the `@` alias resolving to the repository root. Configure Playwright with `baseURL: "http://127.0.0.1:3000"` and a `webServer` command of `npm run dev`.

- [x] **Step 3: Add the failing shell smoke test**

Create `tests/components/site-shell.test.tsx` before implementing the layout:

```tsx
import { render, screen } from "@testing-library/react";
import SiteFooter from "@/components/site-footer";

it("identifies the studio in the shared footer", () => {
  render(<SiteFooter />);
  expect(screen.getByText(/Genjux/i)).toBeInTheDocument();
});
```

- [x] **Step 4: Run the test to verify it fails**

Run: `npm run test -- tests/components/site-shell.test.tsx`

Expected: FAIL because `@/components/site-footer` does not exist.

- [x] **Step 5: Implement the minimal application shell**

Create `app/layout.tsx` with the `Geist` and `JetBrains_Mono` font exports from `next/font/google`, a dark `body`, `lang="en"`, viewport metadata, and site metadata titled `Genjux — Independent Apps`. Create `app/globals.css` with CSS variables for `--void: #090a0d`, glass surfaces, coral, ivory, amber, blueprint grid rules, focus styles, and a `@media (prefers-reduced-motion: reduce)` rule that removes nonessential animation.

Create a minimal `components/site-footer.tsx` that renders `<footer aria-label="Site footer">© 2026 Genjux. Independent software.</footer>`, then create a semantic `app/not-found.tsx` with a link back to `/`.

- [x] **Step 6: Run quality checks**

Run: `npm run test -- tests/components/site-shell.test.tsx && npm run lint && npm run build`

Expected: all commands exit with status `0`, and `out/` exists after the build.

- [x] **Step 7: Commit the foundation**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs vitest.config.ts playwright.config.ts tests app components .gitignore
git commit -m "chore: scaffold static Next.js site"
```

### Task 2: Model product and navigation content, then bring in real assets

**Files:**
- Create: `lib/products.ts`
- Create: `lib/routes.ts`
- Create: `tests/lib/products.test.ts`
- Create: `public/products/bebilog/app-icon.png`
- Create: `public/products/bebilog/home.png`
- Create: `public/products/bebilog/app-store-badge.svg`
- Create: `public/products/nautilus/app-icon.png`
- Create: `public/products/nautilus/home.jpg`
- Create: `public/products/nautilus/app-store-badge.svg`

**Interfaces:**
- Consumes: the TypeScript alias created in Task 1 and public assets from the existing product sites.
- Produces: `Product`, `products`, `getProduct(slug)`, `productSlugs`, and `studioRoutes`, used by every page and product UI component.

- [x] **Step 1: Write failing catalog tests**

Create `tests/lib/products.test.ts`:

```ts
import { getProduct, productSlugs, products } from "@/lib/products";

it("exposes exactly the two public products", () => {
  expect(productSlugs).toEqual(["bebilog", "nautilus"]);
  expect(products.map(({ name }) => name)).toEqual(["Bebilog", "Nautilus"]);
});

it("returns a product only for a supported slug", () => {
  expect(getProduct("bebilog")?.route).toBe("/apps/bebilog");
  expect(getProduct("missing")).toBeUndefined();
});
```

- [x] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/lib/products.test.ts`

Expected: FAIL because `@/lib/products` does not exist.

- [x] **Step 3: Implement the typed catalog and navigation data**

Define the following interface in `lib/products.ts` and implement both records with their true URLs and approved copy:

```ts
export type Product = {
  slug: "bebilog" | "nautilus";
  name: string;
  route: `/apps/${string}`;
  appStoreUrl: string;
  platform: "Native iOS" | "Native iOS & iPadOS";
  tagline: string;
  description: string;
  capabilities: readonly string[];
  accent: "coral" | "amber";
  assets: { icon: string; hero: string; appStoreBadge: string };
};
```

Use the Bebilog App Store URL `https://apps.apple.com/us/app/bebilog-baby-tracker/id6759827652` and Nautilus App Store URL `https://apps.apple.com/us/app/nautilus-tech-news-reader/id6787639053`. Export `productSlugs`, `products`, and `getProduct(slug: string): Product | undefined`. In `lib/routes.ts`, export the four studio routes `/about`, `/changelog`, and `/contact` plus a `Products` anchor that points to `/#products`.

- [x] **Step 4: Copy the approved first-party artwork**

Run these explicit copies:

```bash
cp /Users/petr/Documents/GitHub/bebilog-website/public/images/app-icon.png public/products/bebilog/app-icon.png
cp /Users/petr/Documents/GitHub/bebilog-website/public/images/screenshot-home.png public/products/bebilog/home.png
cp /Users/petr/Documents/GitHub/bebilog-website/public/images/app-store-badge-en.svg public/products/bebilog/app-store-badge.svg
cp /Users/petr/Documents/GitHub/nautilus-website/assets/icon-512.png public/products/nautilus/app-icon.png
cp /Users/petr/Documents/GitHub/nautilus-website/assets/shots/home.jpg public/products/nautilus/home.jpg
cp /Users/petr/Documents/GitHub/nautilus-website/assets/app-store-badge.svg public/products/nautilus/app-store-badge.svg
```

- [x] **Step 5: Run the catalog checks**

Run: `npm run test -- tests/lib/products.test.ts && npm run lint`

Expected: all assertions pass and lint exits `0`.

- [x] **Step 6: Commit the content model**

```bash
git add lib/products.ts lib/routes.ts tests/lib/products.test.ts public/products
git commit -m "feat: add product catalog and assets"
```

### Task 3: Build the shared navigation, footer, and static studio routes

**Files:**
- Create: `components/site-header.tsx`
- Modify: `components/site-footer.tsx`
- Modify: `app/layout.tsx`
- Create: `app/about/page.tsx`
- Create: `app/changelog/page.tsx`
- Create: `app/contact/page.tsx`
- Create: `tests/components/site-header.test.tsx`

**Interfaces:**
- Consumes: `studioRoutes` from `lib/routes.ts`.
- Produces: `SiteHeader` and a complete `SiteShell` layout; home and product pages receive shared navigation, palette trigger, and footer.

- [ ] **Step 1: Write the failing header test**

Create `tests/components/site-header.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import SiteHeader from "@/components/site-header";

it("renders each studio route", () => {
  render(<SiteHeader />);
  expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/#products");
  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/site-header.test.tsx`

Expected: FAIL because `SiteHeader` does not exist.

- [ ] **Step 3: Implement the shared shell**

Implement `SiteHeader` as a fixed `<header>` with a `<nav aria-label="Primary navigation">`, wordmark link to `/`, and desktop links from `studioRoutes`. Use a menu disclosure at mobile widths rather than hiding navigation permanently. Task 5 adds the stateful product-explorer control.

Update `app/layout.tsx` to render `<SiteHeader />`, `<main id="main-content">{children}</main>`, and `<SiteFooter />`. Expand the footer to include the two product routes, the studio routes, and `Building independently` with `aria-label="Studio status"`.

Create the three simple static pages with an `<h1>`, a concise truthful paragraph, and relevant internal links. The Changelog lists `Bebilog — iOS launch` and `Nautilus — iOS and iPadOS launch`; Contact links to the GitHub repository and an email `mailto:hello@genjux.com`.

- [ ] **Step 4: Run component and build checks**

Run: `npm run test -- tests/components/site-shell.test.tsx tests/components/site-header.test.tsx && npm run lint && npm run build`

Expected: the test suite and static export pass, with `/about`, `/changelog`, and `/contact` present in `out/`.

- [ ] **Step 5: Commit shared pages and shell**

```bash
git add app components tests/components
git commit -m "feat: add studio navigation and static pages"
```

### Task 4: Implement the home page and reusable product cards

**Files:**
- Create: `components/product-card.tsx`
- Create: `components/home-hero.tsx`
- Modify: `app/page.tsx`
- Create: `tests/components/product-card.test.tsx`

**Interfaces:**
- Consumes: `Product` and `products` from `lib/products.ts`.
- Produces: `ProductCard({ product }: { product: Product })` and `HomeHero`, used only by `app/page.tsx` in this release.

- [ ] **Step 1: Write the failing product card test**

Create `tests/components/product-card.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

it("links each card to its product route and labels its artwork", () => {
  render(<ProductCard product={products[0]} />);
  expect(screen.getByRole("link", { name: /explore bebilog/i })).toHaveAttribute("href", "/apps/bebilog");
  expect(screen.getByRole("img", { name: /bebilog app screen/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/product-card.test.tsx`

Expected: FAIL because `ProductCard` does not exist.

- [ ] **Step 3: Implement product card and hero composition**

Implement `ProductCard` as an `<article>` with `data-accent={product.accent}`, product icon, platform metadata, title, description, three capability tags, local hero artwork, and a visible `Explore ${product.name}` link. Use an `<img>` for public artwork with exact alt text `${product.name} app screen`; its card remains functional without client JavaScript.

Implement `HomeHero` with the approved headline `Small apps. Deeply considered.`, the studio statement `Crafting private, native, human-centered software artifacts for iOS and macOS.`, the metadata label `INDEPENDENT PRODUCT STUDIO`, and an anchor to `#products` labelled `Explore products`.

Compose `app/page.tsx` with a hero, an `id="products"` two-card 12-column grid, the four-item intent strip (`Native-first`, `On-device AI`, `Privacy by design`, `No trackers`), and no duplicate visible product title.

- [ ] **Step 4: Run home UI tests**

Run: `npm run test -- tests/components/product-card.test.tsx && npm run lint && npm run build`

Expected: tests pass and `out/index.html` contains both product route links.

- [ ] **Step 5: Commit the home composition**

```bash
git add app/page.tsx components/home-hero.tsx components/product-card.tsx tests/components/product-card.test.tsx app/globals.css
git commit -m "feat: build product studio homepage"
```

### Task 5: Add the accessible command palette and motion-safe visual enhancements

**Files:**
- Create: `components/command-palette.tsx`
- Create: `components/motion-safe.tsx`
- Create: `components/atmosphere-canvas.tsx`
- Create: `components/constellation.tsx`
- Modify: `components/site-header.tsx`
- Modify: `components/home-hero.tsx`
- Modify: `app/page.tsx`
- Create: `tests/components/command-palette.test.tsx`

**Interfaces:**
- Consumes: `products` from `lib/products.ts`.
- Produces: `CommandPalette({ open, onOpenChange })`, `MotionSafe`, `AtmosphereCanvas`, and `Constellation`; all enhancements leave the static content from Tasks 3–4 available.

- [ ] **Step 1: Write failing interaction tests**

Create `tests/components/command-palette.test.tsx`:

```tsx
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommandPalette from "@/components/command-palette";

function PaletteHarness() {
  const [open, setOpen] = useState(true);
  return <CommandPalette open={open} onOpenChange={setOpen} />;
}

it("opens, focuses product choices, and closes with Escape", async () => {
  const user = userEvent.setup();
  render(<PaletteHarness />);
  expect(screen.getByRole("dialog", { name: /product explorer/i })).toBeInTheDocument();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("dialog", { name: /product explorer/i })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/command-palette.test.tsx`

Expected: FAIL because `CommandPalette` does not exist.

- [ ] **Step 3: Implement keyboard-safe command navigation**

Implement a client `CommandPalette` with `role="dialog"`, `aria-modal="true"`, accessible name `Product explorer`, focus moved to the first product link when opened, and Escape calling `onOpenChange(false)`. `⌘ K` or `Ctrl K` opens the palette when the event target is not an `input`, `textarea`, or `contenteditable` element. The `1` and `2` keys navigate only while the palette is open and focus is within the dialog. Product links use their routes and close the palette on click.

Wire a single `open` state into `SiteHeader`; provide it to the palette rather than creating duplicate dialogs on pages.

- [ ] **Step 4: Implement progressive ambient effects**

Implement `MotionSafe` with `useReducedMotion()` and render its children with zero-duration variants when motion is reduced. Implement `AtmosphereCanvas` as a client component that creates a low-density WebGL canvas only when `matchMedia("(prefers-reduced-motion: reduce)").matches` is false and `canvas.getContext("webgl")` succeeds; otherwise return `null` and rely on the CSS radial gradients and grid.

Implement `Constellation` with `@react-three/fiber` as a dynamically imported desktop-only hero island: two rounded planes, one coral and one amber/ivory, connected by a faint curve. Use `frameloop="demand"` under reduced motion and avoid loading it on viewports below `1024px`. The canvas has `aria-hidden="true"` and never contains required text or controls.

- [ ] **Step 5: Run interaction and accessibility checks**

Run: `npm run test -- tests/components/command-palette.test.tsx && npm run lint && npm run build`

Expected: interactions pass, lint exits `0`, and the static export succeeds when client-only components are present.

- [ ] **Step 6: Commit the enhancement layer**

```bash
git add components app tests/components package.json package-lock.json app/globals.css
git commit -m "feat: add accessible product palette and ambient motion"
```

### Task 6: Generate product detail routes from the catalog

**Files:**
- Create: `components/product-page-content.tsx`
- Create: `app/apps/[slug]/page.tsx`
- Create: `tests/components/product-page-content.test.tsx`

**Interfaces:**
- Consumes: `Product`, `getProduct`, `productSlugs`, and shared shell from previous tasks.
- Produces: pre-rendered `/apps/bebilog` and `/apps/nautilus` pages and `ProductPageContent({ product }: { product: Product })`.

- [ ] **Step 1: Write failing detail-page tests**

Create `tests/components/product-page-content.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import ProductPageContent from "@/components/product-page-content";
import { products } from "@/lib/products";

it("uses the product facts and App Store destination", () => {
  render(<ProductPageContent product={products[1]} />);
  expect(screen.getByRole("heading", { name: "Nautilus" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /download nautilus on the app store/i })).toHaveAttribute("href", products[1].appStoreUrl);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/components/product-page-content.test.tsx`

Expected: FAIL because `ProductPageContent` does not exist.

- [ ] **Step 3: Implement the reusable product content and static params**

Implement `ProductPageContent` with product icon and hero image, an `h1`, tagline, description, capability list, privacy/independence supporting copy, a local App Store badge image within an external link named `Download ${product.name} on the App Store`, and a link back to `/`.

Implement `app/apps/[slug]/page.tsx` with `export const dynamicParams = false`, `generateStaticParams()` returning `productSlugs.map((slug) => ({ slug }))`, and `notFound()` when `getProduct(params.slug)` returns undefined. Set route metadata from the selected product and render `ProductPageContent`.

- [ ] **Step 4: Run detail-route checks**

Run: `npm run test -- tests/components/product-page-content.test.tsx tests/lib/products.test.ts && npm run lint && npm run build && test -f out/apps/bebilog/index.html && test -f out/apps/nautilus/index.html`

Expected: tests and lint pass; both expected static route files exist.

- [ ] **Step 5: Commit the product pages**

```bash
git add app/apps components/product-page-content.tsx tests/components/product-page-content.test.tsx
git commit -m "feat: add static product detail pages"
```

### Task 7: Verify behavior in a real browser and finish production readiness

**Files:**
- Create: `tests/e2e/site.spec.ts`
- Modify: `README.md`
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- Consumes: built static routes and all interactive components.
- Produces: repeatable browser coverage, GitHub Actions validation, and local development/deployment instructions.

- [ ] **Step 1: Write failing browser coverage**

Create `tests/e2e/site.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("visitors can open the product explorer and reach each product page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /open product command palette/i }).click();
  await expect(page.getByRole("dialog", { name: /product explorer/i })).toBeVisible();
  await page.getByRole("link", { name: /bebilog/i }).click();
  await expect(page).toHaveURL(/\/apps\/bebilog$/);
  await expect(page.getByRole("heading", { name: "Bebilog" })).toBeVisible();
});

test("the home page exposes all primary landmark destinations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: /explore nautilus/i })).toBeVisible();
});
```

- [ ] **Step 2: Run browser tests to identify defects**

Run: `npm run test:e2e`

Expected: initial failures identify any missing accessible names, route transitions, or test-server configuration gaps.

- [ ] **Step 3: Correct discovered production defects without expanding scope**

Adjust markup, aria labels, test configuration, or route construction only where needed for the two stated browser scenarios. Keep the command palette and 3D/canvas effects as enhancements; do not add data collection, a backend, or unapproved UI libraries.

- [ ] **Step 4: Add continuous integration and user documentation**

Create `.github/workflows/ci.yml` that runs on `push` and `pull_request` for `main`, uses Node 22, runs `npm ci`, `npm run lint`, `npm run test`, and `npm run build`.

Update `README.md` with the exact local commands:

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

Document that deployment uses the generated `out/` directory and that product assets originate from the sibling Bebilog and Nautilus website projects.

- [ ] **Step 5: Run the full verification suite**

Run: `npm run lint && npm run test && npm run build && npm run test:e2e && git status --short`

Expected: all four verification commands exit `0`; `git status --short` lists only the CI workflow and README changes intended for this task before commit.

- [ ] **Step 6: Commit final verification and documentation**

```bash
git add tests/e2e README.md .github/workflows/ci.yml
git commit -m "test: verify public product journeys"
```

## Plan Self-Review

- **Spec coverage:** Task 1 establishes static export and base visual tokens; Task 2 centralizes truthful product data and real assets; Task 3 supplies shared routes; Task 4 implements the prescribed home structure; Task 5 handles motion, WebGL failure, reduced motion, and keyboard behavior; Task 6 creates the two product pages; Task 7 checks browser behavior and CI. The about, changelog, contact, responsive CSS, accessibility, no-JavaScript content, and host-neutral build requirements are all covered.
- **Placeholder scan:** The plan contains no unresolved implementation markers or instructions that defer required work. The user-facing project may later add a deployment host or custom domain, which remains intentionally outside this implementation scope.
- **Type consistency:** Every component’s props and product-catalog symbols are introduced before later use: `Product`, `products`, `getProduct`, `productSlugs`, `ProductCard`, `CommandPalette`, and `ProductPageContent` use the same names throughout.
