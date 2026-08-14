"use client";

import { useState } from "react";
import ProductCard from "@/components/product-card";
import { products, type ProductCategory } from "@/lib/products";

type Filter = "All" | ProductCategory | "Games";

const filters: readonly Filter[] = ["All", "Productivity", "Games", "Utilities"];

export default function ProductMatrix() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleProducts = activeFilter === "All" ? products : products.filter((product) => product.category === activeFilter);

  return (
    <section className="precision-products page-shell" aria-labelledby="products-title">
      <div className="precision-filter-wrap">
        <div aria-label="Product categories" className="precision-filter" role="group">
          {filters.map((filter) => (
            <button
              aria-pressed={activeFilter === filter}
              className="precision-filter-button"
              key={filter}
              onClick={() => setActiveFilter(filter)}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite" className="precision-product-grid" id="products">
        {visibleProducts.length ? (
          visibleProducts.map((product) => (
            <div className="precision-product-entry" data-product={product.slug} id={product.slug} key={product.slug}>
              <ProductCard product={product} prominent={product.slug === "bebilog"} />
            </div>
          ))
        ) : (
          <p className="precision-empty-state">No Genjux games are available yet.</p>
        )}
      </div>
    </section>
  );
}
