import { notFound } from "next/navigation";
import { getPublishedPosts } from "@/lib/content";
import { getBlogMetadata, renderBlogPage } from "@/components/catalog/blog-page";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  // Including the real index route supports a static export even before the first post.
  return [{ slug: [] }, ...posts.map(({ slug }) => ({ slug: [slug] }))];
}

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { slug = [] } = await params;
  if (slug.length > 1) notFound();
  return getBlogMetadata(slug[0], "en");
}

export default async function BlogPage({ params }: Props) {
  const { slug = [] } = await params;
  if (slug.length > 1) notFound();
  return renderBlogPage(slug[0], "en");
}
