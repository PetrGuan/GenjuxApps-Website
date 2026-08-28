import type { Metadata } from "next";
import { ArrowRight, AudioLines, CircleHelp, MonitorUp, ShieldCheck } from "lucide-react";
import { ContactLink, LegalPage, lumadioSupportEmail } from "@/components/lumadio/lumadio-site";

export const metadata: Metadata = {
  title: "Support — Lumadio",
  description: "System requirements, permission help, troubleshooting, and contact information for Lumadio.",
};

export default function SupportPage() {
  return (
    <LegalPage eyebrow="HELP / SUPPORT" title="How can we help?" updated="August 28, 2026">
      <div className="lumadio-support-cards">
        <article><MonitorUp /><h2>Display controls</h2><p>Reconnect the display, reopen Lumadio, and confirm macOS can see it in System Settings › Displays.</p></article>
        <article><AudioLines /><h2>App audio</h2><p>Grant the requested audio permission, then quit and reopen both Lumadio and the audio app.</p></article>
        <article><ShieldCheck /><h2>Privacy & permissions</h2><p>Lumadio requests only the system access needed for the feature you choose to use.</p></article>
      </div>

      <section><h2>System requirements</h2><p>Lumadio requires an Apple silicon Mac running macOS 14.2 or later. Individual features also depend on the connected display, audio device, application, and available display headroom.</p></section>

      <section><h2>Audio permission</h2><p>Per-app audio controls rely on Apple&apos;s Core Audio Process Tap and may require audio-recording permission. Lumadio uses this access for app identification, level information, and audio controls; it does not record or save audio content.</p><ol><li>Open System Settings.</li><li>Go to Privacy &amp; Security and locate the audio-recording permission requested by Lumadio.</li><li>Enable Lumadio, then quit and reopen the app.</li></ol></section>

      <section><h2>A display control is unavailable</h2><p>Not every display exposes every capability. The Mac App Store edition uses public macOS display controls and software brightness for external displays; hardware-specific controls may be unavailable. XDR enhancement requires a compatible Mac and display with available EDR headroom.</p></section>

      <section><h2>An app does not appear in App Audio</h2><p>Play audio in the app first, then reopen Lumadio. Some applications, protected media, unusual audio formats, or system processes may not be available for per-app control. Browser attribution can also vary by browser and playback process.</p></section>

      <section><h2>Restore Lumadio Pro</h2><p>Open Lumadio Settings, select the Lumadio Pro section, and choose Restore Purchases. Use the same Apple ID that made the original Mac App Store purchase. Apple manages purchase restoration and billing.</p></section>

      <section><h2>Send useful diagnostics</h2><p>From Lumadio Settings, export diagnostics and attach the resulting file to your support message. Diagnostics are never uploaded automatically. Include your macOS version, Mac model, display or audio-device model, and clear steps to reproduce the issue. Do not include passwords or sensitive personal information.</p></section>

      <section className="lumadio-contact-panel"><CircleHelp /><div><h2>Still need help?</h2><p>Email <strong>{lumadioSupportEmail}</strong>. Support is currently available in English and Chinese.</p></div><ContactLink subject="Lumadio Support">Email support <ArrowRight size={16} /></ContactLink></section>
    </LegalPage>
  );
}
