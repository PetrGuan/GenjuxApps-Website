import OpenSourceContributions from "@/components/open-source-contributions";
import ProductMatrix from "@/components/product-matrix";
import StudioCapabilities from "@/components/studio-capabilities";
import StudioContactCta from "@/components/studio-contact-cta";
import StudioExperience from "@/components/studio-experience";
export default function HomePage() {
  return (
    <div className="home-page">
      <section className="precision-hero page-shell" aria-labelledby="home-title">
        <p className="eyebrow">INDEPENDENT APP STUDIO / 02 ACTIVE PRODUCTS</p>
        <h1 id="home-title">Genjux</h1>
        <p>Carefully built independent software.</p>
      </section>
      <ProductMatrix />
      <section className="precision-studio-rail page-shell" aria-label="Studio information">
        <StudioCapabilities />
        <StudioExperience />
        <div className="precision-studio-aside">
          <OpenSourceContributions />
          <StudioContactCta />
        </div>
      </section>
    </div>
  );
}
