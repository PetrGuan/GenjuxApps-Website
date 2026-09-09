import "server-only";
import { getAnnouncements, getPublishedPosts } from "@/lib/content";
import { getProduct } from "@/lib/products";
import { buildRssXml, rssResponse, type RssItem } from "@/lib/rss";
import { siteConfig } from "@/lib/site-config";
import { htmlLanguage, localePath, localizedHref, type SiteLocale } from "@/i18n/routing.mjs";

export type SiteFeed = "blog" | "apps" | "repos";

export async function renderSiteFeed(kind: SiteFeed, locale: SiteLocale = "en") {
  let items: RssItem[];
  if (kind === "blog") {
    items = (await getPublishedPosts(locale)).map((post) => ({
      guid: `post:${post.slug}`,
      title: post.title,
      description: locale === "zh" && post.contentLocale === "en" ? `暂无中文译文。${post.summary}` : post.summary,
      link: localePath(`/blog/${post.slug}`, locale),
      publishedAt: post.publishedAt,
      language: htmlLanguage(post.contentLocale),
    }));
  } else {
    items = (await getAnnouncements(locale))
      .filter((entry) => entry.kind === (kind === "apps" ? "app" : "repo"))
      .map((entry) => {
        const destination = kind === "apps" ? (entry.appSlug && getProduct(entry.appSlug)?.route) : entry.url;
        if (!destination) throw new Error(`Announcement ${entry.id} requires a destination.`);
        return {
          guid: `${kind === "apps" ? "app" : "repo"}:${entry.id}`,
          title: entry.title,
          description: locale === "zh" && entry.contentLocale === "en" ? `暂无中文译文。${entry.summary}` : entry.summary,
          link: kind === "apps" ? localizedHref(destination, locale) : destination,
          publishedAt: entry.publishedAt,
          language: htmlLanguage(entry.contentLocale ?? "en"),
        };
      });
  }
  const names = locale === "zh" ? { blog: "博客", apps: "新应用", repos: "新项目" } : { blog: "Blog", apps: "New Apps", repos: "New Projects" };
  const descriptions = locale === "zh"
    ? { blog: `${siteConfig.name} 发布的文章。`, apps: `${siteConfig.name} 的新应用公告。`, repos: `${siteConfig.name} 的公开项目公告。` }
    : { blog: `Published writing from ${siteConfig.name}.`, apps: `New app launch announcements from ${siteConfig.name}.`, repos: `Public project announcements from ${siteConfig.name}.` };
  const paths = { blog: "/rss.xml", apps: "/rss-apps.xml", repos: "/rss-repos.xml" };
  return rssResponse(buildRssXml({
    title: `${siteConfig.name} ${names[kind]}`,
    description: descriptions[kind],
    feedPath: localePath(paths[kind], locale),
    sitePath: localePath(kind === "blog" ? "/blog" : kind === "apps" ? "/apps" : "/feeds", locale),
    language: htmlLanguage(locale),
    items,
  }));
}

export async function renderProductFeed(slug: string, locale: SiteLocale = "en") {
  const product = getProduct(slug);
  if (!product) return new Response(locale === "zh" ? "找不到此应用。" : "Not found.", { status: 404 });
  const entries = (await getAnnouncements(locale)).filter((entry) => entry.kind === "release" && entry.appSlug === slug);
  return rssResponse(buildRssXml({
    title: `${siteConfig.name} - ${product.name} ${locale === "zh" ? "更新日志" : "Releases"}`,
    description: locale === "zh" ? `${product.name} 的版本更新与发布说明。` : `Release notes and updates for ${product.name}.`,
    feedPath: localePath(`/apps/${slug}/rss.xml`, locale),
    sitePath: localizedHref(product.route, locale),
    language: htmlLanguage(locale),
    items: entries.map((entry) => ({
      guid: `release:${entry.id}`,
      title: entry.version ? `${entry.title} (${entry.version})` : entry.title,
      description: locale === "zh" && entry.contentLocale === "en" ? `暂无中文译文。${entry.summary}` : entry.summary,
      link: entry.url ? localizedHref(entry.url, locale) : localizedHref(product.route, locale),
      publishedAt: entry.publishedAt,
      language: htmlLanguage(entry.contentLocale ?? "en"),
    })),
  }));
}
