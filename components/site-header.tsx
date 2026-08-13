import Link from "next/link";
import { studioRoutes } from "@/lib/routes";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <nav aria-label="Primary navigation" className="page-shell site-nav">
        <Link href="/" className="wordmark" aria-label="Genjux home">
          <span className="wordmark-mark" aria-hidden="true" />
          GENJUX
        </Link>
        <details className="nav-disclosure" open>
          <summary>Menu</summary>
          <div className="nav-links">
            {studioRoutes.map((route) => (
              <Link href={route.href} key={route.href}>
                {route.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
