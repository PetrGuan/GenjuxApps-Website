import Link from "next/link";
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
import { withBasePath } from "@/lib/site-paths";

const appPath = "/apps/lumadio";
const supportEmail = "hello@genjux.com";

export function LumadioLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="lumadio-brand">
      <Image src={withBasePath("/apps/lumadio/app-icon.png")} alt="" width={compact ? 28 : 34} height={compact ? 28 : 34} />
      <span>Lumadio</span>
    </span>
  );
}

export function LumadioHeader() {
  return (
    <header className="lumadio-header">
      <nav className="lumadio-shell lumadio-nav" aria-label="Lumadio navigation">
        <Link href={appPath} aria-label="Lumadio home"><LumadioLogo /></Link>
        <div className="lumadio-nav-links">
          <Link href={`${appPath}#features`}>Features</Link>
          <Link href={`${appPath}#pricing`}>Pricing</Link>
          <Link href={`${appPath}/support`}>Support</Link>
        </div>
        <span className="lumadio-nav-cta" aria-label="Coming soon to the Mac App Store">Coming soon</span>
      </nav>
    </header>
  );
}

export function LumadioFooter() {
  return (
    <footer className="lumadio-footer">
      <div className="lumadio-shell lumadio-footer-grid">
        <div>
          <LumadioLogo compact />
          <p>One menu bar for your displays and app audio.</p>
        </div>
        <div className="lumadio-footer-links">
          <div><strong>Product</strong><Link href={appPath}>Overview</Link><Link href={`${appPath}#features`}>Features</Link><Link href={`${appPath}#pricing`}>Pricing</Link></div>
          <div><strong>Resources</strong><Link href={`${appPath}/support`}>Support</Link><a href="https://github.com/PetrGuan/Lumadio">GitHub</a><Link href="/">Genjux</Link></div>
          <div><strong>Legal</strong><Link href={`${appPath}/privacy`}>Privacy</Link><Link href={`${appPath}/terms`}>Terms</Link></div>
        </div>
      </div>
      <div className="lumadio-shell lumadio-footer-bottom"><span>© 2026 Genjux. All rights reserved.</span><span>Made for macOS</span></div>
    </footer>
  );
}

function ProductMockup() {
  return (
    <div className="lumadio-visual" aria-label="Illustration of the Lumadio menu bar interface">
      <div className="lumadio-orbit lumadio-orbit-one" /><div className="lumadio-orbit lumadio-orbit-two" />
      <div className="lumadio-menu-window">
      <div className="lumadio-window-bar"><span className="lumadio-window-title"><Image src={withBasePath("/apps/lumadio/app-icon.png")} alt="" width={25} height={25} />Lumadio</span><span className="lumadio-live"><i /> Active</span></div>
        <div className="lumadio-scene-strip"><span>SCENE</span><div><button className="active">Focus</button><button>Movie</button><button>Night</button></div></div>
        <div className="lumadio-control-section">
          <div className="lumadio-section-label"><span><MonitorUp size={15} /> DISPLAYS</span><small>2 CONNECTED</small></div>
          <div className="lumadio-device-row"><div className="lumadio-device-icon"><SunMedium size={17} /></div><div className="lumadio-device-copy"><strong>Studio Display</strong><span>2560 × 1440 · 60 Hz</span></div><div className="lumadio-slider"><i style={{ width: "72%" }} /></div><b>72</b></div>
          <div className="lumadio-device-row"><div className="lumadio-device-icon purple"><Sparkles size={17} /></div><div className="lumadio-device-copy"><strong>MacBook Pro</strong><span>Built-in · Liquid Retina XDR</span></div><div className="lumadio-slider"><i style={{ width: "48%" }} /></div><b>48</b></div>
        </div>
        <div className="lumadio-control-section audio">
          <div className="lumadio-section-label"><span><AudioLines size={15} /> APP AUDIO</span><small>LIVE</small></div>
          <div className="lumadio-audio-row"><span className="lumadio-mini-app blue">M</span><div><strong>Music</strong><span className="lumadio-levels"><i /><i /><i /><i /></span></div><Volume2 size={16} /><b>64%</b></div>
          <div className="lumadio-audio-row"><span className="lumadio-mini-app coral">S</span><div><strong>Safari</strong><span className="lumadio-levels low"><i /><i /><i /><i /></span></div><Volume2 size={16} /><b>38%</b></div>
        </div>
      </div>
      <div className="lumadio-float-card"><Command size={17} /><span>Focus scene</span><kbd>⌥ S</kbd></div>
    </div>
  );
}

const features = [
  { icon: MonitorUp, title: "Display control", text: "Adjust brightness, switch resolutions and refresh rates, and manage HiDPI modes without opening System Settings.", accent: "blue" },
  { icon: AudioLines, title: "Per-app audio", text: "Set volume, mute, watch live levels, and choose an output device for each supported audio app.", accent: "coral" },
  { icon: Layers3, title: "Scenes", text: "Save your display and audio setup together. Move from focus to presentation or movie night in one action.", accent: "violet" },
  { icon: Command, title: "Shortcuts built in", text: "Use global hotkeys, Apple Shortcuts, and the lumadio:// URL scheme for visible display controls.", accent: "mint" },
  { icon: Blend, title: "Presentation mode", text: "Prepare connected displays and audio for sharing a screen, then return to your previous setup when finished.", accent: "amber" },
  { icon: WandSparkles, title: "Useful extras", text: "Bring more light to a call with Face Light, or use supported XDR headroom when your Mac and display allow it.", accent: "pink" },
];

export function LumadioHome() {
  return (
    <main className="lumadio-site">
      <LumadioHeader />
      <section className="lumadio-hero lumadio-shell">
        <div className="lumadio-hero-copy">
          <p className="lumadio-pill"><span /> Native macOS menu bar app</p>
          <h1>Your displays.<br />Your app audio.<br /><em>One menu bar.</em></h1>
          <p className="lumadio-lede">Lumadio puts the controls you reach for every day in one calm, fast place—then lets you save the whole setup as a scene.</p>
          <div className="lumadio-actions"><span className="lumadio-primary-button">Coming to the Mac App Store <ArrowRight size={17} /></span><a href="#features" className="lumadio-secondary-button">Explore features</a></div>
          <div className="lumadio-system-note"><span><Check size={14} /> Free to download</span><span><Check size={14} /> macOS 14.2+</span><span><Check size={14} /> Apple silicon</span></div>
        </div>
        <ProductMockup />
      </section>

      <section className="lumadio-manifesto">
        <div className="lumadio-shell"><p>CONTROL CENTER, RECONSIDERED</p><h2>Stop hunting through settings.<br /><span>Keep your setup within reach.</span></h2></div>
      </section>

      <section className="lumadio-feature-section lumadio-shell" id="features">
        <div className="lumadio-section-heading"><p>EVERYDAY CONTROL</p><h2>Small controls.<br />A much smoother Mac.</h2><span>Lumadio stays out of your way until you need it.</span></div>
        <div className="lumadio-feature-grid">{features.map(({ icon: Icon, title, text, accent }) => <article className={`lumadio-feature-card ${accent}`} key={title}><span className="lumadio-feature-icon"><Icon size={23} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="lumadio-scenes-section">
        <div className="lumadio-shell lumadio-scenes-grid">
          <div className="lumadio-scenes-copy"><p>ONE ACTION, WHOLE SETUP</p><h2>Scenes remember the way you work.</h2><p>Brightness, warmth, display mode, and app audio can change together. Create a setup once, then bring it back from the menu bar, a hotkey, or Shortcuts.</p><ul><li><MoonStar size={17} /> Settle into evening work</li><li><Route size={17} /> Route an app to another output</li><li><Gauge size={17} /> Normalize or solo supported audio</li></ul></div>
          <div className="lumadio-scene-stack"><div className="lumadio-scene-card back"><span>03</span><strong>Movie night</strong><small>Dim displays · Route audio</small></div><div className="lumadio-scene-card middle"><span>02</span><strong>Presentation</strong><small>Mirror display · Duck notifications</small></div><div className="lumadio-scene-card front"><span>01</span><strong>Deep focus</strong><small>72% brightness · Music at 24%</small><div className="lumadio-scene-ready"><i /> Ready</div></div></div>
        </div>
      </section>

      <section className="lumadio-privacy-callout lumadio-shell"><div><span className="lumadio-shield"><Check size={24} /></span><p>PRIVATE BY DEFAULT</p><h2>Your controls stay on your Mac.</h2></div><div><p>Lumadio stores preferences, scenes, and settings locally. It does not contain advertising trackers, does not record audio content, and does not automatically upload diagnostics.</p><Link href={`${appPath}/privacy`}>Read the privacy policy <ArrowRight size={15} /></Link></div></section>

      <section className="lumadio-pricing lumadio-shell" id="pricing">
        <div className="lumadio-section-heading centered"><p>SIMPLE PRICING</p><h2>Start free. Keep Pro forever.</h2><span>No subscription. No feature bundles. One affordable lifetime unlock.</span></div>
        <div className="lumadio-price-card"><div className="lumadio-price-main"><span>LUMADIO PRO</span><div><strong>$4.99</strong><small>one-time purchase</small></div><p>Lifetime access to Lumadio Pro through a non-consumable in-app purchase.</p><span className="lumadio-primary-button">Available at launch</span></div><div className="lumadio-price-features"><strong>Pro includes</strong><ul><li><Check /> Unlimited scenes and scene shortcuts</li><li><Check /> Per-app routing, Solo, pan, and normalization</li><li><Check /> XDR enhancement and Face Light</li><li><Check /> Presentation and display automations</li><li><Check /> Advanced Apple Shortcuts actions</li></ul><small>Price shown in USD. Local App Store pricing and taxes may vary.</small></div></div>
      </section>

      <section className="lumadio-final-cta"><div className="lumadio-shell"><Image src={withBasePath("/apps/lumadio/app-icon.png")} alt="Lumadio app icon" width={82} height={82} /><p>YOUR MAC, IN HARMONY</p><h2>One menu bar.<br />Fewer detours.</h2><span className="lumadio-primary-button">Coming to the Mac App Store <ArrowRight size={17} /></span></div></section>
      <LumadioFooter />
    </main>
  );
}

export function LegalPage({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: React.ReactNode }) {
  return <main className="lumadio-site"><LumadioHeader /><article className="lumadio-legal lumadio-shell"><header><p>{eyebrow}</p><h1>{title}</h1><span>Last updated: {updated}</span></header><div className="lumadio-legal-body">{children}</div></article><LumadioFooter /></main>;
}

export function ContactLink({ subject, children }: { subject: string; children?: React.ReactNode }) {
  return <a href={`mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`}>{children ?? supportEmail}</a>;
}

export const lumadioSupportEmail = supportEmail;
