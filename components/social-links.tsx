import { siteConfig, type SocialId } from "@/lib/site-config";
import { withBasePath } from "@/lib/site-paths";
import { catalogT } from "@/i18n/catalog";
import type { SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

export function SocialIcon({ id }: { id: SocialId }) {
  const maskImage = `url("${withBasePath(`/images/social/${id}.svg`)}")`;
  return <span aria-hidden="true" className={styles.socialIcon} style={{ maskImage, WebkitMaskImage: maskImage }} />;
}

export default function SocialLinks({ labeled = false, locale = "en" }: { labeled?: boolean; locale?: SiteLocale }) {
  const t = catalogT(locale);
  return (
    <div className={labeled ? styles.profileList : styles.socials} aria-label={t("common.social")}>
      {siteConfig.socials.map(({ id, label, url }) => {
        const className = labeled ? styles.profileLink : styles.socialLink;
        const content = (
          <>
            <SocialIcon id={id} />
            {labeled && <span>{label}{!url && <small>{t("common.unconfigured")}</small>}</span>}
          </>
        );
        return url ? (
          <a key={id} href={url} rel="me" className={className} aria-label={label} data-tooltip={label}>
            {content}
          </a>
        ) : (
          <span
            key={id}
            className={className}
            role="link"
            aria-disabled="true"
            aria-label={t("common.profilePending", { name: label })}
            data-tooltip={t("common.profilePending", { name: label })}
            tabIndex={labeled ? undefined : 0}
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}
