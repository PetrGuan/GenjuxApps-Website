import LocaleLink from "@/components/locale-link";
import type { SiteLocale } from "@/i18n/routing.mjs";
import DocumentPage, { ContactLink, type DocumentSection } from "./document";
import styles from "./neowriter.module.css";

const supportMeta = {
  en: {
    title: "Support - NeoWriter",
    description: "Contact the NeoWriter developer, find safe recovery guidance, and learn how to share a diagnostic report.",
    heading: "Support",
    introduction: "A direct line to the person making NeoWriter. Start with a small, clear report, keep your writing private, and preserve your available copies before troubleshooting.",
  },
  zh: {
    title: "支持 - NeoWriter",
    description: "联系 NeoWriter 开发者，查看安全恢复指引，并了解如何主动分享诊断报告。",
    heading: "支持",
    introduction: "直接联系 NeoWriter 的开发者。请从简短清晰的报告开始，保护文字隐私，并在排查问题前保留现有副本。",
  },
} as const;

function supportSections(locale: SiteLocale): readonly DocumentSection[] {
  if (locale === "zh") {
    return [
      {
        id: "contact",
        title: "1. 联系开发者",
        content: <>
          <div className={styles.documentCallout}>
            <p><strong>有疑问、遇到问题，或想了解发布信息？</strong></p>
            <p>请发送邮件至<ContactLink subject="NeoWriter 支持" locale={locale} />。这会打开你的邮件应用；不会自动发送任何报告或附件。</p>
          </div>
          <p>NeoWriter 尚未在 App Store 上架。请联系我们获取当前发布信息，不要依赖非官方下载或假定的发布日期。</p>
          <p>如果隐私或删除请求涉及发送给开发者的信息，请使用<ContactLink subject="NeoWriter 隐私请求" locale={locale}>隐私联系渠道</ContactLink>。有关云端或 AI 提供商自身系统中的数据，可能需要由相应提供商处理。</p>
        </>,
      },
      {
        id: "report",
        title: "2. 有用且精简的问题报告",
        content: <>
          <p>先作简短说明，并提供你可以安全分享的信息：</p>
          <ul>
            <li>NeoWriter 版本或构建号，以及你使用的是 iPhone、iPad 还是 Mac。</li>
            <li>操作系统版本和涉及的功能。</li>
            <li>导致问题的步骤、你预期的结果，以及实际发生的情况。</li>
            <li>问题影响一份还是多份文稿；无需发送文稿本身。</li>
            <li>如有帮助，可提供经过删减的截图或少量非私密示例。</li>
          </ul>
          <p>对于集成问题，提供商名称和不含秘密的错误消息可能有帮助。初次邮件中不要包含密码、API 密钥、授权标头、恢复密钥或私人资料库备份。</p>
        </>,
      },
      {
        id: "diagnostics",
        title: "3. 是否提供诊断信息由你决定",
        content: <>
          <p>NeoWriter 不会自动上传诊断报告或使用统计。如果需要诊断导出，由你决定是否导出并附加到邮件。</p>
          <p>请先检查内容。技术报告或截图可能包含你不想分享的详情，例如文件名、文稿引用、路径、账户信息或错误上下文。请删减私人材料，只发送相关内容。如果无法安全删减报告，请仅描述问题，不要附加报告。</p>
          <p>不要为了方便排查而发送口令或 API 密钥。支持人员不需要不受限制地访问你的提供商账户或写作资料库。自愿消息的处理方式，请参阅隐私政策中的<LocaleLink href="/apps/neowriter/privacy#support" locale={locale}>支持数据部分</LocaleLink>。</p>
        </>,
      },
      {
        id: "recovery",
        title: "4. 文字缺失或出现意外变化",
        content: <>
          <p><strong>尝试修复前，先保留现有内容。</strong>不要一开始就卸载 NeoWriter、删除云端数据，或反复恢复同一份备份。</p>
          <ol>
            <li>如果当前文字仍可访问，请在更改设置前导出或复制一份独立版本。</li>
            <li>检查文稿的历史版本和废纸篓，看是否有可恢复版本。</li>
            <li>比较同步冲突时保留双方副本；不要只因为标题看似重复就删除其中一份。</li>
            <li>尝试恢复前保留原始备份。不要覆盖唯一已知完好的副本。</li>
            <li>联系支持时，提供应用版本和变化说明。开始排查无需发送你的私人文字。</li>
          </ol>
          <p>开发者没有你资料库的服务器端副本，也无法承诺恢复。在 Mac 上，删除应用可能留下本地应用数据；更改本地文件与删除云端副本是不同操作。</p>
        </>,
      },
      {
        id: "integrations",
        title: "5. 同步、AI 与发布",
        content: <>
          <p><strong>同步：</strong>检查你选择的是哪个 Apple 账户、WebDAV 服务器或存储文件夹。如果数据发生意外变化，请先停止相关同步活动并保留本地与远端副本，再重新连接或重置。</p>
          <p><strong>加密保险库：</strong>检查连接使用“可读”还是“加密”模式。不要把切换到可读模式、移除保险库描述符或索引文件、删除远端对象，当作绕过解锁或完整性错误的捷径。请保护本地资料库和恢复材料；切勿通过邮件发送口令或恢复密钥。创建新保险库不会清理其他目标位置的旧明文副本。</p>
          <p><strong>AI：</strong>检查所选提供商、模型、接收方和显示的文本范围。身份验证或配额错误与文稿错误不同。不要通过邮件发送密钥；可以改为分享经过删减的错误消息和提供商名称。</p>
          <p><strong>WordPress：</strong>重试发布操作前，检查目标站点和任何现有的实时文章。删除本地草稿不会删除已发布文章。</p>
          <p><strong>Wi-Fi 传输：</strong>请使用可信的本地网络，检查传输面板显示的地址，并在完成后停止本地传输服务器。它不是由开发者托管的云服务。</p>
        </>,
      },
      {
        id: "purchases",
        title: "6. 购买与商店问题",
        content: <>
          <p>本网站目前没有链接任何 App Store 上架页面。如果你以后通过 Apple 计费购买，账单、订阅取消和退款请求将遵循 Apple 的适用流程。</p>
          <p>Apple 提供了<a href="https://support.apple.com/en-us/118428">取消订阅</a>和<a href="https://support.apple.com/en-us/118223">申请退款</a>的说明。不要向支持渠道发送支付卡详情或 Apple 账户密码。移除应用不会取消现有订阅。</p>
        </>,
      },
      {
        id: "documents",
        title: "7. 政策与产品信息",
        content: <>
          <ul>
            <li><LocaleLink href="/apps/neowriter/privacy" locale={locale}>隐私政策</LocaleLink>：本地存储、可选外部传输、支持信息与删除。</li>
            <li><LocaleLink href="/apps/neowriter/terms" locale={locale}>使用条款</LocaleLink>：你的内容、应用许可、集成和购买条件。</li>
            <li><LocaleLink href="/apps/neowriter" locale={locale}>NeoWriter 概览</LocaleLink>：功能，以及真实的 iPhone 与 Mac 截图（界面为英文）。</li>
            <li><LocaleLink href="/feeds" locale={locale}>RSS 订阅源</LocaleLink>：在更新日志发布后进行关注。</li>
          </ul>
        </>,
      },
    ];
  }

  return [
    {
      id: "contact",
      title: "1. Contact the developer",
      content: <>
        <div className={styles.documentCallout}>
          <p><strong>A question, a problem, or release information?</strong></p>
          <p>Email <ContactLink subject="NeoWriter support" locale={locale} />. This opens your email app; no report or attachment is sent automatically.</p>
        </div>
        <p>NeoWriter is not yet listed on the App Store. Contact us for current release information rather than relying on an unofficial download or an assumed launch date.</p>
        <p>For privacy or deletion requests concerning information sent to the developer, use <ContactLink subject="NeoWriter privacy request" locale={locale}>the privacy contact</ContactLink>. Your cloud or AI provider may need to handle requests concerning data held in its own systems.</p>
      </>,
    },
    {
      id: "report",
      title: "2. A useful, minimal problem report",
      content: <>
        <p>Start with a short description and include what you can safely share:</p>
        <ul>
          <li>The NeoWriter version or build and whether you are using iPhone, iPad, or Mac.</li>
          <li>Your operating-system version and the feature involved.</li>
          <li>The steps that led to the problem, what you expected, and what happened.</li>
          <li>Whether the issue affects one document or more than one, without sending the documents themselves.</li>
          <li>A redacted screenshot or a small non-private example, if useful.</li>
        </ul>
        <p>For an integration issue, the provider name and non-secret error message may help. Do not include passwords, API keys, authorization headers, recovery keys, or a private library backup in an initial email.</p>
      </>,
    },
    {
      id: "diagnostics",
      title: "3. Diagnostics are your choice",
      content: <>
        <p>NeoWriter does not automatically upload diagnostic reports or usage statistics. If a diagnostic export is needed, you choose whether to export it and attach it to an email.</p>
        <p>Review it first. Technical reports or screenshots can contain details you do not want to share, such as file names, document references, paths, account information, or error context. Redact private material and send only what is relevant. If you cannot safely redact a report, describe the issue without attaching it.</p>
        <p>Do not send a passphrase or API key to make troubleshooting easier. Support does not need unrestricted access to your provider account or writing library. See the <LocaleLink href="/apps/neowriter/privacy#support" locale={locale}>support-data section of the Privacy Policy</LocaleLink> for how voluntary messages are handled.</p>
      </>,
    },
    {
      id: "recovery",
      title: "4. Missing or unexpected writing",
      content: <>
        <p><strong>Preserve what is there before trying a repair.</strong> Do not start by uninstalling NeoWriter, deleting cloud data, or repeatedly restoring the same backup.</p>
        <ol>
          <li>If the current text is accessible, export or copy an independent version before changing settings.</li>
          <li>Check the document&apos;s version history and Trash for recoverable versions.</li>
          <li>Keep both copies of a sync conflict while comparing them; do not delete one merely because its title looks duplicated.</li>
          <li>Preserve the original backup before attempting a restore. Do not overwrite your only known-good copy.</li>
          <li>Contact support with the app version and a description of what changed. You do not need to send your private writing to begin.</li>
        </ol>
        <p>The developer does not have a server-side copy of your library and cannot promise recovery. On Mac, deleting the app may leave local app data behind; changing local files and deleting cloud copies are separate actions.</p>
      </>,
    },
    {
      id: "integrations",
      title: "5. Sync, AI, and publishing",
      content: <>
        <p><strong>Sync:</strong> check which Apple account, WebDAV server, or storage folder you selected. If data is changing unexpectedly, stop the relevant sync activity and preserve local and remote copies before reconnecting or resetting anything.</p>
        <p><strong>Encrypted vaults:</strong> check whether the connection uses Readable or Encrypted mode. Do not switch to Readable mode, remove vault descriptor/index files, or delete remote objects as a shortcut around an unlock or integrity error. Keep your local library and recovery material safe; never email the passphrase or recovery key. Creating a new vault does not clean up old plaintext copies at another destination.</p>
        <p><strong>AI:</strong> check the selected provider, model, recipient, and the displayed text scope. An authentication or quota error is different from a document error. Do not email your key; you can share a redacted error message and provider name instead.</p>
        <p><strong>WordPress:</strong> check the destination site and any existing live post before retrying a publish action. Deleting a local draft does not remove a published post.</p>
        <p><strong>Wi-Fi Transfer:</strong> use a trusted local network, check the address shown in the transfer panel, and stop the local transfer server when you finish. It is not a developer-hosted cloud service.</p>
      </>,
    },
    {
      id: "purchases",
      title: "6. Purchases and store questions",
      content: <>
        <p>There is currently no App Store listing linked from this site. If you later make an Apple-billed purchase, billing, subscription cancellation, and refund requests follow Apple&apos;s applicable process.</p>
        <p>Apple provides instructions for <a href="https://support.apple.com/en-us/118428">cancelling a subscription</a> and <a href="https://support.apple.com/en-us/118223">requesting a refund</a>. Do not send payment-card details or your Apple account password to support. Removing an app does not cancel an existing subscription.</p>
      </>,
    },
    {
      id: "documents",
      title: "7. Policies and product information",
      content: <>
        <ul>
          <li><LocaleLink href="/apps/neowriter/privacy" locale={locale}>Privacy Policy</LocaleLink>: local storage, optional external transfers, support information, and deletion.</li>
          <li><LocaleLink href="/apps/neowriter/terms" locale={locale}>Terms of Use</LocaleLink>: your content, app licenses, integrations, and purchase conditions.</li>
          <li><LocaleLink href="/apps/neowriter" locale={locale}>NeoWriter overview</LocaleLink>: features and real iPhone and Mac screenshots.</li>
          <li><LocaleLink href="/feeds" locale={locale}>RSS feeds</LocaleLink>: follow published release notes when they become available.</li>
        </ul>
      </>,
    },
  ];
}

export function NeoWriterSupport({ locale }: { locale: SiteLocale }) {
  const copy = supportMeta[locale];
  return <DocumentPage title={copy.heading} introduction={copy.introduction} sections={supportSections(locale)} locale={locale} />;
}

export function neoWriterSupportMetadata(locale: SiteLocale) {
  return supportMeta[locale];
}
