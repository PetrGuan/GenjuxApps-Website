import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="home-hero page-shell" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="eyebrow">INDEPENDENT PRODUCT STUDIO</p>
        <h1 id="home-title">
          Small apps.
          <br />
          <span>Deeply considered.</span>
        </h1>
        <p>
          Crafting private, native, human-centered software artifacts for iOS and macOS. No trackers,
          no subscriptions, just pure utility.
        </p>
        <Link href="#products" className="hero-cta">
          Explore products <span aria-hidden="true">↓</span>
        </Link>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <span className="hero-orbit hero-orbit--outer" />
        <span className="hero-orbit hero-orbit--inner" />
        <span className="hero-signal hero-signal--coral" />
        <span className="hero-signal hero-signal--amber" />
        <span className="hero-coordinate">SYS / 02</span>
      </div>
    </section>
  );
}
