# Genjux Studio Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add capabilities, selected work, experience, open-source, and contact sections to the Genjux home page without exposing personal identity or importing the reference portfolio’s visual system.

**Architecture:** A typed `studioContent` module holds all approved facts and destinations. Five focused React components render that content under the existing home product sections, using the current Genjux tokens and `MotionSafe` interactions. First-party Outlook/Bebilog imagery is copied to `public/studio`; all other imagery remains code-native.

**Tech Stack:** Next.js 16 static export, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Vitest, React Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-13-genjux-studio-content-design.md`

## Global Constraints

- Use factual source information from `/Users/petr/Documents/GitHub/PetrGuan.github.io`, but do not use its purple styles, portrait, personal name, personal email, footer credit, GitHub username, or source URL.
- Every new section uses the existing Genjux void background, coral/amber accents, glass surfaces, Geist/JetBrains Mono type pairing, and reduced-motion behavior.
- Use collective studio voice: “Genjux builds”, “Experience behind Genjux”, and “Work with Genjux.”
- Keep Microsoft/Outlook text explicitly framed as the experience behind Genjux; never present it as a Genjux product.
- Data belongs only in `lib/studio-content.ts`; JSX components do not duplicate record text or hrefs.
- Bebilog selected-work card points to `/apps/bebilog`; contact CTA points to `/contact`.
- Do not add data fetching, analytics, a CMS, a backend, or third-party visual assets.

---

## File Structure

```text
lib/studio-content.ts                     # Typed capability, work, experience, contribution data
components/studio-capabilities.tsx        # Capability grid
components/selected-work.tsx              # Editorial work cards
components/studio-experience.tsx          # Background-experience timeline
components/open-source-contributions.tsx  # Contribution cards
components/studio-contact-cta.tsx         # Contact closing section
public/studio/outlook.webp                # First-party source artwork
public/studio/bebilog.webp                # First-party source artwork
app/(studio)/page.tsx                     # Composes all studio sections after product content
app/globals.css                           # Genjux-only styling for new sections
tests/lib/studio-content.test.ts          # Content cardinality and identity guard tests
tests/components/selected-work.test.tsx   # Bebilog and contact destinations
tests/e2e/site.spec.ts                    # Section visibility and rendered identity guard
```

### Task 1: Establish safe studio content data and assets

**Files:**
- Create: `lib/studio-content.ts`
- Create: `public/studio/outlook.webp`
- Create: `public/studio/bebilog.webp`
- Create: `tests/lib/studio-content.test.ts`

**Interfaces:**
- Consumes: factual project/work content from the local portfolio source.
- Produces: `studioCapabilities`, `selectedWork`, `studioExperience`, and `openSourceContributions`; later components consume these exports only.

- [ ] **Step 1: Write the failing studio-content test**

```ts
import {
  openSourceContributions,
  selectedWork,
  studioCapabilities,
  studioExperience,
} from "@/lib/studio-content";

it("contains the approved studio records without personal identity", () => {
  expect(studioCapabilities).toHaveLength(5);
  expect(selectedWork).toHaveLength(4);
  expect(studioExperience).toHaveLength(3);
  expect(openSourceContributions).toHaveLength(3);
  expect(JSON.stringify({ studioCapabilities, selectedWork, studioExperience, openSourceContributions }))
    .not.toMatch(/Petr|Guan|petrguan/i);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- tests/lib/studio-content.test.ts`

Expected: FAIL because `lib/studio-content.ts` does not exist.

- [ ] **Step 3: Add the typed studio data and first-party project assets**

Define record types containing `code`, `title`, `description`, `tags`, `href`, and optional `image`. Create exactly five capabilities, four selected-work records, three timeline records, and three contribution records. Use `/apps/bebilog` for the Bebilog record and no personal profile link anywhere.

Copy these source assets exactly:

```bash
cp /Users/petr/Documents/GitHub/PetrGuan.github.io/Outlook.webp public/studio/outlook.webp
cp /Users/petr/Documents/GitHub/PetrGuan.github.io/Bebilog.webp public/studio/bebilog.webp
```

- [ ] **Step 4: Run data checks**

Run: `npm run test -- tests/lib/studio-content.test.ts && npm run lint`

Expected: test and lint pass.

- [ ] **Step 5: Commit studio data**

```bash
git add lib/studio-content.ts public/studio tests/lib/studio-content.test.ts
git commit -m "feat: add Genjux studio content data"
```

### Task 2: Build Genjux-native studio sections

**Files:**
- Create: `components/studio-capabilities.tsx`
- Create: `components/selected-work.tsx`
- Create: `components/studio-experience.tsx`
- Create: `components/open-source-contributions.tsx`
- Create: `components/studio-contact-cta.tsx`
- Modify: `app/globals.css`
- Create: `tests/components/selected-work.test.tsx`

**Interfaces:**
- Consumes: all exports from `lib/studio-content.ts` and `MotionSafe` from `components/motion-safe.tsx`.
- Produces: five home-page sections that are server-rendered, keyboard accessible, and use Genjux’s design tokens.

- [ ] **Step 1: Write the failing selected-work component test**

```tsx
import { render, screen } from "@testing-library/react";
import SelectedWork from "@/components/selected-work";

it("routes Bebilog work to its integrated product site", () => {
  render(<SelectedWork />);
  expect(screen.getByRole("link", { name: /explore bebilog/i })).toHaveAttribute("href", "/apps/bebilog");
});

it("sends the studio closing CTA to contact", () => {
  render(<StudioContactCta />);
  expect(screen.getByRole("link", { name: /work with genjux/i })).toHaveAttribute("href", "/contact");
});
```

Import `StudioContactCta` in the test before implementing either component.

- [ ] **Step 2: Run the component test to verify it fails**

Run: `npm run test -- tests/components/selected-work.test.tsx`

Expected: FAIL because the studio section components do not exist.

- [ ] **Step 3: Implement all five sections in the current Genjux visual language**

`StudioCapabilities` renders a five-item technical grid. `SelectedWork` renders the four work records with only Outlook/Bebilog first-party artwork; MarkVerse and MuYe use restrained code/native icon panels. `StudioExperience` renders a three-step timeline headed “Experience behind Genjux.” `OpenSourceContributions` renders three contribution cards. `StudioContactCta` renders the closing Genjux contact link.

Use `MotionSafe` around section entrances. Add only `.studio-*` rules to `app/globals.css`: glass cards, technical labels, asymmetric work grid, timeline rail, contribution grid, and responsive stacking. Do not add purple tokens, portfolio navigation, a portrait, light-theme controls, or any personal identity string.

- [ ] **Step 4: Run component and build checks**

Run: `npm run test -- tests/components/selected-work.test.tsx tests/lib/studio-content.test.ts && npm run lint && npm run build`

Expected: all checks pass; static build succeeds with no new route requirement.

- [ ] **Step 5: Commit studio components**

```bash
git add components/studio-*.tsx components/selected-work.tsx components/open-source-contributions.tsx app/globals.css tests/components/selected-work.test.tsx
git commit -m "feat: add Genjux studio sections"
```

### Task 3: Compose content on the home page and verify the brand guard

**Files:**
- Modify: `app/(studio)/page.tsx`
- Modify: `tests/e2e/site.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: five studio section components from Task 2.
- Produces: the complete Genjux studio home page and browser-level assertions for content visibility and identity removal.

- [ ] **Step 1: Write failing home-page browser coverage**

```ts
test("home page presents Genjux studio content without personal identity", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /studio capabilities/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /selected work/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /experience behind genjux/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /open-source contributions/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /work with genjux/i })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/Petr|Guan|petrguan/i);
});
```

- [ ] **Step 2: Run the browser test to verify it fails**

Run: `npm run test:e2e -g "Genjux studio content"`

Expected: FAIL because the current home page does not yet render the studio sections.

- [ ] **Step 3: Compose sections after existing product content**

Import and render `StudioCapabilities`, `SelectedWork`, `StudioExperience`, `OpenSourceContributions`, and `StudioContactCta` after the existing intent strip in `app/(studio)/page.tsx`. Preserve the existing hero, product selector, product cards, intent strip, and footer unchanged.

Update the README to describe the new Genjux studio content and state that its factual content originates from the local portfolio source but contains no personal identity or original-site styling.

- [ ] **Step 4: Run full final verification**

Run: `npm run lint && npm run test && npm run build && npm run test:e2e && git status --short`

Expected: lint passes, all unit and browser tests pass, static export succeeds, and the working tree lists only the expected home/test/README changes before commit.

- [ ] **Step 5: Commit final studio integration**

```bash
git add app/(studio)/page.tsx tests/e2e/site.spec.ts README.md
git commit -m "feat: present Genjux studio content"
```

## Plan Self-Review

- **Spec coverage:** Task 1 creates the approved data and assets without personal identity. Task 2 creates all five Genjux-native sections. Task 3 inserts them after the existing product content and verifies both visibility and identity removal.
- **Placeholder scan:** The plan names exact data exports, components, files, test cases, source assets, and verification commands. No required work is deferred.
- **Type consistency:** `studioCapabilities`, `selectedWork`, `studioExperience`, `openSourceContributions`, `SelectedWork`, and `StudioContactCta` are defined before their later consumers.
