import HomeHero from "@/components/home-hero";
import OpenSourceContributions from "@/components/open-source-contributions";
import AtmosphereCanvas from "@/components/atmosphere-canvas";
import ProductCard from "@/components/product-card";
import StudioCapabilities from "@/components/studio-capabilities";
import StudioContactCta from "@/components/studio-contact-cta";
import StudioExperience from "@/components/studio-experience";
import { products } from "@/lib/products";

const intent = ["Native-first", "On-device AI", "Privacy by design", "No trackers"];

export default function HomePage() {
  return (
    <div className="home-page">
      <AtmosphereCanvas />
      <HomeHero />
      <section className="product-selector page-shell" aria-label="Product selector">
        <p className="eyebrow">SELECT A PRODUCT — 2 AVAILABLE</p>
        <div>
          {products.map((product, index) => (
            <a href={`#${product.slug}`} key={product.slug}>
              <span>[{index + 1}]</span> {product.name}
            </a>
          ))}
        </div>
      </section>
      <section id="products" className="product-grid page-shell" aria-label="Products">
        {products.map((product, index) => (
          <div id={product.slug} key={product.slug}>
            <ProductCard product={product} prominent={index === 0} />
          </div>
        ))}
      </section>
      <section className="intent-strip" aria-label="Studio principles">
        <div className="page-shell">
          {intent.map((item, index) => (
            <p key={item}>
              <span aria-hidden="true">0{index + 1}</span>
              {item}
            </p>
          ))}
        </div>
      </section>
      <StudioCapabilities />
      <StudioExperience />
      <OpenSourceContributions />
      <StudioContactCta />
    </div>
  );
}
