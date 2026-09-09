import { notFound } from "next/navigation";
import CatalogLayout, { catalogViewport } from "@/components/catalog/layout";
import { getCatalogMetadata, renderCatalogPage } from "@/components/catalog/pages";
import { getBlogMetadata, renderBlogPage } from "@/components/catalog/blog-page";
import BebilogSite from "@/components/bebilog/BebilogSite";
import { getBebilogMetadata, bebilogViewport } from "@/components/bebilog/metadata";
import { getLumadioMetadata, renderLumadioPage, lumadioViewport } from "@/components/lumadio/pages";
import { getNeoWriterMetadata, renderNeoWriterPage, neoWriterViewport } from "@/components/neowriter/pages";
import { pageRoutes } from "@/i18n/page-routes.mjs";
import { getPublishedPosts } from "@/lib/content";

export const dynamicParams = false;
type Props = { params: Promise<{ path?: string[] }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return [
    ...pageRoutes.map(({ path }) => ({ path: path === "/" ? [] : path.slice(1).split("/") })),
    ...posts.map(({ slug }) => ({ path: ["blog", slug] })),
  ];
}

export async function generateMetadata({ params }: Props) {
  const segments = (await params).path ?? [];
  if (segments[0] === "blog" && segments.length === 2) return getBlogMetadata(segments[1], "zh");
  const entry = pageRoutes.find(({ path }) => path === `/${segments.join("/")}`);
  if (!entry) notFound();
  switch (entry.family) {
    case "catalog": return getCatalogMetadata(entry.page, "zh");
    case "bebilog": return getBebilogMetadata("zh");
    case "lumadio": return getLumadioMetadata(entry.page, "zh");
    case "neowriter": return getNeoWriterMetadata(entry.page, "zh");
  }
}

export async function generateViewport({ params }: Props) {
  const segments = (await params).path ?? [];
  if (segments[0] === "apps") {
    if (segments[1] === "neowriter") return neoWriterViewport;
    if (segments[1] === "lumadio") return lumadioViewport;
    if (segments[1] === "bebilog") return bebilogViewport;
  }
  return catalogViewport;
}

export default async function ChinesePage({ params }: Props) {
  const segments = (await params).path ?? [];
  if (segments[0] === "blog" && segments.length === 2) {
    return <CatalogLayout locale="zh">{await renderBlogPage(segments[1], "zh")}</CatalogLayout>;
  }
  const entry = pageRoutes.find(({ path }) => path === `/${segments.join("/")}`);
  if (!entry) notFound();
  switch (entry.family) {
    case "catalog": return <CatalogLayout locale="zh">{renderCatalogPage(entry.page, "zh")}</CatalogLayout>;
    case "bebilog": return <BebilogSite locale="zh" />;
    case "lumadio": return renderLumadioPage(entry.page, "zh");
    case "neowriter": return renderNeoWriterPage(entry.page, "zh");
  }
}
