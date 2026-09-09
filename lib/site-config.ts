import { withBasePath } from "@/lib/site-paths";

export type SocialId = "x" | "mastodon" | "bluesky" | "instagram" | "unsplash" | "github";

type SiteConfig = {
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  email: string | null;
  socials: readonly { id: SocialId; label: string; url: string | null }[];
  donations: readonly { name: string; url: string; kind: "monthly" | "once" }[];
};

export const siteConfig: SiteConfig = {
  name: "GenjuxApps",
  displayName: "Genjux",
  tagline: "Independent developer & app maker",
  description: "Thoughtful apps for Mac, iPhone, and iPad. Made by Genjux.",
  email: "genjux1024@gmail.com",
  socials: [
    { id: "x", label: "X", url: "https://x.com/genjux1024" },
    { id: "mastodon", label: "Mastodon", url: null },
    { id: "bluesky", label: "Bluesky", url: null },
    { id: "instagram", label: "Instagram", url: null },
    { id: "unsplash", label: "Unsplash", url: null },
    { id: "github", label: "GitHub", url: "https://github.com/PetrGuan" },
  ],
  donations: [],
};

for (const link of [...siteConfig.socials, ...siteConfig.donations]) {
  if (link.url === null) continue;
  const url = new URL(link.url);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error(`Configure a public HTTPS URL for ${"label" in link ? link.label : link.name}.`);
  }
}

if (siteConfig.email !== null && !/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(siteConfig.email)) {
  throw new Error("Configure a valid public contact email in lib/site-config.ts.");
}

export function getSiteOrigin(): string {
  const value = process.env.SITE_ORIGIN;
  if (!value) {
    throw new Error(
      "SITE_ORIGIN is required. For a local preview, use SITE_ORIGIN=http://localhost:3000.",
    );
  }

  const url = new URL(value);
  const localHttp = url.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (
    (url.protocol !== "https:" && !localHttp) ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error("SITE_ORIGIN must be an HTTPS origin without a path; use NEXT_PUBLIC_BASE_PATH for the path.");
  }

  return url.origin;
}

export function absoluteSiteUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    throw new Error(`Expected an application-relative URL: ${path}`);
  }
  return `${getSiteOrigin()}${withBasePath(path)}`;
}
