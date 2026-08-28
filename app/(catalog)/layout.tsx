import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function CatalogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-frame">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
