import { ArrowRight, AudioLines, CircleHelp, MonitorUp, ShieldCheck } from "lucide-react";
import type { SiteLocale } from "@/i18n/routing.mjs";
import { ContactLink, LegalPage, lumadioSupportEmail } from "./lumadio-site";

const content = {
  en: {
    eyebrow: "HELP / SUPPORT",
    title: "How can we help?",
    updated: "2026-08-28",
    cards: [
      { title: "Display controls", text: "Reconnect the display, reopen Lumadio, and confirm macOS can see it in System Settings › Displays." },
      { title: "App audio", text: "Grant the requested audio permission, then quit and reopen both Lumadio and the audio app." },
      { title: "Privacy & permissions", text: "Lumadio requests only the system access needed for the feature you choose to use." },
    ],
    requirementsHeading: "System requirements",
    requirements: "Lumadio requires an Apple silicon Mac running macOS 14.2 or later. Individual features also depend on the connected display, audio device, application, and available display headroom.",
    permissionHeading: "Audio permission",
    permission: "Per-app audio controls rely on Apple's Core Audio Process Tap and may require audio-recording permission. Lumadio uses this access for app identification, level information, and audio controls; it does not record or save audio content.",
    permissionSteps: [
      "Open System Settings.",
      "Go to Privacy & Security and locate the audio-recording permission requested by Lumadio.",
      "Enable Lumadio, then quit and reopen the app.",
    ],
    displayHeading: "A display control is unavailable",
    display: "Not every display exposes every capability. The Mac App Store edition uses public macOS display controls and software brightness for external displays; hardware-specific controls may be unavailable. XDR enhancement requires a compatible Mac and display with available EDR headroom.",
    appHeading: "An app does not appear in App Audio",
    app: "Play audio in the app first, then reopen Lumadio. Some applications, protected media, unusual audio formats, or system processes may not be available for per-app control. Browser attribution can also vary by browser and playback process.",
    restoreHeading: "Restore Lumadio Pro",
    restore: "Open Lumadio Settings, select the Lumadio Pro section, and choose Restore Purchases. Use the same Apple ID that made the original Mac App Store purchase. Apple manages purchase restoration and billing.",
    diagnosticsHeading: "Send useful diagnostics",
    diagnostics: "From Lumadio Settings, export diagnostics and attach the resulting file to your support message. Diagnostics are never uploaded automatically. Include your macOS version, Mac model, display or audio-device model, and clear steps to reproduce the issue. Do not include passwords or sensitive personal information.",
    contactHeading: "Still need help?",
    contactText: "Support is currently available in English and Chinese.",
    contactAction: "Email support",
    subject: "Lumadio Support",
  },
  zh: {
    eyebrow: "帮助 / 支持",
    title: "需要什么帮助？",
    updated: "2026-08-28",
    cards: [
      { title: "显示器控制", text: "重新连接显示器并重新打开 Lumadio，然后确认 macOS 能在“系统设置”›“显示器”中识别它。" },
      { title: "应用音频", text: "授予所请求的音频权限，然后退出并重新打开 Lumadio 和音频应用。" },
      { title: "隐私与权限", text: "Lumadio 只会请求你所选功能正常工作所需的系统访问权限。" },
    ],
    requirementsHeading: "系统要求",
    requirements: "Lumadio 需要运行 macOS 14.2 或更高版本的 Apple 芯片 Mac。各项功能还取决于已连接的显示器、音频设备、应用以及可用的显示余量。",
    permissionHeading: "音频权限",
    permission: "各应用音频控制依赖 Apple 的 Core Audio Process Tap，并可能需要录音权限。Lumadio 使用此访问权限来识别应用、获取电平信息并提供音频控制；它不会录制或保存音频内容。",
    permissionSteps: [
      "打开“系统设置”。",
      "前往“隐私与安全性”，找到 Lumadio 请求的录音权限。",
      "启用 Lumadio，然后退出并重新打开应用。",
    ],
    displayHeading: "某项显示器控制不可用",
    display: "并非每台显示器都会开放所有能力。Mac App Store 版本使用公开的 macOS 显示器控制，并通过软件亮度控制外接显示器；特定硬件控制可能不可用。XDR 增强需要兼容的 Mac 和显示器，并且具备可用的 EDR 余量。",
    appHeading: "应用未出现在“应用音频”中",
    app: "请先在该应用中播放音频，再重新打开 Lumadio。某些应用、受保护媒体、特殊音频格式或系统进程可能无法进行各应用控制。浏览器归属也可能因浏览器和播放进程而异。",
    restoreHeading: "恢复 Lumadio Pro",
    restore: "打开 Lumadio 设置，选择 Lumadio Pro 部分，然后选择“恢复购买”。请使用最初在 Mac App Store 购买时使用的同一 Apple ID。购买恢复与账单由 Apple 管理。",
    diagnosticsHeading: "发送有用的诊断信息",
    diagnostics: "从 Lumadio 设置中导出诊断信息，并将生成的文件附加到支持消息中。诊断信息绝不会自动上传。请包含 macOS 版本、Mac 型号、显示器或音频设备型号，以及清晰的问题复现步骤。请勿包含密码或敏感个人信息。",
    contactHeading: "仍需要帮助？",
    contactText: "支持目前提供英语和中文服务。",
    contactAction: "发送支持邮件",
    subject: "Lumadio 支持",
  },
} as const;

const cardIcons = [MonitorUp, AudioLines, ShieldCheck] as const;

export default function LumadioSupport({ locale = "en" }: { locale?: SiteLocale }) {
  const copy = content[locale];
  return (
    <LegalPage eyebrow={copy.eyebrow} title={copy.title} updated={copy.updated} locale={locale}>
      <div className="lumadio-support-cards">
        {copy.cards.map((card, index) => {
          const Icon = cardIcons[index];
          return <article key={card.title}><Icon /><h2>{card.title}</h2><p>{card.text}</p></article>;
        })}
      </div>

      <section><h2>{copy.requirementsHeading}</h2><p>{copy.requirements}</p></section>

      <section><h2>{copy.permissionHeading}</h2><p>{copy.permission}</p><ol>{copy.permissionSteps.map((step) => <li key={step}>{step}</li>)}</ol></section>

      <section><h2>{copy.displayHeading}</h2><p>{copy.display}</p></section>

      <section><h2>{copy.appHeading}</h2><p>{copy.app}</p></section>

      <section><h2>{copy.restoreHeading}</h2><p>{copy.restore}</p></section>

      <section><h2>{copy.diagnosticsHeading}</h2><p>{copy.diagnostics}</p></section>

      <section className="lumadio-contact-panel"><CircleHelp /><div><h2>{copy.contactHeading}</h2><p>{locale === "en" ? "Email" : "电子邮件"} <strong>{lumadioSupportEmail}</strong>{locale === "en" ? ". " : "。"}{copy.contactText}</p></div><ContactLink subject={copy.subject}>{copy.contactAction} <ArrowRight size={16} /></ContactLink></section>
    </LegalPage>
  );
}
