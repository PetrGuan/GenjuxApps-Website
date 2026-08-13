/* eslint-disable @next/next/no-img-element */

import type { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  prominent?: boolean;
};

export default function ProductCard({ product, prominent = false }: ProductCardProps) {
  return (
    <article
      className={`product-card ${prominent ? "product-card--prominent" : ""}`}
      data-accent={product.accent}
    >
      <div className="product-card-copy">
        <div className="product-identity">
          <img src={product.assets.icon} alt="" className="product-icon" />
          <div>
            <p className="eyebrow">{product.platform}</p>
            <h2>{product.name}</h2>
          </div>
        </div>
        <p className="product-tagline">{product.tagline}</p>
        <p className="product-description">{product.description}</p>
        <ul className="capability-tags" aria-label={`${product.name} capabilities`}>
          {product.capabilities.map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </div>
      <div className="product-artwork">
        <div className="artwork-grid" aria-hidden="true" />
        <img src={product.assets.hero} alt={`${product.name} app screen`} />
      </div>
      <a href={product.route} className="product-card-link">
        Explore {product.name} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
