import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Cloud,
  Copy,
  FileText,
  Gauge,
  History,
  Laptop,
  LockKeyhole,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Trash2,
} from "lucide-react";
import LocaleLink from "@/components/locale-link";
import type { SiteLocale } from "@/i18n/routing.mjs";
import { withBasePath } from "@/lib/site-paths";
import { neoWriterContactHref, neoWriterProduct } from "./site";
import styles from "./neowriter.module.css";

const homeCopy = {
  en: {
    metadataDescription: "Draft-first protection, native writing and reading, and optional on-device encryption for cloud vaults and backups. For Mac, iPhone, and iPad.",
    hero: {
      eyebrow: "YOUR WORDS ARE NOT DISPOSABLE.",
      title: <>Write freely.<br /><em>Keep every draft.</em></>,
      description: "Draft-first protection. Fluid native writing and reading. Cloud copies encrypted on your device when you choose vault mode. Built so you can think about the next sentence, not worry about the last.",
      discover: "Discover the difference",
      release: "Get release details",
      platforms: <>iPhone &amp; iPad <span /> <Laptop size={16} aria-hidden="true" /> Mac</>,
    },
    screenshots: {
      macLabel: "Open the full NeoWriter Mac screenshot in a new tab",
      macAlt: "NeoWriter for Mac showing the Books sidebar and an empty writing workspace",
      iosLabel: "Open the full NeoWriter iPhone screenshot in a new tab",
      iosAlt: "NeoWriter for iPhone showing its sample article library in dark mode",
      caption: <>NeoWriter on Mac and iPhone.<br />Open either screenshot for a closer look.</>,
    },
    principlesLabel: "NeoWriter core strengths",
    principles: [
      { title: "Protect every draft.", detail: "Autosave. History. Recovery.", href: "#recovery" },
      { title: "Stay in your flow.", detail: "Native writing and reading.", href: "#writing" },
      { title: "Keep cloud copies private.", detail: "Choose encrypted vault mode.", href: "#encryption" },
    ],
    recovery: {
      eyebrow: "01 / YOUR DRAFT COMES FIRST",
      title: <>A better sentence<br /><em>shouldn&apos;t cost you the last one.</em></>,
      paragraphs: [
        "An interruption. An accidental deletion. Two devices with different edits. NeoWriter is built around keeping the words, not making you start again.",
        "Protection is a stack, not a single Save button: local autosave, recoverable versions, Trash, backups, and a deliberate keep-both approach to conflicting changes.",
      ],
      link: "Know your recovery paths",
      steps: [
        { title: "Save where you write.", text: "Draft changes autosave locally. A network connection is not a prerequisite for keeping your work." },
        { title: "Preserve before replacing.", text: "Version history gives earlier words a place to live. Restoring a revision first protects the current draft." },
        { title: "Keep the disagreement.", text: "Conflicting edits become something you can review, not permission to silently overwrite your text." },
        { title: "Leave yourself a way back.", text: "Trash and validated backup restoration add recovery paths beyond a single working copy." },
      ],
    },
    writing: {
      eyebrow: "02 / LESS FRICTION. MORE FLOW.",
      title: <>Stay with the thought.<br /><em>Not the interface.</em></>,
      introduction: "Writing should feel immediate. Reading should keep its rhythm. Native editing, responsive Markdown, and a focused reading view put the experience ahead of the feature count.",
      performanceEyebrow: "60 / 120 HZ ENGINEERING TARGETS",
      performanceTitle: "Every frame matters.",
      performanceText: "Input, scrolling, selection, and reading belong in the foreground. Expensive analysis and backup work should not stand between you and the next line.",
      frameLabels: ["Standard displays", "Supported ProMotion displays"],
      frameBudget: "ms frame budget",
      performanceNote: <><strong>Engineering targets, not measured pass results.</strong> 120 Hz requires supported ProMotion hardware; actual performance varies with the system and the work on the page.</>,
      features: [
        { title: "Markdown that reads like prose.", text: "Formatting markers step out of the way as you leave a line and return when you edit it. Read the piece, not a wall of punctuation." },
        { title: "Stay with the line.", text: "Native text editing, focus and typewriter modes, keyboard-friendly controls, and typography you can make your own. Less friction between an idea and the page." },
        { title: "From sentence to manuscript.", text: "Move through your work with folders, search, and an outline. Switch into local reading mode when it is time to hear the rhythm of the whole piece." },
      ],
      footer: "Keep the words portable, too: plain text and Markdown export, with Word export available in Pro.",
    },
    encryption: {
      eyebrow: "03 / PRIVATE COPIES, EVEN IN YOUR CLOUD",
      title: <>Encrypt it here.<br /><em>Keep it private there.</em></>,
      paragraphs: [
        <>Choose <strong>encrypted vault mode</strong> for a cloud-drive connection. Article content, images, and the vault index are encrypted on your device with AES-256-GCM before upload.</>,
        <>The remote gets encrypted objects under opaque filenames, not readable Markdown named after your chapters. A vault error is not permission to silently switch that connection to plaintext.</>,
      ],
      link: "Understand the protection",
      mode: "WHEN ENCRYPTED VAULT MODE IS SELECTED",
      flow: [
        { title: "Your working draft", text: "Local and independently readable." },
        { title: "Encryption on your device", text: "AES-256-GCM protects the remote copy." },
        { title: "Ciphertext in your cloud", text: "Encrypted content and index. Opaque names." },
      ],
      boundary: "File sizes, counts, dates, and access patterns can still be visible. Readable sync and Apple's iCloud protections are separate modes, not this vault encryption.",
      details: [
        { title: "Backups can leave encrypted, too.", text: <>An encrypted <code>.nwbackup</code> is sealed before it reaches your chosen backup folder. A cloud-watched destination does not first receive a temporary plaintext snapshot.</> },
        { title: "The cloud key is not your local draft.", text: "Losing a vault passphrase does not encrypt or erase your existing local working library. Protect your recovery material: the developer cannot recover the secret for you." },
      ],
    },
    faq: {
      eyebrow: "BEFORE YOU SETTLE IN",
      title: "A few good questions.",
      questions: [
        { question: "Is NeoWriter a notes app or a writing app?", answer: "Writing comes first. It is built for essays, journals, stories, notes, and longer manuscripts, with books and folders to keep the work organized. Plain text and Markdown remain at the center." },
        { question: "Can I write without an internet connection?", answer: "Yes. Your working library is stored locally, so writing does not depend on a connection. Sync and external AI features need a connection when you choose to use them." },
        { question: "How does NeoWriter protect my drafts?", answer: "Draft preservation is the central design rule: local autosave, version snapshots, Trash, independent backups, and conflict-preserving sync work together. Restoring an earlier revision preserves the current draft first. This is layered protection, not a guarantee against every device failure or user action. Keep independent backups of important writing." },
        { question: "What happens when synced edits disagree?", answer: "The sync design preserves conflicting edits rather than silently replacing your work. A conflict copy gives you a way to inspect the other version and decide what to keep." },
        { question: "Does 60 / 120 Hz mean guaranteed performance?", answer: "No. These are engineering targets: a 16.67 ms frame budget for 60 Hz displays and an 8.33 ms budget for supported 120 Hz ProMotion displays. They are not published pass results for every device or document. Actual performance depends on hardware, system refresh-rate settings, document complexity, and the scenario; performance work and device measurements are ongoing." },
        { question: "Can my cloud provider read an encrypted vault?", answer: "In encrypted vault mode, article content, images, and the index are encrypted on your device with AES-256-GCM, and remote object filenames are opaque. Reading that protected content requires valid key material. File sizes, counts, dates, and access patterns can still be visible. Readable sync mode, ordinary exports, and Apple's iCloud protections are separate; do not assume every cloud copy uses NeoWriter's vault encryption." },
        { question: "What if I lose the vault passphrase?", answer: "The vault protects a remote copy; it does not encrypt or erase your local working library with that passphrase. An intact local copy remains available independently of the vault credential. Access to encrypted copies may still require a recovery key, an authorized device's cached key, or the passphrase. Protect your recovery material: the developer cannot recover it for you." },
        { question: "Does switching to encrypted mode remove old readable copies?", answer: "No. A new encrypted vault uses a separate, empty remote folder. Previously uploaded plaintext files and provider-held versions are not automatically erased. Preserve a verified backup, make sure the new vault is usable, and then manage unwanted old copies at their original destination." },
        { question: "Do I have to use AI?", answer: "No. AI writing actions are optional. The action and its displayed scope determine what is shared: selected text, a paragraph or section, an article, or text before the cursor. Review the actual scope, recipient, and request details before sending; the provider's own data policies apply. The Privacy Policy explains these boundaries in full." },
        { question: "Where can I find download and release information?", answer: "NeoWriter is not yet listed on the App Store. Visit Support or contact Genjux for release information. This page does not offer a store purchase or promise a release date." },
      ],
    },
    contact: {
      eyebrow: "PROTECT THE DRAFT. ENJOY THE WRITING.",
      title: <>Less worry.<br /><em>More writing.</em></>,
      text: <>Your words deserve a thoughtful place to land.<br />Ask about NeoWriter, release information, or support.</>,
      support: "NeoWriter support",
      rss: "Follow release notes with RSS",
      mailSubject: "NeoWriter - release and support",
    },
  },
  zh: {
    metadataDescription: "以草稿保护为先，提供原生写作与阅读体验，并可选择在设备上加密云端保险库和备份。适用于 Mac、iPhone 与 iPad。",
    hero: {
      eyebrow: "你的文字不该被轻易丢弃。",
      title: <>自由写作。<br /><em>留住每一版内容。</em></>,
      description: "以草稿保护为先。流畅的原生写作与阅读体验。选择保险库模式时，云端副本会先在你的设备上加密。让你专注于下一句话，而不必担心上一句是否还在。",
      discover: "了解不同之处",
      release: "获取发布信息",
      platforms: <>iPhone 与 iPad <span /> <Laptop size={16} aria-hidden="true" /> Mac</>,
    },
    screenshots: {
      macLabel: "在新标签页中打开完整的 NeoWriter Mac 截图（界面为英文）",
      macAlt: "NeoWriter Mac 版英文界面，显示“Books”侧边栏和空白写作区",
      iosLabel: "在新标签页中打开完整的 NeoWriter iPhone 截图（界面为英文）",
      iosAlt: "NeoWriter iPhone 版英文界面，深色模式下显示示例文章库",
      caption: <>NeoWriter 的 Mac 与 iPhone 版（截图中的界面为英文）。<br />打开任一截图即可仔细查看。</>,
    },
    principlesLabel: "NeoWriter 的核心优势",
    principles: [
      { title: "保护每一版草稿。", detail: "自动保存。历史版本。恢复。", href: "#recovery" },
      { title: "保持写作心流。", detail: "原生写作与阅读。", href: "#writing" },
      { title: "让云端副本保持私密。", detail: "可选加密保险库模式。", href: "#encryption" },
    ],
    recovery: {
      eyebrow: "01 / 草稿优先",
      title: <>改出更好的句子，<br /><em>不该以失去上一版为代价。</em></>,
      paragraphs: [
        "一次中断、一次误删，或两台设备上不同的修改。NeoWriter 围绕“保住文字”而设计，不让你被迫从头再来。",
        "保护依靠多层机制，而不是一个“保存”按钮：本地自动保存、可恢复的历史版本、废纸篓、备份，以及在发生冲突时有意保留双方版本。",
      ],
      link: "了解可用的恢复途径",
      steps: [
        { title: "在写作处直接保存。", text: "草稿修改会在本地自动保存。保存作品不以网络连接为前提。" },
        { title: "替换前先保留。", text: "历史版本为先前的文字保留位置。恢复旧版本前，会先保护当前草稿。" },
        { title: "保留有分歧的版本。", text: "冲突修改会变成可供你检查的副本，而不是被当作静默覆盖文字的许可。" },
        { title: "为自己留一条回路。", text: "废纸篓和经过验证的备份恢复，在单一工作副本之外提供更多恢复途径。" },
      ],
    },
    writing: {
      eyebrow: "02 / 少些阻力，多些心流。",
      title: <>跟随思绪，<br /><em>而不是被界面打断。</em></>,
      introduction: "写作应当即时，阅读应当保持节奏。原生编辑、灵敏的 Markdown 体验和专注阅读视图，把实际体验放在功能数量之前。",
      performanceEyebrow: "60 / 120 HZ 工程目标",
      performanceTitle: "每一帧都重要。",
      performanceText: "输入、滚动、选择与阅读应处于前台。耗时的分析和备份工作不应挡在你与下一行文字之间。",
      frameLabels: ["标准显示器", "支持的 ProMotion 显示器"],
      frameBudget: "毫秒帧预算",
      performanceNote: <><strong>这是工程目标，并非实测通过结果。</strong>120 Hz 需要受支持的 ProMotion 硬件；实际性能会随系统环境和页面工作量而变化。</>,
      features: [
        { title: "像散文一样阅读 Markdown。", text: "离开一行后，格式标记会退到一旁；再次编辑时，它们会重新出现。阅读文章，而不是面对满墙的标点符号。" },
        { title: "跟住正在写的这一行。", text: "原生文本编辑、专注与打字机模式、键盘友好的控制，以及可按喜好调整的排版。让想法抵达页面时少一些阻力。" },
        { title: "从一句话到一部手稿。", text: "使用文件夹、搜索和大纲浏览作品。需要聆听全文节奏时，切换到本地阅读模式。" },
      ],
      footer: "文字也应便于携带：支持纯文本和 Markdown 导出，Pro 版还可导出 Word。",
    },
    encryption: {
      eyebrow: "03 / 即使存入你的云端，副本也能保持私密",
      title: <>在这里加密，<br /><em>在那里保持私密。</em></>,
      paragraphs: [
        <>为云盘连接选择<strong>加密保险库模式</strong>。文章内容、图片和保险库索引会先在你的设备上使用 AES-256-GCM 加密，再上传。</>,
        <>远端收到的是使用不透明文件名的加密对象，而不是以章节命名、可直接阅读的 Markdown。保险库出错，并不意味着可以静默把该连接切换为明文。</>,
      ],
      link: "了解保护边界",
      mode: "选择加密保险库模式时",
      flow: [
        { title: "你的工作草稿", text: "保存在本地，可独立读取。" },
        { title: "在你的设备上加密", text: "AES-256-GCM 保护远端副本。" },
        { title: "密文存入你的云端", text: "内容和索引经过加密，名称不透明。" },
      ],
      boundary: "文件大小、数量、日期和访问模式仍可能可见。可读同步模式和 Apple 的 iCloud 保护属于不同机制，并非此保险库加密。",
      details: [
        { title: "备份也可以加密后离开设备。", text: <>加密的 <code>.nwbackup</code> 会在到达你选择的备份文件夹前完成封装。受云端监视的目标文件夹不会先收到临时明文快照。</> },
        { title: "云端密钥并不是你的本地草稿。", text: "丢失保险库口令不会加密或抹掉现有的本地工作资料库。请保护恢复材料：开发者无法替你找回该秘密。" },
      ],
    },
    faq: {
      eyebrow: "开始专注写作之前",
      title: "几个值得问的问题。",
      questions: [
        { question: "NeoWriter 是笔记应用还是写作应用？", answer: "写作优先。它面向随笔、日记、故事、笔记和更长的手稿，并通过书籍与文件夹帮助你组织作品。纯文本和 Markdown 始终处于核心位置。" },
        { question: "没有网络也能写作吗？", answer: "可以。工作资料库保存在本地，因此写作不依赖网络连接。只有当你选择使用同步或外部 AI 功能时，这些功能才需要联网。" },
        { question: "NeoWriter 如何保护草稿？", answer: "保存草稿是核心设计原则：本地自动保存、版本快照、废纸篓、独立备份和保留冲突的同步机制共同发挥作用。恢复早期版本前，会先保留当前草稿。这是分层保护，并非对所有设备故障或用户操作作出恢复保证。重要作品仍应保留独立备份。" },
        { question: "同步修改发生分歧时会怎样？", answer: "同步设计会保留冲突修改，而不是静默替换你的作品。冲突副本让你可以检查另一版本，再决定保留哪些内容。" },
        { question: "60 / 120 Hz 是否意味着性能有保证？", answer: "不是。这些是工程目标：60 Hz 显示器对应 16.67 毫秒帧预算，受支持的 120 Hz ProMotion 显示器对应 8.33 毫秒帧预算。它们不是针对每台设备或每份文稿公布的测试通过结果。实际性能取决于硬件、系统刷新率设置、文稿复杂度和具体场景；性能工作与设备测量仍在继续。" },
        { question: "云服务提供商能读取加密保险库吗？", answer: "在加密保险库模式下，文章内容、图片和索引会在你的设备上使用 AES-256-GCM 加密，远端对象文件名也不透明。读取受保护内容需要有效的密钥材料。文件大小、数量、日期和访问模式仍可能可见。可读同步模式、普通导出和 Apple 的 iCloud 保护属于不同机制；不要假设每一份云端副本都使用 NeoWriter 的保险库加密。" },
        { question: "如果丢失保险库口令怎么办？", answer: "保险库保护的是远端副本；它不会用该口令加密或抹掉你的本地工作资料库。完整的本地副本不依赖保险库凭据，仍可使用。访问加密副本仍可能需要恢复密钥、已授权设备缓存的密钥或口令。请保护恢复材料：开发者无法替你找回。" },
        { question: "切换到加密模式会移除旧的可读副本吗？", answer: "不会。新的加密保险库使用单独的空远端文件夹。先前上传的明文文件和提供商保留的版本不会自动删除。请先保留并验证备份，确认新保险库可用，再到原始目标位置管理不再需要的旧副本。" },
        { question: "必须使用 AI 吗？", answer: "不必。AI 写作操作是可选的。具体操作及其显示的范围决定共享内容：所选文本、一个段落或章节、一篇文章，或光标前的文字。发送前请检查实际范围、接收方和请求详情；提供商自己的数据政策适用。隐私政策完整说明了这些边界。" },
        { question: "在哪里查看下载与发布信息？", answer: "NeoWriter 尚未在 App Store 上架。请访问“支持”或联系 Genjux 获取发布信息。本页不提供商店购买，也不承诺发布日期。" },
      ],
    },
    contact: {
      eyebrow: "保护草稿，享受写作。",
      title: <>少些担心，<br /><em>多些写作。</em></>,
      text: <>你的文字值得一个用心的落脚处。<br />欢迎咨询 NeoWriter、发布信息或支持事宜。</>,
      support: "NeoWriter 支持",
      rss: "通过 RSS 关注更新日志",
      mailSubject: "NeoWriter - 发布与支持",
    },
  },
} as const;

const principleIcons = [ShieldCheck, Gauge, LockKeyhole] as const;
const recoveryIcons = [FileText, History, Copy, Trash2] as const;
const featureIcons = [FileText, SlidersHorizontal, BookOpen] as const;
const vaultIcons = [FileText, LockKeyhole, Cloud] as const;
const frameRates = [60, 120] as const;

function AppScreenshots({ locale }: { locale: SiteLocale }) {
  const copy = homeCopy[locale].screenshots;
  const macScreenshot = withBasePath("/apps/neowriter/mac-screenshot.webp");
  const iosScreenshot = withBasePath("/apps/neowriter/ios-screenshot.webp");

  return (
    <figure className={styles.preview}>
      <div className={styles.screenshotStage}>
        <a href={macScreenshot} target="_blank" rel="noopener noreferrer" className={styles.macScreenshot} aria-label={copy.macLabel}>
          <Image src={macScreenshot} alt={copy.macAlt} width={1920} height={992} className={styles.screenshotImage} preload />
        </a>
        <a href={iosScreenshot} target="_blank" rel="noopener noreferrer" className={styles.iosScreenshot} aria-label={copy.iosLabel}>
          <Image src={iosScreenshot} alt={copy.iosAlt} width={630} height={1368} className={styles.screenshotImage} preload />
        </a>
      </div>
      <figcaption>{copy.caption}</figcaption>
    </figure>
  );
}

export function NeoWriterHome({ locale }: { locale: SiteLocale }) {
  const copy = homeCopy[locale];
  const product = neoWriterProduct();
  const contactHref = neoWriterContactHref(copy.contact.mailSubject, locale);

  return (
    <>
      <section className={`${styles.shell} ${styles.hero}`} aria-labelledby="neowriter-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
          <h1 id="neowriter-title">{copy.hero.title}</h1>
          <p className={styles.heroDescription}>{copy.hero.description}</p>
          <div className={styles.heroActions}>
            <LocaleLink href="#recovery" locale={locale} className={styles.primaryButton}>{copy.hero.discover} <ArrowDown size={16} aria-hidden="true" /></LocaleLink>
            <a href={contactHref} className={styles.textLink}>{copy.hero.release} <ArrowUpRight size={15} aria-hidden="true" /></a>
          </div>
          <p className={styles.platforms}><Smartphone size={15} aria-hidden="true" /> {copy.hero.platforms}</p>
        </div>
        <AppScreenshots locale={locale} />
      </section>

      <nav className={styles.principles} aria-label={copy.principlesLabel}>
        <div className={`${styles.shell} ${styles.principleGrid}`}>
          {copy.principles.map(({ title, detail, href }, index) => {
            const Icon = principleIcons[index];
            return <LocaleLink href={href} locale={locale} key={href}><Icon size={24} aria-hidden="true" /><span><strong>{title}</strong><small>{detail}</small></span></LocaleLink>;
          })}
        </div>
      </nav>

      <section id="recovery" className={styles.recovery} aria-labelledby="recovery-title">
        <div className={`${styles.shell} ${styles.recoveryGrid}`}>
          <div>
            <p className={styles.eyebrow}>{copy.recovery.eyebrow}</p>
            <h2 id="recovery-title">{copy.recovery.title}</h2>
            {copy.recovery.paragraphs.map((paragraph) => <p className={styles.recoveryDescription} key={paragraph}>{paragraph}</p>)}
            <LocaleLink href="/apps/neowriter/support#recovery" locale={locale} className={styles.textLink}>{copy.recovery.link} <ArrowRight size={16} aria-hidden="true" /></LocaleLink>
          </div>
          <ol className={styles.recoverySteps}>
            {copy.recovery.steps.map(({ title, text }, index) => {
              const Icon = recoveryIcons[index];
              return <li key={title}><span className={styles.stepIcon}><Icon size={20} aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></li>;
            })}
          </ol>
        </div>
      </section>

      <section id="writing" className={`${styles.shell} ${styles.section}`} aria-labelledby="writing-title">
        <div className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>{copy.writing.eyebrow}</p><h2 id="writing-title">{copy.writing.title}</h2></div>
          <p>{copy.writing.introduction}</p>
        </div>
        <div className={styles.performancePanel}>
          <div className={styles.performanceCopy}>
            <p className={styles.eyebrow}>{copy.writing.performanceEyebrow}</p>
            <h3>{copy.writing.performanceTitle}</h3>
            <p>{copy.writing.performanceText}</p>
          </div>
          <dl className={styles.frameTargets}>
            {frameRates.map((rate, index) => (
              <div key={rate}>
                <dt>{copy.writing.frameLabels[index]}</dt>
                <dd>{rate}<small>Hz</small><span>{(1000 / rate).toFixed(2)} {copy.writing.frameBudget}</span></dd>
              </div>
            ))}
          </dl>
          <p className={styles.performanceNote}>{copy.writing.performanceNote}</p>
        </div>
        <div className={styles.featureGrid}>
          {copy.writing.features.map(({ title, text }, index) => {
            const Icon = featureIcons[index];
            return <article className={styles.feature} key={title}><Icon size={23} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>;
          })}
        </div>
        <p className={styles.flowFooter}>{copy.writing.footer}</p>
      </section>

      <section id="encryption" className={styles.encryption} aria-labelledby="encryption-title">
        <div className={`${styles.shell} ${styles.encryptionGrid}`}>
          <div className={styles.encryptionCopy}>
            <p className={styles.eyebrow}>{copy.encryption.eyebrow}</p>
            <h2 id="encryption-title">{copy.encryption.title}</h2>
            {copy.encryption.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            <LocaleLink href="/apps/neowriter/privacy#sync-backups" locale={locale} className={styles.textLink}>{copy.encryption.link} <ArrowRight size={16} aria-hidden="true" /></LocaleLink>
          </div>
          <div className={styles.vaultFlow}>
            <p className={styles.vaultMode}>{copy.encryption.mode}</p>
            <ol>
              {copy.encryption.flow.map(({ title, text }, index) => {
                const Icon = vaultIcons[index];
                return <li key={title}><Icon size={22} aria-hidden="true" /><div><strong>{title}</strong><span>{text}</span></div></li>;
              })}
            </ol>
            <p className={styles.vaultBoundary}>{copy.encryption.boundary}</p>
          </div>
          <div className={styles.encryptionDetails}>
            {copy.encryption.details.map(({ title, text }) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="questions" className={`${styles.shell} ${styles.faq}`} aria-labelledby="faq-title">
        <div className={styles.faqHeading}><p className={styles.eyebrow}>{copy.faq.eyebrow}</p><h2 id="faq-title">{copy.faq.title}</h2></div>
        <div className={styles.faqList}>
          {copy.faq.questions.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}<ChevronDown size={18} aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.contact} aria-labelledby="contact-title">
        <div className={styles.shell}>
          <Image src={product.assets.icon} alt="" width={68} height={68} className={styles.contactIcon} />
          <p className={styles.eyebrow}>{copy.contact.eyebrow}</p>
          <h2 id="contact-title">{copy.contact.title}</h2>
          <p>{copy.contact.text}</p>
          <LocaleLink href="/apps/neowriter/support" locale={locale} className={styles.primaryButton}>{copy.contact.support} <ArrowRight size={16} aria-hidden="true" /></LocaleLink>
          <LocaleLink href="/apps/neowriter/rss.xml" locale={locale} className={styles.releaseLink} type="application/rss+xml">{copy.contact.rss}</LocaleLink>
        </div>
      </section>
    </>
  );
}

export function neoWriterHomeDescription(locale: SiteLocale) {
  return homeCopy[locale].metadataDescription;
}
