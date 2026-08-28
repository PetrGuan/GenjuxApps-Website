import type { Metadata } from "next";
import { ContactLink, LegalPage } from "@/components/lumadio/lumadio-site";

export const metadata: Metadata = {
  title: "Terms of Use — Lumadio",
  description: "Terms governing use of the Lumadio macOS application and website.",
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="LEGAL / TERMS" title="Terms of Use" updated="August 28, 2026">
      <p className="lumadio-legal-intro">These terms govern your use of Lumadio and its website. By downloading or using Lumadio, you agree to these terms.</p>

      <section><h2>1. License</h2><p>Subject to these terms and applicable App Store rules, Genjux grants you a limited, personal, non-exclusive, non-transferable, revocable license to use Lumadio on compatible Apple-branded devices you own or control.</p></section>

      <section><h2>2. App Store terms</h2><p>If you obtain Lumadio from the Mac App Store, Apple&apos;s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Standard Licensed Application End User License Agreement</a> applies unless a different agreement is presented by Apple. These terms supplement, and do not replace, mandatory App Store terms. Apple is not responsible for providing maintenance or support for Lumadio except as required by law.</p></section>

      <section><h2>3. Free and Pro features</h2><p>Lumadio may provide free functionality and an optional Lumadio Pro lifetime unlock as a non-consumable in-app purchase. The price displayed in the App Store at the time of purchase controls and may vary by country, currency, and tax. Purchases, refunds, billing, Family Sharing availability, and restoration are administered under Apple&apos;s applicable policies.</p></section>

      <section><h2>4. Responsible use</h2><p>You may not reverse engineer Lumadio except where applicable law expressly permits it, bypass purchase or access controls, misuse automation interfaces, interfere with the app or related services, or use Lumadio unlawfully. You are responsible for reviewing automated display and audio actions before relying on them in important situations.</p></section>

      <section><h2>5. Compatibility and third-party systems</h2><p>Features depend on macOS, Mac hardware, connected displays, audio devices, application behavior, permissions, and Apple frameworks. Some controls may be unavailable or behave differently with particular hardware, apps, protected audio, or operating-system versions. Lumadio does not guarantee universal compatibility.</p></section>

      <section><h2>6. Updates and changes</h2><p>We may improve, change, discontinue, or add features. Updates may require a newer version of macOS. We aim to preserve the value of a lifetime Pro purchase, but cannot guarantee that every future feature or separately released product will be included where law permits otherwise.</p></section>

      <section><h2>7. Disclaimer</h2><p>To the maximum extent permitted by law, Lumadio is provided “as is” and “as available,” without warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted operation. Nothing in these terms excludes warranties or rights that cannot legally be excluded.</p></section>

      <section><h2>8. Limitation of liability</h2><p>To the maximum extent permitted by law, Genjux will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, revenue, profits, or business arising from use of Lumadio. Where liability cannot be excluded, it is limited to the amount you paid for Lumadio during the twelve months before the event giving rise to the claim.</p></section>

      <section><h2>9. Termination</h2><p>Your license ends if you materially violate these terms. Upon termination, you must stop using Lumadio. Provisions that by their nature should survive will remain effective.</p></section>

      <section><h2>10. Contact</h2><p>Questions about these terms may be sent to <ContactLink subject="Lumadio Terms Question" />.</p></section>
    </LegalPage>
  );
}
