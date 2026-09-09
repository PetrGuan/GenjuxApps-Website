import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import LocaleLink from "@/components/locale-link";
import type { SiteLocale } from "@/i18n/routing.mjs";
import { formatDate } from "@/lib/date-format";
import { siteConfig } from "@/lib/site-config";
import { neoWriterContactHref } from "./site";
import styles from "./neowriter.module.css";

export type DocumentSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function ContactLink({
  subject,
  locale,
  children,
}: {
  subject: string;
  locale: SiteLocale;
  children?: ReactNode;
}) {
  return <a href={neoWriterContactHref(subject, locale)}>{children ?? siteConfig.email ?? (locale === "zh" ? "联系 Genjux" : "Contact Genjux")}</a>;
}

export default function DocumentPage({
  title,
  introduction,
  sections,
  locale,
  updated,
}: {
  title: string;
  introduction: string;
  sections: readonly DocumentSection[];
  locale: SiteLocale;
  updated?: string;
}) {
  const labels = locale === "zh"
    ? { back: "NeoWriter", eyebrow: "NEOWRITER / IPHONE、IPAD 与 MAC", updated: "最后更新：", contents: "本页内容", contentsLabel: "本页目录" }
    : { back: "NeoWriter", eyebrow: "NEOWRITER / IPHONE, IPAD & MAC", updated: "Last updated ", contents: "ON THIS PAGE", contentsLabel: "On this page" };

  return (
    <article className={`${styles.shell} ${styles.document}`}>
      <header className={styles.documentHeader}>
        <LocaleLink href="/apps/neowriter" locale={locale} className={styles.textLink}><ArrowLeft size={15} aria-hidden="true" /> {labels.back}</LocaleLink>
        <p className={styles.eyebrow}>{labels.eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.documentIntro}>{introduction}</p>
        {updated && <p className={styles.documentDate}>{labels.updated}<time dateTime={updated}>{formatDate(updated, locale)}</time></p>}
      </header>
      <div className={styles.documentLayout}>
        <nav className={styles.documentContents} aria-label={labels.contentsLabel}>
          <p>{labels.contents}</p>
          <ol>
            {sections.map(({ id, title: heading }) => <li key={id}><LocaleLink href={`#${id}`} locale={locale}>{heading}</LocaleLink></li>)}
          </ol>
        </nav>
        <div className={styles.documentBody}>
          {sections.map(({ id, title: heading, content }) => (
            <section id={id} key={id}>
              <h2>{heading}</h2>
              {content}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
