import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="page-shell information-page">
      <p className="eyebrow">ABOUT / 001</p>
      <h1>Software should feel considered.</h1>
      <p>
        Genjux is an independent product studio making native, private tools for people who value focus,
        craft, and useful details.
      </p>
      <Link href="/#products" className="text-link">
        Explore the products <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
