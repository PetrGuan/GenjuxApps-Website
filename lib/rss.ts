import "server-only";

import { absoluteSiteUrl, getSiteOrigin } from "@/lib/site-config";

export type RssItem = {
  guid: string;
  title: string;
  description: string;
  link: string;
  publishedAt: string;
  language?: "en" | "zh-Hans";
};

export type RssFeed = {
  title: string;
  description: string;
  feedPath: string;
  sitePath: string;
  items: RssItem[];
  language?: "en" | "zh-Hans";
};

const URL_SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

function normalizeBasePath(basePath: string): string {
  if (!basePath || basePath === "/") return "";
  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

function ensureText(value: string, field: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`RSS field "${field}" must be a non-empty string.`);
  }
  return trimmed;
}

function escapeXml(value: string): string {
  for (const character of value) {
    const code = character.codePointAt(0);
    if (
      code === undefined ||
      (code < 0x20 && code !== 0x9 && code !== 0xa && code !== 0xd) ||
      (code >= 0xd800 && code <= 0xdfff) ||
      code === 0xfffe ||
      code === 0xffff
    ) {
      throw new Error("RSS text contains a character that is not valid in XML 1.0.");
    }
  }
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toAbsoluteSitePath(url: string): string {
  if (URL_SCHEME_PATTERN.test(url)) {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password) {
      throw new Error(`Unsupported feed URL protocol for "${url}".`);
    }
    return url;
  }

  if (!url.startsWith("/") || url.startsWith("//") || url.includes("\\")) {
    throw new Error(`Expected rooted application URL path, received "${url}".`);
  }

  const normalizedBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? "");
  if (normalizedBasePath && (url === normalizedBasePath || url.startsWith(`${normalizedBasePath}/`))) {
    return `${getSiteOrigin()}${url}`;
  }

  return absoluteSiteUrl(url);
}

function toRssDate(value: string, field: string): string {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    throw new Error(`RSS field "${field}" must contain a valid ISO date string.`);
  }
  return new Date(timestamp).toUTCString();
}

export function buildRssXml(feed: RssFeed): string {
  const channelTitle = ensureText(feed.title, "title");
  const channelDescription = ensureText(feed.description, "description");
  const selfUrl = toAbsoluteSitePath(feed.feedPath);
  const channelLink = toAbsoluteSitePath(feed.sitePath);

  const normalizedItems = feed.items.map((item, index) => ({
    guid: ensureText(item.guid, `items[${index}].guid`),
    title: ensureText(item.title, `items[${index}].title`),
    description: ensureText(item.description, `items[${index}].description`),
    link: toAbsoluteSitePath(item.link),
    publishedAt: item.publishedAt,
    publishedAtMs: Date.parse(item.publishedAt),
    pubDate: toRssDate(item.publishedAt, `items[${index}].publishedAt`),
    language: item.language,
  }));

  normalizedItems.sort((a, b) => {
    if (a.publishedAtMs !== b.publishedAtMs) return b.publishedAtMs - a.publishedAtMs;
    return a.guid.localeCompare(b.guid);
  });

  const itemXml = normalizedItems
    .map(
      (item) =>
        [
          `    <item${item.language ? ` xml:lang="${escapeXml(item.language)}"` : ""}>`,
          `      <title>${escapeXml(item.title)}</title>`,
          `      <link>${escapeXml(item.link)}</link>`,
          `      <guid isPermaLink="false">${escapeXml(item.guid)}</guid>`,
          `      <pubDate>${escapeXml(item.pubDate)}</pubDate>`,
          `      <description>${escapeXml(item.description)}</description>`,
          "    </item>",
        ].join("\n"),
    )
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(channelTitle)}</title>`,
    `    <link>${escapeXml(channelLink)}</link>`,
    `    <description>${escapeXml(channelDescription)}</description>`,
    `    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${escapeXml(new Date().toUTCString())}</lastBuildDate>`,
    `    <language>${escapeXml(feed.language ?? "en")}</language>`,
    itemXml,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}

export function rssResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
