import { products } from "@/lib/products";

export default function SiteFooter() {
  return (
    <footer aria-label="Site footer" className="site-footer">
      <div className="page-shell footer-grid">
        <p>© 2026 Genjux Apps</p>
        <div className="footer-links" aria-label="Product links">
          {products.map((product) => (
            <a href={product.route} key={product.slug}>
              {product.name}
            </a>
          ))}
        </div>
        <p>A growing catalogue</p>
      </div>
    </footer>
  );
}
