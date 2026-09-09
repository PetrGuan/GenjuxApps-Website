import SocialLinks from "@/components/social-links";
import { siteConfig } from "@/lib/site-config";
import { catalogT } from "@/i18n/catalog";
import type { SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

export default function SiteFooter({ locale = "en" }: { locale?: SiteLocale }) {
  return (
    <footer aria-label={catalogT(locale)("common.footer")} className={styles.footer}>
      <div className={`${styles.shell} ${styles.footerInner}`}>
        <p className={styles.copyright}>© {new Date().getFullYear()} {siteConfig.name}</p>
        <SocialLinks locale={locale} />
      </div>
    </footer>
  );
}
