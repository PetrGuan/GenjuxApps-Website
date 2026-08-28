import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";

export default function ProductMatrix() {
  return (
    <section className="product-collection page-shell" id="products" aria-labelledby="products-title">
      <div className="product-collection-heading">
        <p className="catalog-kicker">THE COLLECTION</p>
        <h2 id="products-title">Three releases. Three different worlds.</h2>
        <p>Choose the one that fits the day in front of you.</p>
      </div>
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-entry" data-product={product.slug} id={product.slug} key={product.slug}>
            <ProductCard index={index + 1} product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
