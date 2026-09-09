import Link from "@/components/locale-link";
import { ArrowRight, NotebookPen } from "lucide-react";
import { getPublishedPosts } from "@/lib/content";
import { formatDate } from "@/lib/date-format";
import { catalogT } from "@/i18n/catalog";
import { htmlLanguage, type SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

export default async function BlogPage({ locale = "en" }: { locale?: SiteLocale }) {
  const t = catalogT(locale);
  const posts = await getPublishedPosts(locale);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>{t("blog.eyebrow")}</p>
        <h1 className={styles.pageTitle}>{t("blog.title")}</h1>
        <p className={styles.lede}>{t("blog.line1")}<br />{t("blog.line2")}</p>
      </header>
      {posts.length > 0 ? (
        <ol className={styles.articleList}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.articleEntry}>
              <Link href={`/blog/${post.slug}`} locale={locale} className={styles.articleLink}>
                <h2 className={styles.articleTitle} lang={htmlLanguage(post.contentLocale)}>{post.title}</h2>
                <p className={styles.articleSummary} lang={htmlLanguage(post.contentLocale)}>{post.summary}</p>
                <div className={styles.articleMeta}>
                  {locale === "zh" && post.contentLocale === "en" && <span>{t("common.originalEnglish")}</span>}
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
                  <span aria-hidden="true">/</span>
                  <span>{t("common.readTime", { count: post.readingMinutes })}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}><NotebookPen size={21} aria-hidden="true" /></span>
          <h2>{t("blog.emptyTitle")}</h2>
          <p>{t("blog.emptyBody")}</p>
          <Link href="/feeds" locale={locale} className={styles.textLink}>{t("blog.follow")} <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      )}
    </div>
  );
}
