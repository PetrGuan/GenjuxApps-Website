import type { SiteLocale } from "@/i18n/routing.mjs";
import { ContactLink, LegalPage } from "./lumadio-site";

const content = {
  en: {
    eyebrow: "LEGAL / PRIVACY",
    title: "Privacy Policy",
    updated: "2026-08-28",
    intro: "Lumadio is designed to perform its core work on your Mac. We do not sell personal information, show ads, or include third-party advertising trackers.",
    sections: [
      {
        heading: "1. Information Lumadio stores",
        paragraphs: ["Lumadio stores app preferences and the configurations you create locally on your Mac. These may include scenes, display settings, audio settings, automation mappings, remembered app identifiers, and permission-related state. This information is used to provide the features you request."],
      },
      {
        heading: "2. Display and audio access",
        paragraphs: [
          "Lumadio reads information about connected displays and currently running audio applications so it can present and apply controls. Per-app audio features use Apple's Core Audio facilities and may require the system's audio-recording permission.",
          "Lumadio does not record, save, transcribe, or transmit the content of your audio. It processes control and level information needed for features such as volume, mute, routing, and meters.",
        ],
      },
      {
        heading: "3. Diagnostics",
        paragraphs: [
          "Diagnostic logs are stored locally to help identify technical problems. Storage is limited and old entries are removed automatically. Diagnostics are not automatically uploaded.",
          "If you choose to export and send a diagnostic file to support, it may contain technical events, app and operating-system versions, feature state, and sanitized device information. Lumadio is designed not to log audio content, screen content, full file paths, browsing URLs, raw display serial numbers, or user-created content.",
        ],
      },
      {
        heading: "4. Purchases",
        paragraphs: ["In-app purchases are processed by Apple through the Mac App Store. Genjux does not receive your full payment-card details. Apple may process purchase, account, tax, and transaction information under Apple's own privacy policy. Lumadio receives purchase entitlement information required to unlock and restore Pro features."],
      },
      {
        heading: "5. Support communications",
        paragraphs: ["If you contact support, we receive the information you provide, such as your email address, message, and attachments. We use it to answer your request, diagnose problems, and maintain appropriate support records. Please do not send passwords, payment-card details, or unrelated sensitive information."],
      },
      {
        heading: "6. Website hosting",
        paragraphs: [
          "This website is hosted by GitHub Pages. GitHub may process technical request information such as IP address, browser type, requested URL, and timestamps for security and service operation. This website does not use advertising cookies or analytics operated by Genjux.",
          "If you manually choose a website language, this website stores that preference locally in your browser under the key “genjuxapps.locale”. It is used only to remember your website language, is not a Lumadio app setting, and is not used or sent for analytics or tracking. Choosing Chinese requests a /zh/... URL, which the hosting provider may process as part of an ordinary website request; no separate analytics or preference upload is introduced.",
        ],
      },
      {
        heading: "7. Disclosure and retention",
        paragraphs: ["We do not sell or rent personal information. We may disclose information when required by law, to protect users or the service, or to service providers acting on our instructions. Local app data remains until you remove it, reset the app, or uninstall it. Support records are kept only as reasonably necessary for support, security, and legal obligations."],
      },
      {
        heading: "8. Children",
        paragraphs: ["Lumadio is a general-purpose macOS utility and is not directed to children under 13. We do not knowingly collect personal information from children."],
      },
      {
        heading: "9. Changes",
        paragraphs: ["We may update this policy as Lumadio evolves. Material changes will be reflected on this page with a revised date."],
      },
    ],
    contactHeading: "10. Contact",
    contactPrefix: "For privacy questions or requests, email",
    subject: "Lumadio Privacy Request",
  },
  zh: {
    eyebrow: "法律 / 隐私",
    title: "隐私政策",
    updated: "2026-08-28",
    intro: "Lumadio 的核心工作均在你的 Mac 上完成。我们不会出售个人信息、展示广告，也不包含第三方广告跟踪器。",
    sections: [
      {
        heading: "1. Lumadio 存储的信息",
        paragraphs: ["Lumadio 会在你的 Mac 本地存储应用偏好和你创建的配置，其中可能包括场景、显示器设置、音频设置、自动化映射、记住的应用标识符以及与权限相关的状态。这些信息仅用于提供你所请求的功能。"],
      },
      {
        heading: "2. 显示器与音频访问",
        paragraphs: [
          "Lumadio 会读取已连接显示器和当前正在运行的音频应用信息，以便显示并应用控制。各应用音频功能使用 Apple 的 Core Audio 设施，并可能需要系统的录音权限。",
          "Lumadio 不会录制、保存、转写或传输你的音频内容。它只处理音量、静音、路由和电平表等功能所需的控制与电平信息。",
        ],
      },
      {
        heading: "3. 诊断信息",
        paragraphs: [
          "诊断日志存储在本地，用于帮助识别技术问题。存储空间受到限制，旧条目会自动移除。诊断信息不会自动上传。",
          "如果你选择导出诊断文件并将其发送给支持团队，文件可能包含技术事件、应用与操作系统版本、功能状态以及经过清理的设备信息。Lumadio 的设计不会记录音频内容、屏幕内容、完整文件路径、浏览 URL、原始显示器序列号或用户创建的内容。",
        ],
      },
      {
        heading: "4. 购买",
        paragraphs: ["App 内购买由 Apple 通过 Mac App Store 处理。Genjux 不会收到你的完整支付卡信息。Apple 可能依据其自身隐私政策处理购买、账户、税务和交易信息。Lumadio 会收到解锁和恢复 Pro 功能所需的购买权益信息。"],
      },
      {
        heading: "5. 支持通信",
        paragraphs: ["如果你联系支持团队，我们会收到你提供的信息，例如电子邮件地址、消息和附件。我们使用这些信息回复请求、诊断问题并保存适当的支持记录。请勿发送密码、支付卡信息或无关的敏感信息。"],
      },
      {
        heading: "6. 网站托管",
        paragraphs: [
          "本网站由 GitHub Pages 托管。出于安全和服务运行目的，GitHub 可能处理 IP 地址、浏览器类型、请求的 URL 和时间戳等技术请求信息。本网站不使用广告 Cookie，也不使用由 Genjux 运营的分析服务。",
          "如果你手动选择网站语言，本网站会在浏览器本地以“genjuxapps.locale”键保存该偏好。它仅用于记住你选择的网站语言，不属于 Lumadio 应用设置，也不会用于或发送给分析或跟踪服务。选择中文会请求 /zh/... URL，托管服务提供商可能会按普通网站请求处理该 URL；除此之外，不会单独上传分析数据或语言偏好。",
        ],
      },
      {
        heading: "7. 披露与保留",
        paragraphs: ["我们不会出售或出租个人信息。法律要求、保护用户或服务，或服务提供商按我们的指示开展工作时，我们可能披露信息。本地应用数据会一直保留，直到你将其删除、重置应用或卸载应用。支持记录仅在支持、安全和法律义务所合理需要的期限内保留。"],
      },
      {
        heading: "8. 儿童",
        paragraphs: ["Lumadio 是一款通用 macOS 实用工具，并非面向 13 岁以下儿童。我们不会在知情的情况下收集儿童的个人信息。"],
      },
      {
        heading: "9. 变更",
        paragraphs: ["随着 Lumadio 的发展，我们可能更新本政策。重大变更会在本页体现，并更新修订日期。"],
      },
    ],
    contactHeading: "10. 联系我们",
    contactPrefix: "如有隐私问题或请求，请发送电子邮件至",
    subject: "Lumadio 隐私请求",
  },
} as const;

export default function LumadioPrivacy({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = content[locale];
  return (
    <LegalPage eyebrow={copy.eyebrow} title={copy.title} updated={copy.updated} locale={locale}>
      <p className="lumadio-legal-intro">{copy.intro}</p>
      {copy.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
      <section><h2>{copy.contactHeading}</h2><p>{copy.contactPrefix} <ContactLink subject={copy.subject} />{locale === "en" ? "." : "。"}</p></section>
    </LegalPage>
  );
}
