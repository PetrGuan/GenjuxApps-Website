import type { ReactNode } from "react";
import type { SiteLocale } from "@/i18n/routing.mjs";
import { ContactLink, LegalPage } from "./lumadio-site";

type Paragraph = string | { before: string; link: string; after: string };

const appleEula = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

const content = {
  en: {
    eyebrow: "LEGAL / TERMS",
    title: "Terms of Use",
    updated: "2026-08-28",
    intro: "These terms govern your use of Lumadio and its website. By downloading or using Lumadio, you agree to these terms.",
    sections: [
      { heading: "1. License", paragraphs: ["Subject to these terms and applicable App Store rules, Genjux grants you a limited, personal, non-exclusive, non-transferable, revocable license to use Lumadio on compatible Apple-branded devices you own or control."] },
      { heading: "2. App Store terms", paragraphs: [{ before: "If you obtain Lumadio from the Mac App Store, Apple's ", link: "Standard Licensed Application End User License Agreement", after: " applies unless a different agreement is presented by Apple. These terms supplement, and do not replace, mandatory App Store terms. Apple is not responsible for providing maintenance or support for Lumadio except as required by law." }] },
      { heading: "3. Free and Pro features", paragraphs: ["Lumadio may provide free functionality and an optional Lumadio Pro lifetime unlock as a non-consumable in-app purchase. The price displayed in the App Store at the time of purchase controls and may vary by country, currency, and tax. Purchases, refunds, billing, Family Sharing availability, and restoration are administered under Apple's applicable policies."] },
      { heading: "4. Responsible use", paragraphs: ["You may not reverse engineer Lumadio except where applicable law expressly permits it, bypass purchase or access controls, misuse automation interfaces, interfere with the app or related services, or use Lumadio unlawfully. You are responsible for reviewing automated display and audio actions before relying on them in important situations."] },
      { heading: "5. Compatibility and third-party systems", paragraphs: ["Features depend on macOS, Mac hardware, connected displays, audio devices, application behavior, permissions, and Apple frameworks. Some controls may be unavailable or behave differently with particular hardware, apps, protected audio, or operating-system versions. Lumadio does not guarantee universal compatibility."] },
      { heading: "6. Updates and changes", paragraphs: ["We may improve, change, discontinue, or add features. Updates may require a newer version of macOS. We aim to preserve the value of a lifetime Pro purchase, but cannot guarantee that every future feature or separately released product will be included where law permits otherwise."] },
      { heading: "7. Disclaimer", paragraphs: ["To the maximum extent permitted by law, Lumadio is provided “as is” and “as available,” without warranties of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted operation. Nothing in these terms excludes warranties or rights that cannot legally be excluded."] },
      { heading: "8. Limitation of liability", paragraphs: ["To the maximum extent permitted by law, Genjux will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, revenue, profits, or business arising from use of Lumadio. Where liability cannot be excluded, it is limited to the amount you paid for Lumadio during the twelve months before the event giving rise to the claim."] },
      { heading: "9. Termination", paragraphs: ["Your license ends if you materially violate these terms. Upon termination, you must stop using Lumadio. Provisions that by their nature should survive will remain effective."] },
    ],
    contactHeading: "10. Contact",
    contactPrefix: "Questions about these terms may be sent to",
    subject: "Lumadio Terms Question",
  },
  zh: {
    eyebrow: "法律 / 条款",
    title: "使用条款",
    updated: "2026-08-28",
    intro: "本条款规范你对 Lumadio 及其网站的使用。下载或使用 Lumadio 即表示你同意本条款。",
    sections: [
      { heading: "1. 许可", paragraphs: ["在遵守本条款及适用 App Store 规则的前提下，Genjux 授予你一项有限的、个人的、非独占的、不可转让的、可撤销的许可，允许你在自己拥有或控制的兼容 Apple 品牌设备上使用 Lumadio。"] },
      { heading: "2. App Store 条款", paragraphs: [{ before: "如果你从 Mac App Store 获取 Lumadio，除非 Apple 另行提供其他协议，否则适用 Apple 的", link: "《标准许可应用程序最终用户许可协议》", after: "。本条款是对强制性 App Store 条款的补充，而非替代。除法律要求外，Apple 不负责为 Lumadio 提供维护或支持。"}] },
      { heading: "3. 免费与 Pro 功能", paragraphs: ["Lumadio 可能提供免费功能，以及通过非消耗型 App 内购买提供可选的 Lumadio Pro 终身解锁。购买时 App Store 显示的价格为准，并可能因国家或地区、货币和税费而异。购买、退款、账单、家人共享可用性和恢复均依据 Apple 的适用政策管理。"] },
      { heading: "4. 负责任地使用", paragraphs: ["除适用法律明确允许外，你不得对 Lumadio 进行逆向工程、绕过购买或访问控制、滥用自动化接口、干扰应用或相关服务，或以违法方式使用 Lumadio。在重要情形中依赖自动显示器和音频操作前，你有责任先检查这些操作。"] },
      { heading: "5. 兼容性与第三方系统", paragraphs: ["功能取决于 macOS、Mac 硬件、已连接显示器、音频设备、应用行为、权限和 Apple 框架。特定硬件、应用、受保护音频或操作系统版本可能导致某些控制不可用或表现不同。Lumadio 不保证普遍兼容。"] },
      { heading: "6. 更新与变更", paragraphs: ["我们可能改进、变更、停止或新增功能。更新可能需要较新版本的 macOS。我们力求保留 Pro 终身购买的价值，但在法律允许的情况下，无法保证每项未来功能或单独发布的产品都包含在内。"] },
      { heading: "7. 免责声明", paragraphs: ["在法律允许的最大范围内，Lumadio 按“现状”和“可用状态”提供，不对适销性、特定用途适用性、不侵权或不间断运行作出保证。本条款不排除任何依法不能排除的保证或权利。"] },
      { heading: "8. 责任限制", paragraphs: ["在法律允许的最大范围内，Genjux 不对因使用 Lumadio 而产生的间接、附带、特殊、后果性或惩罚性损害，或数据、收入、利润或业务损失承担责任。如责任无法排除，其上限为引发索赔事件前十二个月内你为 Lumadio 支付的金额。"] },
      { heading: "9. 终止", paragraphs: ["如果你严重违反本条款，你的许可将终止。终止后，你必须停止使用 Lumadio。依其性质应继续有效的条款仍将有效。"] },
    ],
    contactHeading: "10. 联系我们",
    contactPrefix: "有关本条款的问题可发送至",
    subject: "Lumadio 条款问题",
  },
} satisfies Record<SiteLocale, {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: readonly { heading: string; paragraphs: readonly Paragraph[] }[];
  contactHeading: string;
  contactPrefix: string;
  subject: string;
}>;

function renderParagraph(paragraph: Paragraph): ReactNode {
  if (typeof paragraph === "string") return paragraph;
  return <>{paragraph.before}<a href={appleEula}>{paragraph.link}</a>{paragraph.after}</>;
}

export default function LumadioTerms({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = content[locale];
  return (
    <LegalPage eyebrow={copy.eyebrow} title={copy.title} updated={copy.updated} locale={locale}>
      <p className="lumadio-legal-intro">{copy.intro}</p>
      {copy.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{renderParagraph(paragraph)}</p>)}</section>)}
      <section><h2>{copy.contactHeading}</h2><p>{copy.contactPrefix} <ContactLink subject={copy.subject} />{locale === "en" ? "." : "。"}</p></section>
    </LegalPage>
  );
}
