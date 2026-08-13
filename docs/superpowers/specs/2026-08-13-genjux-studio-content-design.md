# Genjux Studio Content Design

## Goal

Extend the Genjux home page with the studio’s technical capabilities, selected shipped work, experience, open-source contributions, and a studio contact section. Content is sourced from the local `PetrGuan.github.io` repository, but every visible name, layout choice, visual token, and interaction remains Genjux-branded.

## Content Sources and Brand Rules

Use factual project and experience information from `/Users/petr/Documents/GitHub/PetrGuan.github.io/index.html` and its first-party project images. Do not copy its purple theme, navigation, light theme, portrait, personal name, personal email address, footer credit, or GitHub username into Genjux.

All additions use the existing Genjux visual system:

- Void black background, blueprint grid, translucent glass surfaces, coral and amber accents.
- Geist for narrative copy and JetBrains Mono for technical labels and metadata.
- 12-column desktop grid; stacked responsive layout at tablet and mobile widths.
- Purposeful reveal and hover motion, respecting reduced-motion preferences.

## Home Page Information Architecture

The existing hero, product selector, Bebilog/Nautilus cards, and “Built with intent” strip remain first. The new content follows them in this order:

1. **Studio capabilities** — concise technical capability grid: native systems engineering, Apple-platform product development, cross-platform architecture, AI-enabled workflows, and product craft. Each capability uses a technical code label and one sentence of plain-language outcome.
2. **Selected work** — editorial project grid for Outlook Mobile, Bebilog, MarkVerse, and MuYe Fresh Pet Food. Cards use first-party Outlook/Bebilog imagery where available and Genjux-native graphic treatment for the other cards. Bebilog links to `/apps/bebilog`; no personal-profile or GitHub-profile link is shown.
3. **Experience behind Genjux** — compact timeline that communicates the engineering foundation behind the studio: native client engineering, data systems experience, and computer science foundations. It is explicitly framed as background experience, not as corporate work performed by Genjux itself.
4. **Open-source contributions** — three compact contribution cards for Swift tools support, Apple App Center SDK, and C/C++ telemetry infrastructure. Cards state the project and technical relevance without attribution to an individual account.
5. **Work with Genjux** — a quiet closing CTA pointing to the existing `/contact` route, without a personal email address or personal social profile.

## Copy and Identity Transformation

Write in the studio’s collective voice: “Genjux builds”, “the studio’s foundation”, and “work with Genjux.” Do not use first-person personal biography language, a human name, a personal portrait, “Petr”, “Guan”, “PetrGuan”, or the original portfolio URL in visible copy, accessibility labels, metadata, or links.

The Microsoft/Outlook history may be named as background experience because it explains the studio’s technical foundation. It must be labeled “Experience behind Genjux” so visitors do not infer that Microsoft or Outlook is a Genjux product.

## Components and Data

Create a typed `studioContent` module containing capability, selected-work, experience, and contribution records. Reusable page components consume that data; facts are not duplicated in JSX. The imported project artwork is stored under `public/studio/` and does not include `Selfie.png`.

New home sections are isolated components: `StudioCapabilities`, `SelectedWork`, `StudioExperience`, `OpenSourceContributions`, and `StudioContactCta`. Their styles extend existing Genjux classes in `app/globals.css`; no styles are copied from the reference portfolio.

## Accessibility and Behavior

Every card uses semantic headings, descriptive image alt text, visible keyboard focus, and normal anchor links. Decorative lines/icons are hidden from assistive technology. Motion uses the existing `MotionSafe` wrapper and degrades to static content. All content is present in the initial static HTML; no client-side data request is needed.

## Verification

- Unit tests verify the studio data contains the intended five capabilities, four selected-work records, three experience records, and three open-source records without prohibited personal identity strings.
- Component tests verify Bebilog’s selected-work card points to `/apps/bebilog` and the studio CTA points to `/contact`.
- Browser tests verify each new section is visible on the home page and no rendered page text includes `Petr`, `Guan`, or `PetrGuan`.
- Static build and visual checks confirm the sections integrate with the current Genjux layout at desktop and mobile widths.
