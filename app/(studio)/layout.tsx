import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export default function StudioLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-frame">
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
