# GenjuxApps

The developer website and product catalogue for Genjux: an avatar-led home page,
apps, about, a Markdown blog, donations, supporters, RSS, and contact information.
The individual product sites retain their own design and functionality.

## Languages

English is the first-visit default. Visitors can select Simplified Chinese using
the EN / 中文 control; the site does not select a language from the browser or
location. Existing English URLs stay unchanged, and Chinese versions use
`/zh/...`, including product, privacy, terms, support, and static HTML pages.

The explicit choice is stored locally in the browser as `genjuxapps.locale`.
The same lightweight preference script is used by Next pages and static product
sites. It preserves query strings and page anchors when switching languages and
uses declared language-alternate URLs; it does not translate the DOM or send the
preference to an analytics endpoint. Ordinary requests for localized pages still
expose the requested URL to the hosting provider. If browser storage is unavailable, language links still
work, but the choice cannot be remembered across visits.

English and Chinese have separate root layouts with the corresponding HTML
language. Shared renderers receive an explicit locale, so static export needs no
middleware or server-side language negotiation. Language metadata includes
English, Simplified Chinese, and an English `x-default` alternate.

Nautilus and Pixel Wonders remain static documents. Their Chinese pages are
generated before development/build from the English sources and reviewed
translation dictionaries under `i18n/static/`. Generated `public/zh/` files are
ignored by git; edit the sources and dictionaries, not the generated output.
Real app screenshots, product names, public email addresses, currencies, and
App Store region URLs are preserved rather than invented or region-converted.
Linked external services and separately hosted policies retain their own language
options; the locale switch does not rewrite another site's URLs or content.

## Products

- **Lumadio** — one menu bar for display controls, per-app audio, and reusable Mac scenes. [Available on the Mac App Store](https://apps.apple.com/us/app/lumadio-monitor-app-audio/id6806239533).
- **Bebilog** — a private baby tracker for iOS, with on-device Smart Log, everyday care records, and insights.
- **Nautilus** — a quiet native reader for Hacker News on iOS and iPadOS, with on-device summaries, private briefings, and offline reading.
- **Pixel Wonders** — a nature observation and pixel-painting game for iPhone.
- **NeoWriter** — draft protection, native writing and reading, and optional on-device encryption for cloud vaults and backups.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
SITE_ORIGIN=http://localhost:3000 npm run dev
SITE_ORIGIN=http://localhost:3000 npm run build
```

`SITE_ORIGIN` is the origin only, with no path. It is required for canonical URLs
and RSS links; no production domain is silently assumed. Localhost HTTP is allowed
for previews. Published builds should use the confirmed HTTPS origin.

The existing owner-run commands remain available:

```bash
npm run lint
npm run test
npm run test:e2e
```

Agents run builds only; the owner runs tests. `npm run build` writes the static
production site to `out/` and adds directory index copies for the new main-site
pages. It does not rewrite the existing product pages.

## Deployment

The previously documented GitHub Pages address is
<https://petrguan.github.io/GenjuxApps-Website/>. To prepare a static export for that
origin and path:

```bash
SITE_ORIGIN=https://petrguan.github.io NEXT_PUBLIC_BASE_PATH=/GenjuxApps-Website npm run build:pages
```

For a root-domain host, omit `NEXT_PUBLIC_BASE_PATH` and set `SITE_ORIGIN` to that
host's HTTPS origin. `build:pages` also prepares copied static product links for
the base path. These commands only build local files; publishing `out/` is a
separate step. No new CI workflow or deployment service is required.

## Main-site routes

| Route | Content |
| --- | --- |
| `/` | Personal introduction, a featured app screenshot, and a compact app shelf |
| `/apps` | The product collection |
| `/about` | Introduction maintained in Markdown |
| `/blog` and `/blog/<slug>` | Published posts and article pages |
| `/donate` | Configured external donation methods |
| `/supporters` | Curated, approved public supporter records |
| `/feeds` | RSS subscription directory |
| `/contact` | Public email, social profiles, and existing app-support entry points |

English main-site routes live under `app/(english)/(catalog)/`, with shared
localized views in `components/catalog/`. Chinese routes live under
`app/(chinese)/zh/`. Product views have their own shared renderers and styles.
Old `/#products` and product-name
hash links forward to the corresponding `/apps` section.

## Public profile and donations

Edit `lib/site-config.ts` to set the display name, tagline, public email, exact
social-profile URLs, and external donation destinations. The six social slots
are X, Mastodon, Bluesky, Instagram, Unsplash, and GitHub. The Code button shares
the configured GitHub profile.

Accounts and donation destinations have deliberately not been invented. Until
they are provided, profile controls are explicitly disabled, and Contact/Donate
show an unconfigured state. Set the real public values before launch, or explicitly
decide which unavailable accounts should not be offered.

Donation records use `name`, `url`, and `kind` (`monthly` or `once`). The site links
to the provider's HTTPS page; it does not collect payments or store payment keys.
Keep credentials, private donor data, and sensitive payment information out of
all website and workflow files.

The supplied portrait is served as a locally optimized, metadata-stripped image
at `public/images/avatar.webp`; its source photograph is not in the public root.
Social glyphs are from [Tabler Icons](https://tabler.io/icons), with their MIT
license retained at `public/images/social/LICENSE.txt`.

## Writing and publishing

The website has no CMS. Edit `content/about.md` for the introduction and add
Markdown files under `content/blog/` for articles. About remains unpublished while
its frontmatter has `draft: true`.

Blog frontmatter:

```yaml
---
slug: my-first-post
title: My first post
summary: A short description for the blog list and feed.
publishedAt: "2026-09-07"
draft: true
---
```

Use lowercase hyphenated slugs (`index` is reserved) and explicit ISO dates. An optional `updatedAt`
records a real editorial update without changing the entry's identity. Set
`draft: false` when an article is ready. Drafts and future-dated articles are
excluded from public listings, article routes, and feeds. An empty blog remains
empty; the included draft is an authoring example, not a published article.

Markdown supports ordinary text, headings, links, images, lists, blockquotes,
and fenced code. Raw HTML and executable MDX are not enabled. Use app-relative
rooted paths for local links and images; the content renderer applies the
configured base path. Unknown or malformed metadata fails the build with a
content error rather than silently publishing incomplete content.

Rebuild and publish `out/` after content changes. Future-dated posts do not appear
automatically: this static site has no background publishing scheduler.

The English blog uses `app/(english)/(catalog)/blog/[[...slug]]/page.tsx` for both the index and
article routes. The real `/blog` index is always a generated parameter, so the
installed Next.js version can export an empty blog without a fake published post.

Optional Chinese posts go in `content/blog/zh/` with the same slug and publication
date as their English source, plus translated title, summary, and body. A
translation does not publish a draft English source or create a new publication
identity. When a Chinese translation is absent or still a draft, the Chinese
site displays the English original with a visible “暂无中文译文” notice and marks
the article body as English. `content/about.zh.md` provides the Chinese About
content; it can fall back to the English introduction with the same explicit notice.

## Supporters and announcements

`content/supporters.json` contains an array of public supporter records. Fields:
`name`, optional `url`, optional `logo`, optional `group`, `status` (`current` or
`former`), and `approved`. An optional `groupZh` localizes a group label without
altering a person's public name. Only approved entries are displayed. Do not commit a
private donor list, transaction data, or information awaiting display permission.

`content/announcements.json` contains app launches, public-project announcements,
and release notes. Each entry has a stable `id`, `kind` (`app`, `repo`, or
`release`), `title`, `summary`, and `publishedAt`. App and release entries identify
an existing `appSlug`; repository entries provide a public HTTPS `url`. An
optional `version` describes a release.

Announcement title and summary are the English source; an optional
`translations.zh` object can provide Chinese `title` and `summary`. Chinese feeds
retain untranslated announcements with an explicit notice rather than inventing
a translation or omitting the announcement.

Keep IDs and publication dates stable. Do not use the build date as a release
date or add imaginary history for existing apps. Both data files start empty.

## RSS feeds

| Feed | Entries |
| --- | --- |
| `/rss.xml` | Published blog posts |
| `/rss-apps.xml` | New-app announcements |
| `/rss-repos.xml` | Selected public-project announcements |
| `/apps/<slug>/rss.xml` | Release notes for that app |

These are real static RSS 2.0 XML files generated by `next build`. Every feed is
usable with an empty item list until content is published. The feed directory
shows whether entries are available. Posts, listings, and feeds share the same
validated local content source; builds do not fetch accounts or sponsor data.
RSS links and article assets include the configured origin and base path.
Chinese counterparts use `/zh/rss.xml`, `/zh/rss-apps.xml`, `/zh/rss-repos.xml`,
and `/zh/apps/<slug>/rss.xml`. Existing English subscription URLs remain valid.

## Product routes

- `/apps/lumadio` — Lumadio’s product site.
- `/apps/lumadio/privacy` — Lumadio’s privacy policy.
- `/apps/lumadio/support` — Lumadio support and troubleshooting.
- `/apps/lumadio/terms` — Lumadio’s terms of use.
- `/apps/bebilog` — Bebilog’s English site.
- `/apps/bebilog/en` and `/apps/bebilog/zh` — Bebilog locale routes.
- `/apps/nautilus/index.html` — Nautilus’s original static site.
- `/apps/nautilus/editions.html` — Nautilus’s original Editions page.
- `/apps/pixel-wonders/index.html` — Pixel Wonders’ product site.
- `/apps/neowriter` — NeoWriter's writing, recovery, privacy, FAQ, and contact page.
- `/apps/neowriter/privacy` — NeoWriter's full-platform privacy policy.
- `/apps/neowriter/terms` — NeoWriter's terms of use and conditional store-purchase information.
- `/apps/neowriter/support` — Contact, voluntary diagnostics, and safe troubleshooting guidance.
- `/apps/neowriter/rss.xml` — NeoWriter's release-note feed.

## Product source and assets

Some product sites are copied from their respective local sibling projects.

The Genjux product-card previews live in `public/products/`. Bebilog’s migrated source and media are in `components/bebilog/` and `public/apps/bebilog/`; Nautilus’s and Pixel Wonders’ original static documents and media are in `public/apps/`. Update these copies deliberately when their source marketing sites change.

NeoWriter's localized shared product views and styles live in `components/neowriter/`,
with English route wrappers under `app/(english)/apps/neowriter/`.
Its local icon is derived from the NeoWriter project's current AppIcon asset.
The hero uses the owner's real iPhone library and Mac workspace screenshots,
optimized locally as `ios-screenshot.webp` and `mac-screenshot.webp` without
altering their contents. Both are upright and open at full size when selected.
Product copy follows the
source project's brand guide, current user manual, and AI request boundaries.
No public store URL or launch date is assumed: release inquiries use the configured
website contact email. The export step also creates `out/apps/neowriter/index.html`
so the product URL works alongside its icon and RSS directory on static hosts.

NeoWriter's product, privacy, terms, and support pages share a scoped layout,
navigation, and footer. The legal pages reflect the owner's confirmed model:
no developer-operated writing backend or AI relay, no automatic statistics or
diagnostic upload, and support reports sent voluntarily by email. They distinguish
this from user-enabled sync, external AI, WordPress publishing, and local Wi-Fi
transfers. No unconfirmed App Store age rating, release date, jurisdiction, fixed
price, or refund guarantee is asserted.

The website documents do not update the separate NeoWriter repository's old
policy or privacy manifest, nor do they submit App Store privacy labels. Review
the legal wording and required store disclosures before public distribution.

NeoWriter's marketing leads with three strengths: preserving drafts, fluid native
writing/reading, and encrypted cloud copies. The 60/120 Hz figures are explicitly
labeled engineering targets, not achieved benchmark results. Encryption claims
apply to selected encrypted vault/backup modes, not all sync, exports, or local
storage; storage metadata and pre-existing readable copies remain relevant.
Source issue threads are private, so the public page does not link to them or
fetch private GitHub data at build/runtime.
