import type { ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  AudioLines,
  Blend,
  Check,
  Command,
  Gauge,
  Layers3,
  MonitorUp,
  MoonStar,
  Route,
  Sparkles,
  SunMedium,
  Volume2,
  WandSparkles,
} from "lucide-react";
import LanguageSwitcher from "@/components/language-switcher";
import LocaleLink from "@/components/locale-link";
import { htmlLanguage, type SiteLocale, withBasePath } from "@/i18n/routing.mjs";
import { lumadioMessages } from "@/i18n/lumadio/messages";
import { formatDate } from "@/lib/date-format";
import { getProduct } from "@/lib/products";
import "./lumadio-localized.css";

const appPath = "/apps/lumadio";
const supportEmail = "hello@genjux.com";

function DownloadLink({ children, className, label }: { children: ReactNode; className?: string; label?: string }) {
  const href = getProduct("lumadio")?.appStoreUrl;
  if (!href) throw new Error("Lumadio's published App Store URL is missing.");
  return <a href={href} className={className} aria-label={label}>{children}</a>;
}

export function LumadioLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="lumadio-brand">
      <Image src={withBasePath("/apps/lumadio/app-icon.png")} alt="" width={compact ? 28 : 34} height={compact ? 28 : 34} />
      <span>Lumadio</span>
    </span>
  );
}

export function LumadioHeader({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = lumadioMessages[locale].header;
  return (
    <header className="lumadio-header">
      <div className="lumadio-shell lumadio-nav">
        <LocaleLink href={appPath} locale={locale} aria-label={copy.home}><LumadioLogo /></LocaleLink>
        <nav className="lumadio-nav-links" aria-label={copy.navigation}>
          <LocaleLink href={`${appPath}#features`} locale={locale}>{copy.features}</LocaleLink>
          <LocaleLink href={`${appPath}#pricing`} locale={locale}>{copy.pricing}</LocaleLink>
          <LocaleLink href={`${appPath}/support`} locale={locale}>{copy.support}</LocaleLink>
        </nav>
        <div className="lumadio-nav-actions">
          <LanguageSwitcher locale={locale} />
          <DownloadLink className="lumadio-nav-cta" label={copy.downloadLabel}>{copy.download}</DownloadLink>
        </div>
      </div>
    </header>
  );
}

export function LumadioFooter({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = lumadioMessages[locale].footer;
  return (
    <footer className="lumadio-footer">
      <div className="lumadio-shell lumadio-footer-grid">
        <div>
          <LumadioLogo compact />
          <p>{copy.tagline}</p>
        </div>
        <div className="lumadio-footer-links">
          <div>
            <strong>{copy.product}</strong>
            <LocaleLink href={appPath} locale={locale}>{copy.overview}</LocaleLink>
            <LocaleLink href={`${appPath}#features`} locale={locale}>{copy.features}</LocaleLink>
            <LocaleLink href={`${appPath}#pricing`} locale={locale}>{copy.pricing}</LocaleLink>
            <DownloadLink>{copy.appStore}</DownloadLink>
          </div>
          <div>
            <strong>{copy.resources}</strong>
            <LocaleLink href={`${appPath}/support`} locale={locale}>{copy.support}</LocaleLink>
            <a href="https://github.com/PetrGuan/Lumadio">{copy.github}</a>
            <LocaleLink href="/" locale={locale}>{copy.genjux}</LocaleLink>
          </div>
          <div>
            <strong>{copy.legal}</strong>
            <LocaleLink href={`${appPath}/privacy`} locale={locale}>{copy.privacy}</LocaleLink>
            <LocaleLink href={`${appPath}/terms`} locale={locale}>{copy.terms}</LocaleLink>
          </div>
        </div>
      </div>
      <div className="lumadio-shell lumadio-footer-bottom"><span>{copy.copyright}</span><span>{copy.madeFor}</span></div>
    </footer>
  );
}

function ProductMockup({ locale }: { locale: SiteLocale }) {
  const copy = lumadioMessages[locale].mockup;
  return (
    <div className="lumadio-visual" aria-label={copy.label}>
      <div className="lumadio-orbit lumadio-orbit-one" /><div className="lumadio-orbit lumadio-orbit-two" />
      <div className="lumadio-menu-window">
        <div className="lumadio-window-bar"><span className="lumadio-window-title"><Image src={withBasePath("/apps/lumadio/app-icon.png")} alt="" width={25} height={25} />Lumadio</span><span className="lumadio-live"><i /> {copy.active}</span></div>
        <div className="lumadio-scene-strip"><span>{copy.scene}</span><div><button className="active">{copy.focus}</button><button>{copy.movie}</button><button>{copy.night}</button></div></div>
        <div className="lumadio-control-section">
          <div className="lumadio-section-label"><span><MonitorUp size={15} /> {copy.displays}</span><small>{copy.connected}</small></div>
          <div className="lumadio-device-row"><div className="lumadio-device-icon"><SunMedium size={17} /></div><div className="lumadio-device-copy"><strong>Studio Display</strong><span>2560 × 1440 · 60 Hz</span></div><div className="lumadio-slider"><i style={{ width: "72%" }} /></div><b>72</b></div>
          <div className="lumadio-device-row"><div className="lumadio-device-icon purple"><Sparkles size={17} /></div><div className="lumadio-device-copy"><strong>MacBook Pro</strong><span>{copy.builtInDisplay}</span></div><div className="lumadio-slider"><i style={{ width: "48%" }} /></div><b>48</b></div>
        </div>
        <div className="lumadio-control-section audio">
          <div className="lumadio-section-label"><span><AudioLines size={15} /> {copy.appAudio}</span><small>{copy.live}</small></div>
          <div className="lumadio-audio-row"><span className="lumadio-mini-app blue">M</span><div><strong>{copy.music}</strong><span className="lumadio-levels"><i /><i /><i /><i /></span></div><Volume2 size={16} /><b>64%</b></div>
          <div className="lumadio-audio-row"><span className="lumadio-mini-app coral">S</span><div><strong>Safari</strong><span className="lumadio-levels low"><i /><i /><i /><i /></span></div><Volume2 size={16} /><b>38%</b></div>
        </div>
      </div>
      <div className="lumadio-float-card"><Command size={17} /><span>{copy.focusScene}</span><kbd>⌥ S</kbd></div>
    </div>
  );
}

const featurePresentation = [
  { icon: MonitorUp, accent: "blue" },
  { icon: AudioLines, accent: "coral" },
  { icon: Layers3, accent: "violet" },
  { icon: Command, accent: "mint" },
  { icon: Blend, accent: "amber" },
  { icon: WandSparkles, accent: "pink" },
] as const;

export function LumadioHome({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = lumadioMessages[locale].home;
  const [finalFirst, finalSecond] = copy.finalTitle.split("\n");
  return (
    <main className="lumadio-site" lang={htmlLanguage(locale)} data-locale={locale}>
      <LumadioHeader locale={locale} />
      <section className="lumadio-hero lumadio-shell">
        <div className="lumadio-hero-copy">
          <p className="lumadio-pill"><span /> {copy.pill}</p>
          <h1>{copy.titleLines[0]}<br />{copy.titleLines[1]}<br /><em>{copy.titleLines[2]}</em></h1>
          <p className="lumadio-lede">{copy.lede}</p>
          <div className="lumadio-actions"><DownloadLink className="lumadio-primary-button">{copy.download} <ArrowRight size={17} aria-hidden="true" /></DownloadLink><a href="#features" className="lumadio-secondary-button">{copy.explore}</a></div>
          <div className="lumadio-system-note"><span><Check size={14} /> {copy.free}</span><span><Check size={14} /> {copy.system}</span><span><Check size={14} /> {copy.silicon}</span></div>
        </div>
        <ProductMockup locale={locale} />
      </section>

      <section className="lumadio-manifesto">
        <div className="lumadio-shell"><p>{copy.manifestoEyebrow}</p><h2>{copy.manifestoTitle}<br /><span>{copy.manifestoAccent}</span></h2></div>
      </section>

      <section className="lumadio-feature-section lumadio-shell" id="features">
        <div className="lumadio-section-heading"><p>{copy.featureEyebrow}</p><h2>{copy.featureTitle}<br />{copy.featureAccent}</h2><span>{copy.featureNote}</span></div>
        <div className="lumadio-feature-grid">{copy.features.map(({ title, text }, index) => {
          const { icon: Icon, accent } = featurePresentation[index];
          return <article className={`lumadio-feature-card ${accent}`} key={title}><span className="lumadio-feature-icon"><Icon size={23} /></span><h3>{title}</h3><p>{text}</p></article>;
        })}</div>
      </section>

      <section className="lumadio-scenes-section">
        <div className="lumadio-shell lumadio-scenes-grid">
          <div className="lumadio-scenes-copy"><p>{copy.scenesEyebrow}</p><h2>{copy.scenesTitle}</h2><p>{copy.scenesBody}</p><ul><li><MoonStar size={17} /> {copy.sceneBenefits[0]}</li><li><Route size={17} /> {copy.sceneBenefits[1]}</li><li><Gauge size={17} /> {copy.sceneBenefits[2]}</li></ul></div>
          <div className="lumadio-scene-stack"><div className="lumadio-scene-card back"><span>03</span><strong>{copy.sceneCards[0].title}</strong><small>{copy.sceneCards[0].detail}</small></div><div className="lumadio-scene-card middle"><span>02</span><strong>{copy.sceneCards[1].title}</strong><small>{copy.sceneCards[1].detail}</small></div><div className="lumadio-scene-card front"><span>01</span><strong>{copy.sceneCards[2].title}</strong><small>{copy.sceneCards[2].detail}</small><div className="lumadio-scene-ready"><i /> {copy.sceneCards[2].ready}</div></div></div>
        </div>
      </section>

      <section className="lumadio-privacy-callout lumadio-shell"><div><span className="lumadio-shield"><Check size={24} /></span><p>{copy.privacyEyebrow}</p><h2>{copy.privacyTitle}</h2></div><div><p>{copy.privacyBody}</p><LocaleLink href={`${appPath}/privacy`} locale={locale}>{copy.privacyLink} <ArrowRight size={15} /></LocaleLink></div></section>

      <section className="lumadio-pricing lumadio-shell" id="pricing">
        <div className="lumadio-section-heading centered"><p>{copy.pricingEyebrow}</p><h2>{copy.pricingTitle}</h2><span>{copy.pricingNote}</span></div>
        <div className="lumadio-price-card"><div className="lumadio-price-main"><span>{copy.pro}</span><div><strong>$4.99</strong><small>{copy.oneTime}</small></div><p>{copy.lifetime}</p><DownloadLink className="lumadio-primary-button">{copy.get}</DownloadLink></div><div className="lumadio-price-features"><strong>{copy.includes}</strong><ul>{copy.proFeatures.map((feature) => <li key={feature}><Check /> {feature}</li>)}</ul><small>{copy.priceNote}</small></div></div>
      </section>

      <section className="lumadio-final-cta"><div className="lumadio-shell"><Image src={withBasePath("/apps/lumadio/app-icon.png")} alt={copy.finalAlt} width={82} height={82} /><p>{copy.finalEyebrow}</p><h2>{finalFirst}<br />{finalSecond}</h2><DownloadLink className="lumadio-primary-button">{copy.download} <ArrowRight size={17} aria-hidden="true" /></DownloadLink></div></section>
      <LumadioFooter locale={locale} />
    </main>
  );
}

export function LegalPage({ eyebrow, title, updated, children, locale = "en" }: { eyebrow: string; title: string; updated: string; children: ReactNode; locale?: SiteLocale }) {
  return <main className="lumadio-site" lang={htmlLanguage(locale)} data-locale={locale}><LumadioHeader locale={locale} /><article className="lumadio-legal lumadio-shell"><header><p>{eyebrow}</p><h1>{title}</h1><span>{lumadioMessages[locale].legal.lastUpdated} {formatDate(updated, locale)}</span></header><div className="lumadio-legal-body">{children}</div></article><LumadioFooter locale={locale} /></main>;
}

export function ContactLink({ subject, children }: { subject: string; children?: ReactNode }) {
  return <a href={`mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`}>{children ?? supportEmail}</a>;
}

export const lumadioSupportEmail = supportEmail;
