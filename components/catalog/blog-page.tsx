import { notFound } from "next/navigation";
import BlogIndex from "@/components/blog-index";
import BlogPost from "@/components/blog-post";
import { getPost } from "@/lib/content";
import { mainSiteMetadata } from "@/lib/site-metadata";
import { getCatalogMetadata } from "./pages";
import type { SiteLocale } from "@/i18n/routing.mjs";

export async function getBlogMetadata(slug: string | undefined, locale: SiteLocale) {
  if (!slug) return getCatalogMetadata("blog", locale);
  const post = await getPost(slug, locale);
  if (!post) notFound();
  const metadata = mainSiteMetadata(post.title, post.summary, `/blog/${post.slug}`, locale);
  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "article" as const, publishedTime: post.publishedAt, modifiedTime: post.updatedAt },
  };
}

export async function renderBlogPage(slug: string | undefined, locale: SiteLocale) {
  if (!slug) return <BlogIndex locale={locale} />;
  const post = await getPost(slug, locale);
  if (!post) notFound();
  return <BlogPost post={post} locale={locale} />;
}
