import ProductMatrix from "@/components/product-matrix";

export default function HomePage() {
  return (
    <div className="catalog-page">
      <section className="catalog-hero page-shell" aria-labelledby="home-title">
        <p className="catalog-kicker">GENJUX / PRODUCT CATALOGUE</p>
        <div className="catalog-hero-copy">
          <h1 id="home-title">
            I&apos;m Genjux,
            <br />
            <em>who makes software.</em>
          </h1>
          <a className="catalog-scroll-link" href="#products">
            See the collection <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="catalog-count" aria-label="Four available products">
          <span>04</span> RELEASES
        </p>
      </section>
      <ProductMatrix />
    </div>
  );
}
