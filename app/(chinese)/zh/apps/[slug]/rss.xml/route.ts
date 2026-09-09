import { productSlugs } from "@/lib/products";
import { renderProductFeed } from "@/lib/site-feeds";
export const dynamic = "force-static";
export const dynamicParams = false;
export function generateStaticParams() { return productSlugs.map((slug) => ({ slug })); }
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  return renderProductFeed((await params).slug, "zh");
}
