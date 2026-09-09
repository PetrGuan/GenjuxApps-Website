import Image from "next/image";
import Link from "@/components/locale-link";
import {
  AppWindow, ArrowRight, ArrowUpRight, Code2, Heart, HeartHandshake, Mail, NotebookPen, Rss,
} from "lucide-react";
import LegacyCatalogAnchor from "@/components/legacy-catalog-anchor";
import SocialLinks, { SocialIcon } from "@/components/social-links";
import ProductMatrix from "@/components/product-matrix";
import BlogIndex from "@/components/blog-index";
import { catalogT } from "@/i18n/catalog";
import { htmlLanguage, localizedHref, type SiteLocale } from "@/i18n/routing.mjs";
import { getAboutContent, getAnnouncements, getPublishedPosts, getSupporters, type Supporter } from "@/lib/content";
import { localizedProducts } from "@/lib/localized-products";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";
import { mainSiteMetadata } from "@/lib/site-metadata";
import { withBasePath } from "@/lib/site-paths";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

export type CatalogPage = "home" | "apps" | "about" | "blog" | "contact" | "donate" | "supporters" | "feeds";
type Props = { locale: SiteLocale };

export function getCatalogMetadata(page: CatalogPage, locale: SiteLocale = "en") {
  const t = catalogT(locale);
  const values = { name: siteConfig.displayName, apps: products.map(({ name }) => name).join(locale === "zh" ? "、" : ", ") };
  return mainSiteMetadata(t(`metadata.${page}Title`, values), t(`metadata.${page}Description`, values), page === "home" ? "/" : `/${page}`, locale);
}

function Home({ locale }: Props) {
  const t = catalogT(locale);
  const collection = localizedProducts(locale);
  const featured = collection.find(({ slug }) => slug === "bebilog");
  if (!featured) throw new Error("The homepage featured app, Bebilog, is missing.");
  const github = siteConfig.socials.find(({ id }) => id === "github")?.url;
  const code = <><SocialIcon id="github" /> {t("home.code")}</>;
  return (
    <>
      <LegacyCatalogAnchor locale={locale} />
      <div className={`${styles.shell} ${styles.homePage}`}>
        <section className={styles.home} aria-labelledby="home-title">
          <div className={styles.homeContent}>
            <Image src={withBasePath("/images/avatar.webp")} alt={t("common.portrait", { name: siteConfig.displayName })} width={104} height={104} className={styles.avatar} preload />
            <h1 id="home-title" className={styles.homeTitle}>{siteConfig.displayName}</h1>
            <p className={styles.homeTagline}>{t("common.tagline")}</p>
            <p className={styles.homeDescription}>{t("home.line1")}<br />{t("home.line2")}</p>
            <div className={styles.homeActions}>
              <Link href="/apps" locale={locale} className={styles.button}><AppWindow size={18} aria-hidden="true" /> {t("nav.apps")}</Link>
              {github ? <a href={github} className={`${styles.button} ${styles.buttonSecondary}`}>{code}</a> : <button type="button" disabled className={`${styles.button} ${styles.buttonSecondary}`} aria-describedby="code-status">{code}</button>}
            </div>
            {!github && <p id="code-status" className={styles.pendingNote}>{t("home.codePending")}</p>}
          </div>
          <a href={featured.route} className={styles.homeFeature} aria-label={t("home.featured", { name: featured.name })}>
            <div className={styles.featureCopy}>
              <p className={styles.featureEyebrow}>{t("home.collection")}</p>
              <Image src={featured.assets.icon} alt="" width={44} height={44} className={styles.featureIcon} />
              <h2>{featured.name}</h2>
              <p className={styles.featureTagline}>{featured.tagline}</p>
              <span className={styles.featureLink}>{t("home.meet", { name: featured.name })} <ArrowUpRight size={16} aria-hidden="true" /></span>
            </div>
            <div className={styles.featureDevice}>
              <Image src={withBasePath("/images/bebilog-home.webp")} alt={t("home.screenshot")} width={420} height={912} className={styles.featureScreenshot} preload />
            </div>
          </a>
        </section>
        <section className={styles.appShelf} aria-labelledby="home-apps-title">
          <div className={styles.shelfHeading}><h2 id="home-apps-title">{t("home.shelf")}</h2><Link href="/apps" locale={locale} className={styles.textLink}>{t("common.allApps")} <ArrowRight size={15} aria-hidden="true" /></Link></div>
          <ul className={styles.appDock}>
            {collection.map((product) => <li key={product.slug}><a href={product.route} className={styles.dockApp} aria-label={t("common.explore", { name: product.name })}><Image src={product.assets.icon} alt="" width={56} height={56} className={styles.dockIcon} /><div><h3>{product.name}</h3><p>{product.tagline}</p></div></a></li>)}
          </ul>
        </section>
      </div>
    </>
  );
}

function Apps({ locale }: Props) {
  const t = catalogT(locale);
  return <div className={styles.directory}><div className={styles.shell}><header className={styles.pageIntro}><h1 className={styles.pageTitle}>{t("apps.title")}<em>{t("apps.accent")}</em></h1><p className={styles.lede}>{t("apps.line1")}<br />{t("apps.line2")}</p></header><ProductMatrix locale={locale} /><p className={styles.collectionNote}>{t("apps.note")} <Link href="/feeds" locale={locale} className={styles.textLink}>{t("apps.rss")}</Link></p></div></div>;
}

async function About({ locale }: Props) {
  const t = catalogT(locale);
  const about = await getAboutContent(locale);
  return (
    <div className={styles.page}>
      <header className={styles.aboutIntro}>
        <Image src={withBasePath("/images/avatar.webp")} alt={t("common.portrait", { name: siteConfig.displayName })} width={100} height={100} className={styles.aboutAvatar} />
        <div><p className={styles.eyebrow}>{t("about.eyebrow")}</p><h1 className={styles.pageTitle}>{t("about.title", { name: siteConfig.displayName })}</h1><p className={styles.lede}>{t("common.tagline")}{locale === "en" ? "." : "。"}</p></div>
      </header>
      {about.draft ? <div className={styles.note}>{t("about.draft")}</div> : <>
        {locale === "zh" && about.contentLocale === "en" && <p className={styles.note}>{t("common.untranslated")}</p>}
        <div className={styles.prose} lang={htmlLanguage(about.contentLocale)} dangerouslySetInnerHTML={{ __html: about.html }} />
      </>}
      <section className={styles.section} aria-labelledby="about-apps"><h2 id="about-apps" className={styles.sectionTitle}>{t("about.appsTitle")}</h2><p className={styles.bodyCopy}>{t("about.appsBody")}</p><div className={styles.sectionLinks}><Link href="/apps" locale={locale} className={styles.textLink}>{t("about.explore")} <ArrowRight size={16} aria-hidden="true" /></Link><Link href="/blog" locale={locale} className={styles.textLink}>{t("about.blog")} <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
      <section className={styles.section} aria-labelledby="about-connect"><h2 id="about-connect" className={styles.sectionTitle}>{t("about.connect")}</h2><p className={styles.bodyCopy}>{t("about.connectBody")}</p><Link href="/contact" locale={locale} className={styles.textLink}>{t("about.contact")} <ArrowRight size={16} aria-hidden="true" /></Link></section>
    </div>
  );
}

function Contact({ locale }: Props) {
  const t = catalogT(locale);
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}><p className={styles.eyebrow}>{t("contact.eyebrow")}</p><h1 className={styles.pageTitle}>{t("contact.title")}</h1><p className={styles.lede}>{t("contact.lede")}</p></header>
      {siteConfig.email ? <section aria-label={t("contact.email")}><a href={`mailto:${siteConfig.email}`} className={styles.contactEmail}>{siteConfig.email}</a><p className={styles.bodyCopy}>{t("contact.emailNote")}</p></section> : <div className={styles.emptyState}><span className={styles.emptyIcon}><Mail size={21} aria-hidden="true" /></span><h2>{t("contact.emptyTitle")}</h2><p>{t("contact.emptyBody")}</p></div>}
      <section className={styles.section} aria-labelledby="app-support"><h2 id="app-support" className={styles.sectionTitle}>{t("contact.appsTitle")}</h2><p className={styles.bodyCopy}>{t("contact.appsBody")}</p><div className={styles.sectionLinks}>{products.map((product) => <a key={product.slug} href={localizedHref(product.route, locale)} className={styles.textLink}>{product.name}<ArrowUpRight size={15} aria-hidden="true" /></a>)}</div></section>
      <section className={styles.section} aria-labelledby="elsewhere"><h2 id="elsewhere" className={styles.sectionTitle}>{t("contact.elsewhere")}</h2><SocialLinks labeled locale={locale} /></section>
    </div>
  );
}

function Donate({ locale }: Props) {
  const t = catalogT(locale);
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}><p className={styles.eyebrow}>{t("donate.eyebrow")}</p><h1 className={styles.pageTitle}>{t("donate.title")}</h1><p className={styles.lede}>{t("donate.line1")}<br />{t("donate.line2")}</p></header>
      {siteConfig.donations.length ? (["monthly", "once"] as const).map((kind) => {
        const methods = siteConfig.donations.filter((method) => method.kind === kind);
        return methods.length > 0 && <section className={styles.section} key={kind}><h2 className={styles.sectionTitle}>{t(`donate.${kind}`)}</h2><div className={styles.supportList}>{methods.map((method) => <a href={method.url} key={method.url} className={styles.feedCard}><span className={styles.feedIcon}><Heart size={20} aria-hidden="true" /></span><span className={styles.feedCopy}>{method.name}</span><ArrowUpRight size={18} className={styles.feedArrow} aria-hidden="true" /></a>)}</div></section>;
      }) : <div className={styles.emptyState}><span className={styles.emptyIcon}><Heart size={21} aria-hidden="true" /></span><h2>{t("donate.emptyTitle")}</h2><p>{t("donate.emptyBody")}</p></div>}
      <section className={styles.section}><h2 className={styles.sectionTitle}>{t("donate.appsTitle")}</h2><p className={styles.bodyCopy}>{t("donate.appsBody")}</p><div className={styles.sectionLinks}><Link href="/apps" locale={locale} className={styles.textLink}>{t("donate.browse")} <ArrowRight size={16} aria-hidden="true" /></Link><Link href="/supporters" locale={locale} className={styles.textLink}>{t("donate.supporters")} <ArrowRight size={16} aria-hidden="true" /></Link></div></section>
    </div>
  );
}

function groupSupporters(supporters: Supporter[], fallback: string) {
  const groups = new Map<string, Supporter[]>();
  for (const supporter of supporters) {
    const group = supporter.group ?? fallback;
    groups.set(group, [...(groups.get(group) ?? []), supporter]);
  }
  return groups;
}

async function Supporters({ locale }: Props) {
  const t = catalogT(locale);
  const supporters = await getSupporters(locale);
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}><p className={styles.eyebrow}>{t("supporters.eyebrow")}</p><h1 className={styles.pageTitle}>{t("supporters.title")}</h1><p className={styles.lede}>{t("supporters.line1")}<br />{t("supporters.line2")}</p></header>
      {supporters.length > 0 ? (["current", "former"] as const).map((status) => Array.from(groupSupporters(supporters.filter((item) => item.status === status), t("supporters.group")), ([group, members]) => (
        <section className={styles.section} key={`${status}-${group}`}><h2 className={styles.sectionTitle}>{status === "former" ? t("supporters.former", { group: locale === "en" ? group.toLowerCase() : group }) : group}</h2><div className={styles.supporterGrid}>
          {members.map((supporter) => {
            const content = <>{supporter.logo && <Image src={supporter.logo.startsWith("/") ? withBasePath(supporter.logo) : supporter.logo} alt="" width={32} height={32} />}{supporter.name}</>;
            return supporter.url ? <a className={styles.supporter} href={localizedHref(supporter.url, locale)} key={`${supporter.name}-${supporter.url}`}>{content}</a> : <span className={styles.supporter} key={supporter.name}>{content}</span>;
          })}
        </div></section>
      ))) : <div className={styles.emptyState}><span className={styles.emptyIcon}><HeartHandshake size={22} aria-hidden="true" /></span><h2>{t("supporters.emptyTitle")}</h2><p>{t("supporters.emptyBody")}</p></div>}
      <div className={styles.callout}><p>{t("supporters.cta")}</p><Link href="/donate" locale={locale} className={styles.button}>{t("supporters.support")}</Link></div>
    </div>
  );
}

async function Feeds({ locale }: Props) {
  const t = catalogT(locale);
  const [posts, announcements] = await Promise.all([getPublishedPosts(locale), getAnnouncements()]);
  const feeds = [
    { key: "blog", path: "/rss.xml", count: posts.length, icon: NotebookPen },
    { key: "apps", path: "/rss-apps.xml", count: announcements.filter((item) => item.kind === "app").length, icon: Rss },
    { key: "repos", path: "/rss-repos.xml", count: announcements.filter((item) => item.kind === "repo").length, icon: Code2 },
  ] as const;
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}><p className={styles.eyebrow}>{t("feeds.eyebrow")}</p><h1 className={styles.pageTitle}>{t("feeds.title")}</h1><p className={styles.lede}>{t("feeds.line1")}<br />{t("feeds.line2")}</p></header>
      <div className={styles.feedList}>{feeds.map(({ key, path, count, icon: Icon }) => <a href={localizedHref(path, locale)} className={styles.feedCard} key={path} type="application/rss+xml"><span className={styles.feedIcon}><Icon size={20} aria-hidden="true" /></span><div className={styles.feedCopy}><h2>{t(`feeds.${key}`)}<span className={styles.feedStatus}>{t("feeds.entries", { count })}</span></h2><p>{t(`feeds.${key}Body`)}</p></div><ArrowUpRight size={17} className={styles.feedArrow} aria-hidden="true" /></a>)}</div>
      <section className={styles.section} aria-labelledby="release-feeds"><h2 id="release-feeds" className={styles.sectionTitle}>{t("feeds.releases")}</h2><div className={styles.feedList}>{products.map((product) => {
        const count = announcements.filter((item) => item.kind === "release" && item.appSlug === product.slug).length;
        return <a href={localizedHref(`/apps/${product.slug}/rss.xml`, locale)} className={styles.feedCard} key={product.slug} type="application/rss+xml"><Image src={product.assets.icon} alt="" width={40} height={40} className={styles.feedImage} /><div className={styles.feedCopy}><h3>{product.name}<span className={styles.feedStatus}>{t("feeds.updates", { count })}</span></h3><p>{t("feeds.followApp", { name: product.name })}</p></div><ArrowUpRight size={17} className={styles.feedArrow} aria-hidden="true" /></a>;
      })}</div></section>
      <div className={styles.callout}><h2 className={styles.sectionTitle}>{t("feeds.help")}</h2><p>{t("feeds.helpBody")}</p></div>
    </div>
  );
}

export function renderCatalogPage(page: CatalogPage, locale: SiteLocale = "en") {
  switch (page) {
    case "home": return <Home locale={locale} />;
    case "apps": return <Apps locale={locale} />;
    case "about": return <About locale={locale} />;
    case "blog": return <BlogIndex locale={locale} />;
    case "contact": return <Contact locale={locale} />;
    case "donate": return <Donate locale={locale} />;
    case "supporters": return <Supporters locale={locale} />;
    case "feeds": return <Feeds locale={locale} />;
  }
}
