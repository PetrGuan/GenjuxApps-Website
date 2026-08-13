# Product Site Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Genjux’s simplified product detail screens with the real Bebilog and Nautilus marketing implementations, served inside the same static site.

**Architecture:** Move studio-only chrome into an App Router route group and render product routes outside it. Migrate Bebilog’s existing English/Chinese Next components behind `/apps/bebilog` and `/apps/bebilog/[locale]`; migrate Nautilus’s existing static pages into scoped React route components under `/apps/nautilus` and `/apps/nautilus/editions`. The Genjux catalog links directly to these first-party routes.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Tailwind CSS 4, next-intl, Framer Motion, Vitest, React Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-13-product-site-integration-design.md`

## Global Constraints

- Retain `output: "export"`; do not add a backend, redirect rule, CMS, analytics SDK, iframe, database, or server API.
- `/apps/bebilog` renders English directly. `/apps/bebilog/en` and `/apps/bebilog/zh` remain statically generated locale routes.
- Keep the Genjux header/footer only in the `(studio)` route group; product pages must not render that shell.
- Migrate only first-party source and assets from `/Users/petr/Documents/GitHub/bebilog-website` and `/Users/petr/Documents/GitHub/nautilus-website`.
- Preserve the existing product sites’ claims, app-store destinations, privacy language, sections, visual hierarchy, and internal navigation.
- Scope product styling under `.bebilog-site` and `.nautilus-site`; product pages must not alter the studio’s visual system.
- All product navigation must work without JavaScript. Client code is limited to existing animated or sticky enhancements and respects `prefers-reduced-motion`.

---

## File Structure

```text
app/
  (studio)/
    about/page.tsx                 # Existing studio route, moved unchanged
    changelog/page.tsx             # Existing studio route, moved unchanged
    contact/page.tsx               # Existing studio route, moved unchanged
    layout.tsx                     # SiteHeader + SiteFooter only for studio pages
    page.tsx                       # Existing Genjux home, moved unchanged
  apps/
    bebilog/
      [locale]/page.tsx            # Statically generated en and zh Bebilog routes
      page.tsx                     # English Bebilog default route
    nautilus/
      editions/page.tsx            # Existing Nautilus Editions content
      page.tsx                     # Existing Nautilus home content
  layout.tsx                       # Document shell only
components/
  bebilog/
    BebilogSite.tsx                # Source-page composition inside a local provider
    components/                    # Migrated Bebilog presentation components
    features/                      # Migrated Bebilog feature visualizations
    data.ts                        # Migrated constants and localized messages
  nautilus/
    NautilusSite.tsx               # Migrated Nautilus home composition
    NautilusEditions.tsx           # Migrated Nautilus Editions composition
    NautilusStickyCta.tsx          # Client-only sticky CTA enhancement
    nautilus.module.css            # Scoped migration of source HTML styles
public/apps/
  bebilog/images/                  # Migrated Bebilog first-party assets
  nautilus/assets/                 # Migrated Nautilus first-party assets
tests/
  components/product-card.test.tsx # Updated destination assertions
  lib/bebilog-locale.test.ts       # English and Chinese content selection behavior
  e2e/site.spec.ts                 # Cross-site card navigation and default locale checks
```

### Task 0: Define the failing cross-site browser contract

**Files:**
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: the existing Genjux home card links.
- Produces: browser expectations that remain red until the product sites in Tasks 2–3 replace the simplified pages.

- [x] **Step 1: Add failing integrated-product browser cases**

Add these cases to `tests/e2e/site.spec.ts`:

```ts
test("Bebilog card opens the complete English Bebilog site", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /explore bebilog/i }).click();
  await expect(page).toHaveURL(/\/apps\/bebilog$/);
  await expect(page.getByRole("heading", { name: /Baby tracking/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).not.toBeVisible();
});

test("Nautilus card opens the complete Nautilus site and its Editions route", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /explore nautilus/i }).click();
  await expect(page).toHaveURL(/\/apps\/nautilus$/);
  await expect(page.getByRole("heading", { name: /quiet, beautiful reading room/i })).toBeVisible();
  await page.getByRole("link", { name: /editions/i }).first().click();
  await expect(page).toHaveURL(/\/apps\/nautilus\/editions$/);
});
```

- [x] **Step 2: Run the browser contract to verify it fails**

Run: `npm run test:e2e`

Expected: both new cases fail because Genjux currently renders simplified product pages with studio chrome and no Nautilus Editions route. Keep this changed test file uncommitted until Task 3 makes it green.

### Task 1: Separate studio chrome from product routes

**Files:**
- Create: `app/(studio)/layout.tsx`
- Move: `app/page.tsx` → `app/(studio)/page.tsx`
- Move: `app/about/page.tsx` → `app/(studio)/about/page.tsx`
- Move: `app/changelog/page.tsx` → `app/(studio)/changelog/page.tsx`
- Move: `app/contact/page.tsx` → `app/(studio)/contact/page.tsx`
- Modify: `app/layout.tsx`
- Modify: `lib/products.ts`
- Modify: `tests/lib/products.test.ts`
- Modify: `tests/components/product-card.test.tsx`
- Create: `tests/components/studio-layout.test.tsx`
- Delete: `app/apps/[slug]/page.tsx`
- Delete: `components/product-page-content.tsx`
- Delete: `tests/components/product-page-content.test.tsx`

**Interfaces:**
- Consumes: `SiteHeader`, `SiteFooter`, and the existing `Product` catalog.
- Produces: `(studio)` pages with shared chrome and product catalog routes `"/apps/bebilog" | "/apps/nautilus"` for Tasks 2–3.

- [x] **Step 1: Write the failing studio-shell test**

Create `tests/components/studio-layout.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import StudioLayout from "@/app/(studio)/layout";

it("keeps Genjux chrome inside the studio route group", () => {
  render(<StudioLayout>Studio content</StudioLayout>);
  expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
  expect(screen.getByText("Studio content")).toBeInTheDocument();
});
```

- [x] **Step 2: Run the studio-shell test to verify it fails**

Run: `npm run test -- tests/components/studio-layout.test.tsx`

Expected: FAIL because `app/(studio)/layout.tsx` does not exist.

- [x] **Step 3: Move studio routes and remove duplicate detail-page ownership**

Create `app/(studio)/layout.tsx`:

```tsx
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-frame">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
```

Move the four studio pages into `(studio)` without changing their JSX. Reduce `app/layout.tsx` to document metadata, fonts, `<html>`, `<body>`, and `{children}`. Update `Product["route"]` to `"/apps/bebilog" | "/apps/nautilus"`, keep the catalog records at those exact values, update the catalog/card tests to assert both exact routes, and delete the previous generic `[slug]` detail page/component/test.

- [x] **Step 4: Run route and static-export checks**

Run: `npm run test -- tests/components/studio-layout.test.tsx tests/lib/products.test.ts tests/components/product-card.test.tsx && npm run lint && npm run build`

Expected: all tests pass; `out/index.html`, `out/about.html`, `out/changelog.html`, and `out/contact.html` still exist; no `out/apps/bebilog/index.html` is required yet.

- [x] **Step 5: Commit the shell boundary**

```bash
git add app lib/products.ts tests/lib/products.test.ts tests/components/product-card.test.tsx tests/components/studio-layout.test.tsx
git rm app/apps/[slug]/page.tsx components/product-page-content.tsx tests/components/product-page-content.test.tsx
git commit -m "refactor: isolate product routes from studio shell"
```

### Task 2: Migrate Bebilog’s English-default website

**Files:**
- Create: `components/bebilog/BebilogSite.tsx`
- Create: `components/bebilog/data.ts`
- Create: `components/bebilog/components/AnimateInView.tsx`
- Create: `components/bebilog/components/AppStoreBadge.tsx`
- Create: `components/bebilog/components/FeatureGrid.tsx`
- Create: `components/bebilog/components/FeatureSection.tsx`
- Create: `components/bebilog/components/Footer.tsx`
- Create: `components/bebilog/components/FooterCTA.tsx`
- Create: `components/bebilog/components/Hero.tsx`
- Create: `components/bebilog/components/Icons.tsx`
- Create: `components/bebilog/components/LanguageToggle.tsx`
- Create: `components/bebilog/components/LucideIcon.tsx`
- Create: `components/bebilog/components/MidCTA.tsx`
- Create: `components/bebilog/components/Nav.tsx`
- Create: `components/bebilog/components/PhoneMockup.tsx`
- Create: `components/bebilog/components/Pricing.tsx`
- Create: `components/bebilog/components/Privacy.tsx`
- Create: `components/bebilog/components/StickyCTA.tsx`
- Create: `components/bebilog/features/BabyFoodHub.tsx`
- Create: `components/bebilog/features/GrowthChart.tsx`
- Create: `components/bebilog/features/InsightsViz.tsx`
- Create: `components/bebilog/features/PredictionTimeline.tsx`
- Create: `components/bebilog/features/SmartLogViz.tsx`
- Create: `components/bebilog/features/TrackingGrid.tsx`
- Create: `components/bebilog/features/VaccineSchedule.tsx`
- Create: `app/apps/bebilog/page.tsx`
- Create: `app/apps/bebilog/[locale]/page.tsx`
- Create: `public/apps/bebilog/images/app-icon.png`
- Create: `public/apps/bebilog/images/app-store-badge-en.svg`
- Create: `public/apps/bebilog/images/app-store-badge-zh.svg`
- Create: `public/apps/bebilog/images/screenshot-home.png`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `app/globals.css`
- Create: `tests/lib/bebilog-locale.test.ts`

**Interfaces:**
- Consumes: original Bebilog components, feature visualizations, `en.json`, `zh.json`, source constants, and images from `/Users/petr/Documents/GitHub/bebilog-website`.
- Produces: `BebilogSite({ locale }: { locale: "en" | "zh" })`, rendered by `/apps/bebilog` with `locale="en"` and by generated locale routes.

- [x] **Step 1: Write failing locale-data tests**

Create `tests/lib/bebilog-locale.test.ts`:

```ts
import { bebilogMessages, supportedBebilogLocales } from "@/components/bebilog/data";

it("keeps English as the default product language", () => {
  expect(supportedBebilogLocales).toEqual(["en", "zh"]);
  expect(bebilogMessages.en.hero.titleLine1).toContain("Baby");
  expect(bebilogMessages.zh.hero.titleLine1).toContain("宝宝");
});
```

- [x] **Step 2: Run the locale-data test to verify it fails**

Run: `npm run test -- tests/lib/bebilog-locale.test.ts`

Expected: FAIL because `components/bebilog/data.ts` does not exist.

- [x] **Step 3: Copy the Bebilog implementation into a scoped component boundary**

Install `next-intl` with `npm install next-intl`. Copy the listed source components/features and `i18n/messages/en.json`, `i18n/messages/zh.json`, and `lib/constants.ts` into `components/bebilog`; replace their source aliases so internal imports begin with `@/components/bebilog/`. Export `bebilogMessages` and `supportedBebilogLocales` from `data.ts`.

Create `BebilogSite` with a `NextIntlClientProvider` receiving the selected message object, then reproduce the source page composition: `Nav`, `Hero`, seven `FeatureSection` values, the midway CTA after the fourth feature, `FeatureGrid`, `Privacy`, `Pricing`, `FooterCTA`, `Footer`, and `StickyCTA`.

Copy the four listed public files into `public/apps/bebilog/images/`, then change migrated image paths from `/images/` to `/apps/bebilog/images/`. Scope the copied body variables and selection rules beneath `.bebilog-site`; do not emit nested `<html>` or `<body>` elements.

- [x] **Step 4: Create static default and locale routes**

Create the direct default page:

```tsx
import BebilogSite from "@/components/bebilog/BebilogSite";

export default function BebilogDefaultPage() {
  return <BebilogSite locale="en" />;
}
```

Create `[locale]/page.tsx` with `dynamicParams = false`, `generateStaticParams()` returning `{ locale: "en" }` and `{ locale: "zh" }`, and `notFound()` for any locale other than those two. Use Bebilog’s existing English and Chinese metadata content with route-local canonical paths.

- [x] **Step 5: Run Bebilog verification**

Run: `npm run test -- tests/lib/bebilog-locale.test.ts && npm run lint && npm run build && test -f out/apps/bebilog.html && test -f out/apps/bebilog/en.html && test -f out/apps/bebilog/zh.html`

Expected: locale test passes; all three Bebilog paths are statically generated.

- [x] **Step 6: Commit the Bebilog migration**

```bash
git add app/apps/bebilog components/bebilog public/apps/bebilog app/globals.css package.json package-lock.json tests/lib/bebilog-locale.test.ts
git commit -m "feat: integrate Bebilog product site"
```

### Task 3: Copy Nautilus’s original static site unchanged

**Files:**
- Create: `public/apps/nautilus/index.html`
- Create: `public/apps/nautilus/editions.html`
- Create: `public/apps/nautilus/assets/app-store-badge.svg`
- Create: `public/apps/nautilus/assets/favicon-32.png`
- Create: `public/apps/nautilus/assets/icon-180.png`
- Create: `public/apps/nautilus/assets/icon-512.png`
- Create: `public/apps/nautilus/assets/shots/briefing.jpg`
- Create: `public/apps/nautilus/assets/shots/editions.jpg`
- Create: `public/apps/nautilus/assets/shots/home.jpg`
- Create: `public/apps/nautilus/assets/shots/ipad-splitview.jpg`
- Create: `public/apps/nautilus/assets/shots/opinionmap.jpg`
- Create: `public/apps/nautilus/assets/shots/radar.jpg`
- Create: `public/apps/nautilus/assets/shots/rules.jpg`
- Create: `public/apps/nautilus/assets/shots/saved.jpg`
- Create: `public/apps/nautilus/assets/shots/understand.jpg`
- Modify: `lib/products.ts`
- Modify: `tests/lib/products.test.ts`
- Modify: `tests/components/product-card.test.tsx`
- Modify: `tests/e2e/site.spec.ts`

**Interfaces:**
- Consumes: `/Users/petr/Documents/GitHub/nautilus-website/index.html`, `editions.html`, and all listed assets.
- Produces: the original Nautilus documents at `/apps/nautilus/index.html` and `/apps/nautilus/editions.html`; `Product.route` changes to `"/apps/nautilus/index.html"`.

- [x] **Step 1: Update the existing failing Nautilus browser expectation**

In `tests/e2e/site.spec.ts`, change the Nautilus destination assertion to `/\/apps\/nautilus\/index\.html$/` and the Editions assertion to `/\/apps\/nautilus\/editions\.html$/`. Update the catalog and card assertions to expect `/apps/nautilus/index.html`.

- [x] **Step 2: Run the Nautilus browser contract to verify it still fails**

Run: `npm run test:e2e`

Expected: the Bebilog case passes after Task 2, while the Nautilus case fails because the original static files are absent.

- [x] **Step 3: Copy the source document and assets without translation**

Copy `index.html`, `editions.html`, and the complete `assets/` directory from `/Users/petr/Documents/GitHub/nautilus-website` to `public/apps/nautilus/`. Do not alter the copied HTML: relative `assets/` URLs and `editions.html` navigation remain correct under this directory. Update the Nautilus catalog route and its unit/component assertions to `/apps/nautilus/index.html`.

- [x] **Step 4: Run static-document verification**

Run: `npm run test -- tests/lib/products.test.ts tests/components/product-card.test.tsx && npm run lint && npm run build && test -f out/apps/nautilus/index.html && test -f out/apps/nautilus/editions.html && npm run test:e2e`

Expected: the unchanged Nautilus title and Editions navigation pass the browser contract, and both source documents appear in the static output.

- [x] **Step 5: Commit the Nautilus source copy**

```bash
git add public/apps/nautilus lib/products.ts tests/lib/products.test.ts tests/components/product-card.test.tsx tests/e2e/site.spec.ts
git commit -m "feat: integrate Nautilus product site"
```

### Task 4: Verify cross-site handoff and visual isolation

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the static routes and components completed in Tasks 1–3.
- Produces: browser coverage for default-English Bebilog, Nautilus handoff, scoped pages, and updated local-project documentation.

- [x] **Step 1: Update developer documentation**

Replace the README product-assets section with explicit source-to-destination mappings for `public/apps/bebilog` and `public/apps/nautilus`. Add the English-default product paths and the `npm run test:e2e` verification command.

- [x] **Step 2: Run the full final verification suite after Tasks 2–3 are complete**

Run: `npm run lint && npm run test && npm run build && npm run test:e2e && git status --short`

Expected: lint has no errors, unit tests pass, static output includes studio and all product routes, browser tests pass, and status lists only README/test files before commit.

- [x] **Step 3: Commit final integration verification**

```bash
git add README.md tests/e2e/site.spec.ts
git commit -m "test: verify integrated product sites"
```

## Plan Self-Review

- **Spec coverage:** Task 1 isolates the studio shell and removes duplicate pages. Task 2 provides the English-default Bebilog migration plus its optional Chinese route. Task 3 provides both original Nautilus pages and scoped assets. Task 4 verifies card handoff, original product content, route isolation, static export, and documentation.
- **Placeholder scan:** The plan names every source/destination boundary, route, asset group, test command, and expected result. No required work is deferred.
- **Type consistency:** `Product.route`, `BebilogSite`, `supportedBebilogLocales`, `NautilusSite`, and `NautilusEditions` are introduced before they are consumed by later tasks.
