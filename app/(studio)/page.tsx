import Image from "next/image";
import OpenSourceContributions from "@/components/open-source-contributions";
import ProductMatrix from "@/components/product-matrix";
import StudioCapabilities from "@/components/studio-capabilities";
import StudioContactCta from "@/components/studio-contact-cta";
import StudioExperience from "@/components/studio-experience";
export default function HomePage() {
  return (
    <div className="home-page">
      <section className="precision-hero page-shell" aria-labelledby="home-title">
        <Image
          alt="Genjux studio portrait"
          className="precision-portrait"
          height={2232}
          priority
          sizes="(max-width: 820px) 18rem, 22rem"
          src="/studio/avatar.jpg"
          width={1260}
        />
        <div className="precision-hero-copy">
          <p className="eyebrow">INDEPENDENT APP STUDIO / 02 ACTIVE PRODUCTS</p>
          <h1 id="home-title">Genjux</h1>
          <p>Carefully built independent software.</p>
        </div>
      </section>
      <ProductMatrix />
      <section className="precision-studio-stack page-shell" aria-label="Studio information">
        <StudioCapabilities />
        <StudioExperience />
        <OpenSourceContributions />
        <StudioContactCta />
      </section>
    </div>
  );
}
