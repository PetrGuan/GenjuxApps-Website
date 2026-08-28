/* eslint-disable @next/next/no-img-element */

import type { Product } from "@/lib/products";

type ProductCardProps = {
  index: number;
  product: Product;
};

export default function ProductCard({ index, product }: ProductCardProps) {
  return (
    <article className="product-card" data-accent={product.accent}>
      <p className="product-index">0{index}</p>
      <div className="product-card-copy">
        <div className="product-identity">
          <img src={product.assets.icon} alt="" className="product-icon" />
          <div>
            <p className="product-platform">{product.platform}</p>
            <h3>{product.name}</h3>
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
      <a href={product.route} className="product-card-link">
        Discover {product.name} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
