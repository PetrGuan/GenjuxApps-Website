/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductPageContentProps = {
  product: Product;
};

export default function ProductPageContent({ product }: ProductPageContentProps) {
  return (
    <article className="product-page" data-accent={product.accent}>
      <section className="product-page-hero page-shell">
        <div className="product-page-copy">
          <p className="eyebrow">{product.platform}</p>
          <div className="product-page-identity">
            <img alt="" src={product.assets.icon} />
            <h1>{product.name}</h1>
          </div>
          <p className="product-page-tagline">{product.tagline}</p>
          <p className="product-page-description">{product.description}</p>
          <a
            aria-label={`Download ${product.name} on the App Store`}
            className="store-link"
            href={product.appStoreUrl}
            rel="noreferrer"
            target="_blank"
          >
            <img alt="Download on the App Store" src={product.assets.appStoreBadge} />
          </a>
        </div>
        <div className="product-page-artwork">
          <div className="product-page-grid" aria-hidden="true" />
          <img alt={`${product.name} app screen`} src={product.assets.hero} />
        </div>
      </section>
      <section className="product-capabilities page-shell" aria-labelledby={`${product.slug}-capabilities`}>
        <div>
          <p className="eyebrow">DESIGNED WITH INTENT</p>
          <h2 id={`${product.slug}-capabilities`}>The useful details stay close.</h2>
        </div>
        <ul>
          {product.capabilities.map((capability, index) => (
            <li key={capability}>
              <span>0{index + 1}</span>
              {capability}
            </li>
          ))}
        </ul>
      </section>
      <section className="product-privacy page-shell">
        <p className="eyebrow">PRIVATE BY CONSTRUCTION</p>
        <p>
          {product.name} is designed to keep the experience personal: no ads, no trackers, and no account
          required to begin.
        </p>
        <Link className="text-link" href="/">
          Back to Genjux <span aria-hidden="true">←</span>
        </Link>
      </section>
    </article>
  );
}
