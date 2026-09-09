import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import { cache } from "react";
import type { Product } from "@/lib/products";
import { getProduct } from "@/lib/products";
import { withBasePath } from "@/lib/site-paths";
import { localizedHref, type SiteLocale } from "@/i18n/routing.mjs";

export type Post = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  updatedAt?: string;
  html: string;
  readingMinutes: number;
  contentLocale: SiteLocale;
};

export type Supporter = {
  name: string;
  url?: string;
  logo?: string;
  group?: string;
  groupZh?: string;
  status: "current" | "former";
  approved: boolean;
};

export type Announcement = {
  id: string;
  kind: "app" | "repo" | "release";
  title: string;
  summary: string;
  publishedAt: string;
  url?: string;
  appSlug?: Product["slug"];
  version?: string;
  translations?: { zh: { title: string; summary: string } };
  contentLocale?: SiteLocale;
};

type ParsedPost = Omit<Post, "html"> & {
  markdown: string;
  sourceFile: string;
  draft: boolean;
  publishedAtMs: number;
};

type ParsedAnnouncement = Announcement & {
  publishedAtMs: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const ABOUT_FILE = path.join(CONTENT_DIR, "about.md");
const SUPPORTERS_FILE = path.join(CONTENT_DIR, "supporters.json");
const ANNOUNCEMENTS_FILE = path.join(CONTENT_DIR, "announcements.json");

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const UTC_ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?Z$/;
const URL_SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

function toRelativeFilePath(filePath: string): string {
  return path.relative(process.cwd(), filePath) || filePath;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseFrontmatter(source: string, filePath: string) {
  const normalized = source.replace(/^\uFEFF/, "");
  if (normalized.startsWith("---") && normalized.split(/\r?\n/, 1)[0].trim() !== "---") {
    throw new Error(`${toRelativeFilePath(filePath)}: only YAML frontmatter with a bare "---" delimiter is supported.`);
  }
  try {
    return matter(normalized, { language: "yaml" });
  } catch (error) {
    if (!(error instanceof Error) || error.name !== "YAMLException") throw error;
    throw new Error(`${toRelativeFilePath(filePath)}: invalid YAML frontmatter.`, { cause: error });
  }
}

function ensureNonEmptyString(value: unknown, field: string, filePath: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${toRelativeFilePath(filePath)}: "${field}" must be a non-empty string.`);
  }
  return value.trim();
}

function readOptionalString(
  data: Record<string, unknown>,
  field: string,
  filePath: string,
): string | undefined {
  if (!(field in data) || data[field] === undefined || data[field] === null) {
    return undefined;
  }
  return ensureNonEmptyString(data[field], field, filePath);
}

function normalizeBasePath(basePath: string): string {
  if (!basePath || basePath === "/") return "";
  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

function withBasePathOnce(urlPath: string): string {
  if (!urlPath.startsWith("/") || urlPath.startsWith("//") || urlPath.includes("\\")) {
    throw new Error(`Expected an application-relative URL path, received "${urlPath}".`);
  }

  const normalizedBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");
  if (normalizedBasePath && (urlPath === normalizedBasePath || urlPath.startsWith(`${normalizedBasePath}/`))) {
    return urlPath;
  }
  return withBasePath(urlPath);
}

function parseDateField(value: unknown, field: string, filePath: string): { value: string; timestamp: number } {
  if (typeof value !== "string") {
    throw new Error(
      `${toRelativeFilePath(filePath)}: "${field}" must be a quoted ISO string (YYYY-MM-DD or UTC ISO).`,
    );
  }

  const trimmed = value.trim();
  let parseTarget: string;
  if (ISO_DATE_PATTERN.test(trimmed)) {
    parseTarget = `${trimmed}T00:00:00.000Z`;
  } else if (UTC_ISO_PATTERN.test(trimmed)) {
    parseTarget = trimmed;
  } else {
    throw new Error(
      `${toRelativeFilePath(filePath)}: "${field}" must use YYYY-MM-DD or UTC ISO format (for example 2026-01-30T12:00:00Z).`,
    );
  }

  const timestamp = Date.parse(parseTarget);
  if (
    !Number.isFinite(timestamp) ||
    new Date(timestamp).toISOString().slice(0, 10) !== trimmed.slice(0, 10)
  ) {
    throw new Error(`${toRelativeFilePath(filePath)}: "${field}" is not a valid date value.`);
  }

  return { value: trimmed, timestamp };
}

function validatePublicUrl(value: string, field: string, filePath: string, allowRelativePath: boolean): string {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    throw new Error(`${toRelativeFilePath(filePath)}: "${field}" must not be empty.`);
  }

  if (URL_SCHEME_PATTERN.test(trimmed)) {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" || url.username || url.password) {
      throw new Error(`${toRelativeFilePath(filePath)}: "${field}" must be a public HTTPS URL.`);
    }
    return trimmed;
  }

  if (!allowRelativePath || !trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
    throw new Error(`${toRelativeFilePath(filePath)}: "${field}" must be HTTPS or an application-relative path.`);
  }

  return trimmed;
}

function rewriteMarkdownUrl(url: string, documentPath: string, locale: SiteLocale, image: boolean): string {
  if (
    url.startsWith("#") ||
    url.startsWith("?") ||
    url.startsWith("//") ||
    URL_SCHEME_PATTERN.test(url)
  ) {
    return url;
  }

  const documentBase = `https://local.genjuxapps${documentPath.endsWith("/") ? documentPath : `${documentPath}/`}`;
  const resolved = new URL(url, documentBase);
  const pathname = resolved.pathname;
  const isAsset = image || /\.[a-z0-9]+$/i.test(pathname) && !/\.html$/i.test(pathname);
  const target = isAsset ? withBasePathOnce(pathname) : localizedHref(pathname, locale);
  return `${target}${resolved.search}${resolved.hash}`;
}

function visitTree(node: unknown, visitor: (value: Record<string, unknown>) => void): void {
  if (!isRecord(node)) return;

  visitor(node);
  const children = node.children;
  if (Array.isArray(children)) {
    for (const child of children) {
      visitTree(child, visitor);
    }
  }
}

function markdownLinkRewritePlugin(documentPath: string, locale: SiteLocale) {
  return () => {
    return (tree: unknown) => {
      visitTree(tree, (node) => {
        const type = typeof node.type === "string" ? node.type : "";
        if ((type === "link" || type === "image" || type === "definition") && typeof node.url === "string") {
          node.url = rewriteMarkdownUrl(node.url, documentPath, locale, type === "image");
        }
      });
    };
  };
}

async function renderMarkdown(markdown: string, documentPath: string, locale: SiteLocale = "en"): Promise<string> {
  const rendered = await remark()
    .use(markdownLinkRewritePlugin(documentPath, locale))
    .use(remarkHtml, { sanitize: true })
    .process(markdown);
  return String(rendered);
}

function estimateReadingMinutes(markdown: string, locale: SiteLocale): number {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = Array.from(new Intl.Segmenter(locale, { granularity: "word" }).segment(plainText))
    .filter((segment) => segment.isWordLike).length;
  return Math.max(1, Math.ceil(wordCount / 220));
}

function compareByDateDescThenStableId(
  a: { publishedAtMs: number; slug?: string; id?: string },
  b: { publishedAtMs: number; slug?: string; id?: string },
): number {
  if (a.publishedAtMs !== b.publishedAtMs) {
    return b.publishedAtMs - a.publishedAtMs;
  }
  return (a.slug ?? a.id ?? "").localeCompare(b.slug ?? b.id ?? "");
}

async function parsePostFile(filePath: string, locale: SiteLocale): Promise<ParsedPost> {
  const source = await fs.readFile(filePath, "utf8");
  const parsed = parseFrontmatter(source, filePath);
  const data: Record<string, unknown> = isRecord(parsed.data) ? parsed.data : {};
  const relativePath = toRelativeFilePath(filePath);

  const slug = ensureNonEmptyString(data.slug, "slug", filePath);
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`${relativePath}: "slug" must be kebab-case alphanumeric text.`);
  }
  if (slug === "index") {
    throw new Error(`${relativePath}: "index" is reserved for the static blog directory.`);
  }

  const title = ensureNonEmptyString(data.title, "title", filePath);
  const summary = ensureNonEmptyString(data.summary, "summary", filePath);
  const publishedAt = parseDateField(data.publishedAt, "publishedAt", filePath);

  const updatedAtRaw = readOptionalString(data, "updatedAt", filePath);
  const updatedAt = updatedAtRaw ? parseDateField(updatedAtRaw, "updatedAt", filePath) : undefined;
  if (updatedAt && updatedAt.timestamp < publishedAt.timestamp) {
    throw new Error(`${relativePath}: "updatedAt" must not be earlier than "publishedAt".`);
  }

  const draftRaw = data.draft;
  if (draftRaw !== undefined && typeof draftRaw !== "boolean") {
    throw new Error(`${relativePath}: "draft" must be a boolean value when provided.`);
  }
  const draft = draftRaw === true;

  return {
    slug,
    title,
    summary,
    publishedAt: publishedAt.value,
    updatedAt: updatedAt?.value,
    markdown: parsed.content,
    sourceFile: relativePath,
    contentLocale: locale,
    readingMinutes: estimateReadingMinutes(parsed.content, locale),
    draft,
    publishedAtMs: publishedAt.timestamp,
  };
}

const loadAllPosts = cache(async (locale: SiteLocale): Promise<ParsedPost[]> => {
  const directory = locale === "zh" ? path.join(BLOG_DIR, "zh") : BLOG_DIR;
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(directory, entry.name))
    .sort((a, b) => a.localeCompare(b));

  const posts: ParsedPost[] = [];
  const slugToFile = new Map<string, string>();

  for (const filePath of markdownFiles) {
    const post = await parsePostFile(filePath, locale);
    const existingFile = slugToFile.get(post.slug);
    if (existingFile) {
      throw new Error(
        `Duplicate post slug "${post.slug}" found in ${existingFile} and ${toRelativeFilePath(filePath)}.`,
      );
    }
    slugToFile.set(post.slug, toRelativeFilePath(filePath));
    posts.push(post);
  }

  posts.sort(compareByDateDescThenStableId);
  return posts;
});

async function toPublicPost(post: ParsedPost, locale: SiteLocale): Promise<Post> {
  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    html: await renderMarkdown(post.markdown, `/blog/${post.slug}/`, locale),
    readingMinutes: post.readingMinutes,
    contentLocale: post.contentLocale,
  };
}

export async function getPublishedPosts(locale: SiteLocale = "en"): Promise<Post[]> {
  const now = Date.now();
  const posts = await loadAllPosts("en");
  const translations = locale === "zh" ? await loadAllPosts("zh") : [];
  const translatedBySlug = new Map(translations.map((post) => [post.slug, post]));
  for (const translation of translations) {
    const original = posts.find((post) => post.slug === translation.slug);
    if (!original) throw new Error(`${translation.sourceFile}: no English source exists for "${translation.slug}".`);
    if (original.publishedAtMs !== translation.publishedAtMs) {
      throw new Error(`${translation.sourceFile}: publishedAt must match the English source.`);
    }
  }
  return Promise.all(posts.filter((post) => !post.draft && post.publishedAtMs <= now).map((post) => {
    const translation = translatedBySlug.get(post.slug);
    return toPublicPost(translation && !translation.draft && translation.publishedAtMs <= now ? translation : post, locale);
  }));
}

export async function getPost(slug: string, locale: SiteLocale = "en"): Promise<Post | undefined> {
  if (!SLUG_PATTERN.test(slug)) {
    return undefined;
  }

  const posts = await getPublishedPosts(locale);
  return posts.find((post) => post.slug === slug);
}

const loadAboutContent = cache(async (locale: SiteLocale) => {
  const file = locale === "zh" ? path.join(CONTENT_DIR, "about.zh.md") : ABOUT_FILE;
  const source = await fs.readFile(file, "utf8");
  const parsed = parseFrontmatter(source, file);
  const data: Record<string, unknown> = isRecord(parsed.data) ? parsed.data : {};
  const draftRaw = data.draft;

  if (draftRaw !== undefined && typeof draftRaw !== "boolean") {
    throw new Error(`${toRelativeFilePath(file)}: "draft" must be a boolean value when provided.`);
  }

  return { markdown: parsed.content, draft: draftRaw === true, contentLocale: locale };
});

export async function getAboutContent(locale: SiteLocale = "en") {
  const selected = await loadAboutContent(locale);
  const content = locale === "zh" && selected.draft ? await loadAboutContent("en") : selected;
  return { html: await renderMarkdown(content.markdown, "/about/", locale), draft: content.draft, contentLocale: content.contentLocale };
}

const loadSupportersData = cache(async (): Promise<Supporter[]> => {
  const source = await fs.readFile(SUPPORTERS_FILE, "utf8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(source);
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    throw new Error(`${toRelativeFilePath(SUPPORTERS_FILE)}: invalid JSON.`, { cause: error });
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`${toRelativeFilePath(SUPPORTERS_FILE)}: expected a JSON array.`);
  }

  return parsed.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`${toRelativeFilePath(SUPPORTERS_FILE)}: entry ${index} must be an object.`);
    }

    const name = ensureNonEmptyString(entry.name, "name", SUPPORTERS_FILE);
    const status = ensureNonEmptyString(entry.status, "status", SUPPORTERS_FILE);
    if (status !== "current" && status !== "former") {
      throw new Error(`${toRelativeFilePath(SUPPORTERS_FILE)}: entry ${index} has invalid status "${status}".`);
    }

    if (typeof entry.approved !== "boolean") {
      throw new Error(`${toRelativeFilePath(SUPPORTERS_FILE)}: entry ${index} requires boolean "approved".`);
    }

    const urlRaw = readOptionalString(entry, "url", SUPPORTERS_FILE);
    const logoRaw = readOptionalString(entry, "logo", SUPPORTERS_FILE);
    const groupRaw = readOptionalString(entry, "group", SUPPORTERS_FILE);

    return {
      name,
      status,
      approved: entry.approved,
      url: urlRaw ? validatePublicUrl(urlRaw, `url (entry ${index})`, SUPPORTERS_FILE, true) : undefined,
      logo: logoRaw ? validatePublicUrl(logoRaw, `logo (entry ${index})`, SUPPORTERS_FILE, true) : undefined,
      group: groupRaw,
      groupZh: readOptionalString(entry, "groupZh", SUPPORTERS_FILE),
    };
  });
});

export async function getSupporters(locale: SiteLocale = "en"): Promise<Supporter[]> {
  const supporters = await loadSupportersData();
  return supporters.filter((supporter) => supporter.approved).map((supporter) => (
    locale === "zh" && supporter.groupZh ? { ...supporter, group: supporter.groupZh } : supporter
  ));
}

function validateAnnouncementEntry(entry: unknown, index: number): ParsedAnnouncement {
  if (!isRecord(entry)) {
    throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: entry ${index} must be an object.`);
  }

  const id = ensureNonEmptyString(entry.id, "id", ANNOUNCEMENTS_FILE);
  if (!ID_PATTERN.test(id)) {
    throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: entry ${index} id "${id}" must be kebab-case.`);
  }

  const kind = ensureNonEmptyString(entry.kind, "kind", ANNOUNCEMENTS_FILE);
  if (kind !== "app" && kind !== "repo" && kind !== "release") {
    throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: entry ${index} has unsupported kind "${kind}".`);
  }

  const title = ensureNonEmptyString(entry.title, "title", ANNOUNCEMENTS_FILE);
  const summary = ensureNonEmptyString(entry.summary, "summary", ANNOUNCEMENTS_FILE);
  const publishedAt = parseDateField(entry.publishedAt, "publishedAt", ANNOUNCEMENTS_FILE);
  const appSlugRaw = readOptionalString(entry, "appSlug", ANNOUNCEMENTS_FILE);
  const urlRaw = readOptionalString(entry, "url", ANNOUNCEMENTS_FILE);
  const version = readOptionalString(entry, "version", ANNOUNCEMENTS_FILE);
  let translations: Announcement["translations"];
  if (entry.translations !== undefined) {
    if (!isRecord(entry.translations) || !isRecord(entry.translations.zh)) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: entry ${index} translations must contain a zh object.`);
    }
    translations = { zh: {
      title: ensureNonEmptyString(entry.translations.zh.title, "translations.zh.title", ANNOUNCEMENTS_FILE),
      summary: ensureNonEmptyString(entry.translations.zh.summary, "translations.zh.summary", ANNOUNCEMENTS_FILE),
    } };
  }

  const product = appSlugRaw ? getProduct(appSlugRaw) : undefined;
  if (appSlugRaw && !product) {
    throw new Error(
      `${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: entry ${index} references unknown appSlug "${appSlugRaw}".`,
    );
  }
  const appSlug = product?.slug;

  if (kind === "app") {
    if (!appSlug) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: app entry ${index} must include "appSlug".`);
    }
    if (version) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: app entry ${index} cannot include "version".`);
    }
    if (urlRaw) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: app entry ${index} must not override "url".`);
    }
  }

  if (kind === "repo") {
    if (!urlRaw) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: repo entry ${index} must include "url".`);
    }
    if (appSlug) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: repo entry ${index} must not include "appSlug".`);
    }
    if (version) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: repo entry ${index} must not include "version".`);
    }
  }

  if (kind === "release" && !appSlug) {
    throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: release entry ${index} must include "appSlug".`);
  }

  const url = urlRaw ? validatePublicUrl(urlRaw, `url (entry ${index})`, ANNOUNCEMENTS_FILE, kind !== "repo") : undefined;

  return {
    id,
    kind,
    title,
    summary,
    publishedAt: publishedAt.value,
    url,
    appSlug,
    version,
    translations,
    publishedAtMs: publishedAt.timestamp,
  };
}

const loadAnnouncementsData = cache(async (): Promise<ParsedAnnouncement[]> => {
  const source = await fs.readFile(ANNOUNCEMENTS_FILE, "utf8");
  let parsed: unknown;
  try {
    parsed = JSON.parse(source);
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: invalid JSON.`, { cause: error });
  }

  if (!Array.isArray(parsed)) {
    throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: expected a JSON array.`);
  }

  const entries = parsed.map(validateAnnouncementEntry);
  const idSet = new Set<string>();
  for (const entry of entries) {
    if (idSet.has(entry.id)) {
      throw new Error(`${toRelativeFilePath(ANNOUNCEMENTS_FILE)}: duplicate id "${entry.id}".`);
    }
    idSet.add(entry.id);
  }

  entries.sort(compareByDateDescThenStableId);
  return entries;
});

export async function getAnnouncements(locale: SiteLocale = "en"): Promise<Announcement[]> {
  const now = Date.now();
  const announcements = await loadAnnouncementsData();
  return announcements
    .filter((announcement) => announcement.publishedAtMs <= now)
    .map(({ publishedAtMs: _publishedAtMs, ...announcement }): Announcement => {
      const translated = locale === "zh" ? announcement.translations?.zh : undefined;
      return { ...announcement, ...translated, contentLocale: translated ? "zh" : "en" };
    });
}
