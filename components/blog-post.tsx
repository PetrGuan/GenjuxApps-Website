import Link from "@/components/locale-link";
import { ArrowLeft } from "lucide-react";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/date-format";
import { catalogT } from "@/i18n/catalog";
import { htmlLanguage, type SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

export default function BlogPost({ post, locale = "en" }: { post: Post; locale?: SiteLocale }) {
  const t = catalogT(locale);
  return (
    <article className={styles.page}>
      <Link href="/blog" locale={locale} className={`${styles.textLink} ${styles.backLink}`}><ArrowLeft size={16} aria-hidden="true" /> {t("blog.back")}</Link>
      <header className={styles.articleHeader}>
        <h1 className={styles.pageTitle} lang={htmlLanguage(post.contentLocale)}>{post.title}</h1>
        <p className={styles.lede} lang={htmlLanguage(post.contentLocale)}>{post.summary}</p>
        <div className={styles.articleMeta}>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
          <span aria-hidden="true">/</span>
          <span>{t("common.readTime", { count: post.readingMinutes })}</span>
          {post.updatedAt && <span>{t("common.updated")} <time dateTime={post.updatedAt}>{formatDate(post.updatedAt, locale)}</time></span>}
        </div>
      </header>
      {locale === "zh" && post.contentLocale === "en" && <p className={styles.note}>{t("common.untranslated")}</p>}
      <div className={styles.prose} lang={htmlLanguage(post.contentLocale)} dangerouslySetInnerHTML={{ __html: post.html }} />
      <footer className={styles.callout}>
        <p>{t("blog.more")}</p>
        <Link href="/feeds" locale={locale} className={styles.textLink}>{t("blog.subscribe")}</Link>
      </footer>
    </article>
  );
}
