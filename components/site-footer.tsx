import Link from "next/link";
import { studioRoutes } from "@/lib/routes";

const productLinks = [
  { label: "Bebilog", href: "/apps/bebilog" },
  { label: "Nautilus", href: "/apps/nautilus" },
];

export default function SiteFooter() {
  return (
    <footer aria-label="Site footer" className="site-footer">
      <div className="page-shell footer-grid">
        <p>© 2026 Genjux. Independent software.</p>
        <div className="footer-links" aria-label="Product links">
          {productLinks.map((link) => (
            <Link href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-links" aria-label="Studio links">
          {studioRoutes.slice(1).map((route) => (
            <Link href={route.href} key={route.href}>
              {route.label}
            </Link>
          ))}
        </div>
        <p aria-label="Studio status" className="status-label">
          <span aria-hidden="true" /> Building independently
        </p>
      </div>
    </footer>
  );
}
