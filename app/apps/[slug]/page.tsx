import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageContent from "@/components/product-page-content";
import { getProduct, productSlugs } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  return product
    ? {
        title: `${product.name} — Genjux`,
        description: product.description,
      }
    : {};
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
