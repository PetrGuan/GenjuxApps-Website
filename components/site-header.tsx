import Link from "next/link";
import { products } from "@/lib/products";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav aria-label="Primary navigation" className="page-shell site-nav">
        <Link href="/" className="wordmark" aria-label="Genjux home">
          GENJUX <span>SOFTWARE</span>
        </Link>
        <div className="nav-links">
          {products.map((product) => (
            <Link href={`/#${product.slug}`} key={product.slug}>
              {product.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
