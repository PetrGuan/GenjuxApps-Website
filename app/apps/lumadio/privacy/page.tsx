import type { Metadata } from "next";
import { ContactLink, LegalPage } from "@/components/lumadio/lumadio-site";

export const metadata: Metadata = {
  title: "Privacy Policy — Lumadio",
  description: "How Lumadio handles settings, diagnostics, permissions, purchases, and support information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="LEGAL / PRIVACY" title="Privacy Policy" updated="August 28, 2026">
      <p className="lumadio-legal-intro">Lumadio is designed to perform its core work on your Mac. We do not sell personal information, show ads, or include third-party advertising trackers.</p>

      <section><h2>1. Information Lumadio stores</h2><p>Lumadio stores app preferences and the configurations you create locally on your Mac. These may include scenes, display settings, audio settings, automation mappings, remembered app identifiers, and permission-related state. This information is used to provide the features you request.</p></section>

      <section><h2>2. Display and audio access</h2><p>Lumadio reads information about connected displays and currently running audio applications so it can present and apply controls. Per-app audio features use Apple&apos;s Core Audio facilities and may require the system&apos;s audio-recording permission.</p><p>Lumadio does not record, save, transcribe, or transmit the content of your audio. It processes control and level information needed for features such as volume, mute, routing, and meters.</p></section>

      <section><h2>3. Diagnostics</h2><p>Diagnostic logs are stored locally to help identify technical problems. Storage is limited and old entries are removed automatically. Diagnostics are not automatically uploaded.</p><p>If you choose to export and send a diagnostic file to support, it may contain technical events, app and operating-system versions, feature state, and sanitized device information. Lumadio is designed not to log audio content, screen content, full file paths, browsing URLs, raw display serial numbers, or user-created content.</p></section>

      <section><h2>4. Purchases</h2><p>In-app purchases are processed by Apple through the Mac App Store. Genjux does not receive your full payment-card details. Apple may process purchase, account, tax, and transaction information under Apple&apos;s own privacy policy. Lumadio receives purchase entitlement information required to unlock and restore Pro features.</p></section>

      <section><h2>5. Support communications</h2><p>If you contact support, we receive the information you provide, such as your email address, message, and attachments. We use it to answer your request, diagnose problems, and maintain appropriate support records. Please do not send passwords, payment-card details, or unrelated sensitive information.</p></section>

      <section><h2>6. Website hosting</h2><p>This website is hosted by GitHub Pages. GitHub may process technical request information such as IP address, browser type, requested URL, and timestamps for security and service operation. This website does not use advertising cookies or analytics operated by Genjux.</p></section>

      <section><h2>7. Disclosure and retention</h2><p>We do not sell or rent personal information. We may disclose information when required by law, to protect users or the service, or to service providers acting on our instructions. Local app data remains until you remove it, reset the app, or uninstall it. Support records are kept only as reasonably necessary for support, security, and legal obligations.</p></section>

      <section><h2>8. Children</h2><p>Lumadio is a general-purpose macOS utility and is not directed to children under 13. We do not knowingly collect personal information from children.</p></section>

      <section><h2>9. Changes</h2><p>We may update this policy as Lumadio evolves. Material changes will be reflected on this page with a revised date.</p></section>

      <section><h2>10. Contact</h2><p>For privacy questions or requests, email <ContactLink subject="Lumadio Privacy Request" />.</p></section>
    </LegalPage>
  );
}
