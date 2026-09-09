import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found page-shell">
      <p className="eyebrow">ERROR / 404</p>
      <h1>This route is outside the lab.</h1>
      <p>The page you requested does not exist.</p>
      <Link href="/">Return to Genjux</Link>
    </section>
  );
}
