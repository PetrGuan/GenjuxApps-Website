import LocaleLink from "@/components/locale-link";
import type { SiteLocale } from "@/i18n/routing.mjs";
import DocumentPage, { ContactLink, type DocumentSection } from "./document";

const termsMeta = {
  en: {
    title: "Terms of Use - NeoWriter",
    description: "Terms covering NeoWriter, your writing, optional integrations, purchases, and support.",
    heading: "Terms of Use",
    introduction: "Plain-language terms for using NeoWriter, keeping ownership of your writing, and choosing optional services. Mandatory consumer rights and applicable app-store licenses remain in place.",
  },
  zh: {
    title: "使用条款 - NeoWriter",
    description: "关于 NeoWriter、你的文字、可选集成、购买和支持的条款。",
    heading: "使用条款",
    introduction: "以通俗语言说明如何使用 NeoWriter、保留对文字的所有权，以及选择可选服务。强制适用的消费者权利和应用商店许可仍然有效。",
  },
} as const;

function termsSections(locale: SiteLocale): readonly DocumentSection[] {
  if (locale === "zh") {
    return [
      {
        id: "scope",
        title: "1. 适用范围与可用性",
        content: <>
          <p>本条款说明 iPhone、iPad 和 Mac 版 NeoWriter 的使用，以及由以 GenjuxApps 名义发布产品的独立开发者 Genjux 提供的相关支持。只有在你能够接受适用于你的条款和服务要求时，才应使用本应用。</p>
          <p>截至上述日期，NeoWriter 尚未在 App Store 上架。本网站不销售本应用，也不宣布有保证的发布日期、最终功能组合、价格或年龄分级。如适用，可用性和平台要求会通过授权分发渠道说明。</p>
        </>,
      },
      {
        id: "license",
        title: "2. 应用许可与合法使用",
        content: <>
          <p>请通过授权副本使用 NeoWriter，并遵守随该副本提供的许可。在适用情况下，相关商店许可（包括 <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple 标准最终用户许可协议</a>）管辖应用许可。这些页面不会取代强制适用的商店条款或所含开源组件的许可。</p>
          <p>只能使用你有权访问的内容、账户和服务。不得利用本应用违法、侵犯他人权利，或干扰设备或服务。本条款不排除任何依法不能限制的权利，包括适用的消费者权利或互操作权利。</p>
        </>,
      },
      {
        id: "your-writing",
        title: "3. 你的文字仍属于你",
        content: <>
          <p>你保留对文字和其他内容的权利。使用 NeoWriter 不会把这些内容的所有权转让给开发者，也不会授予开发者将其公开、出售或用于训练 AI 的一般权利。</p>
          <p>你应对自己选择导入、导出、发布或发送给其他服务的内容负责，并确保拥有相应许可。如果你自愿向支持渠道发送材料，我们会按照<LocaleLink href="/apps/neowriter/privacy" locale={locale}>隐私政策</LocaleLink>所述，将其用于处理支持请求。</p>
        </>,
      },
      {
        id: "recovery",
        title: "4. 本地数据与恢复",
        content: <>
          <p>NeoWriter 提供本地自动保存、历史版本、废纸篓、备份和同步冲突处理，以帮助提高文字的可恢复性。这些工具无法保证从每一次存储故障、设备丢失、软件错误、误操作或第三方服务问题中恢复。</p>
          <p>请为重要作品保留独立备份，尤其是在更新应用、更换同步目标、恢复资料库或移除应用数据之前。确认前请检查恢复或删除操作。开发者不运营你的文字资料库副本，因此无法按要求为你恢复。</p>
          <p>如果某项功能似乎在意外更改数据，请停止使用该功能，保留现有副本，并联系<LocaleLink href="/apps/neowriter/support" locale={locale}>支持</LocaleLink>，而不是反复删除并重新安装应用。</p>
        </>,
      },
      {
        id: "external-services",
        title: "5. 可选外部服务",
        content: <>
          <p>同步目标、AI 提供商、WordPress 站点、存储提供商和系统共享目标是独立服务。使用时，其可用性、费用、账户规则、保留方式及其他条款适用。NeoWriter 不运营 AI 中继，也不保证第三方的正常运行时间、输出、安全性或持续兼容性。</p>
          <p>请选择可信服务，保护凭据，并在传输前检查接收方和内容。提供商可能对使用你的密钥发起的请求收费。关闭集成不会取消提供商账户，也不会撤销已经完成的传输或发布。</p>
          <p>Wi-Fi 传输是在你的设备上运行的可选本地服务器。请只在可信网络上使用，并在完成后停止。发布到 WordPress 可能使内容公开；确认前请检查目标位置和文章。</p>
        </>,
      },
      {
        id: "ai-output",
        title: "6. AI 辅助与审阅",
        content: <>
          <p>AI 功能是可选的。生成输出可能不准确、不完整、带有偏差，或不适合你的用途。接受、共享或依赖输出前请先审阅；请核实事实主张，以及与发布有关的权利或许可。</p>
          <p>AI 输出不能替代合格的医疗、法律、财务或其他专业建议。未经授权，不要把机密或受限制材料发送给提供商。应用显示的请求详情说明 NeoWriter 控制的请求，而不是提供商隐藏的指令或内部数据实践。</p>
        </>,
      },
      {
        id: "purchases",
        title: "7. 购买、订阅与退款",
        content: <>
          <p>本网站不处理任何购买。如果将来通过 Apple 提供付费功能或订阅，购买前显示的价格、计费周期、续订条件、所含功能和适用条款将管辖该要约。我们不承诺尚未公布的价格或未来功能。</p>
          <p>通过你的 Apple 账户管理 Apple 计费的订阅。移除 NeoWriter 本身不会取消订阅。Apple 说明了<a href="https://support.apple.com/en-us/118428">如何取消订阅</a>以及<a href="https://support.apple.com/en-us/118223">如何申请退款</a>。退款资格和强制适用的消费者权利取决于相关规则；本页不承诺申请会获批，也不规定一概不退款。</p>
          <p>如有月度、年度或一次性选项，应以实际发布的要约为准。本节以将来提供购买为前提，并不表示 NeoWriter 已经开始销售。</p>
        </>,
      },
      {
        id: "support-changes",
        title: "8. 支持与变更",
        content: <>
          <p>如有疑问或问题，请联系<ContactLink subject="NeoWriter 支持" locale={locale} />。只提供理解问题所需的信息。支持渠道不会自动收到诊断信息，发送邮件也不会授予我们访问你的资料库或账户的权限。</p>
          <p>应用可能继续演进，个别功能也可能依赖某个平台版本或外部服务。当变更影响本条款时，我们会更新相关信息。如果追溯性移除与购买相关的权利会违反适用法律或管辖该购买的条款，本条款不会允许这样做。</p>
        </>,
      },
      {
        id: "responsibility",
        title: "9. 责任与强制适用的权利",
        content: <>
          <p>我们不承诺运行永不中断或没有错误，也不保证特定写作结果。在适用法律允许的范围内，本应用按可用状态提供。责任和可获得的救济仍受适用法律及任何管辖应用许可的约束。</p>
          <p>本条款不排除依法不能排除的保证、救济、责任或消费者保护。本条款不设定特定责任上限、强制仲裁条款或专属法院管辖。</p>
        </>,
      },
      {
        id: "contact",
        title: "10. 有关本条款的问题",
        content: <>
          <p>如对本条款有疑问，请发送邮件至<ContactLink subject="NeoWriter 条款问题" locale={locale} />。有关本地数据、可选传输、诊断信息和支持通信的信息，请参阅<LocaleLink href="/apps/neowriter/privacy" locale={locale}>隐私政策</LocaleLink>。</p>
        </>,
      },
    ];
  }

  return [
    {
      id: "scope",
      title: "1. Scope and availability",
      content: <>
        <p>These terms describe use of NeoWriter for iPhone, iPad, and Mac and related support provided by Genjux, the independent developer publishing under the GenjuxApps name. Use the app only if you can accept the terms and service requirements that apply to you.</p>
        <p>As of the date above, NeoWriter is not yet listed on the App Store. This website does not sell the app or announce a guaranteed release date, final feature package, price, or age rating. Availability and platform requirements will be identified through an authorized distribution channel when applicable.</p>
      </>,
    },
    {
      id: "license",
      title: "2. App license and lawful use",
      content: <>
        <p>Use NeoWriter through an authorized copy and in accordance with the license supplied with that copy. An applicable store license, including <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple&apos;s Standard EULA</a> where it applies, governs the app license. These pages do not replace mandatory storefront terms or licenses for included open-source components.</p>
        <p>Use only content, accounts, and services you are authorized to access. Do not use the app to violate the law, infringe another person&apos;s rights, or interfere with devices or services. Nothing here removes rights that cannot lawfully be restricted, including applicable consumer or interoperability rights.</p>
      </>,
    },
    {
      id: "your-writing",
      title: "3. Your writing remains yours",
      content: <>
        <p>You retain your rights in your writing and other content. Using NeoWriter does not transfer ownership of that content to the developer or grant the developer a general right to publish it, sell it, or use it to train AI.</p>
        <p>You are responsible for the content you choose to import, export, publish, or send to another service, and for having permission to do so. If you voluntarily send material to support, we use it for the support request as described in the <LocaleLink href="/apps/neowriter/privacy" locale={locale}>Privacy Policy</LocaleLink>.</p>
      </>,
    },
    {
      id: "recovery",
      title: "4. Local data and recovery",
      content: <>
        <p>NeoWriter provides local autosave, history, Trash, backup, and sync-conflict handling to support recoverable writing. These tools cannot guarantee recovery from every storage failure, device loss, software fault, mistaken action, or third-party service problem.</p>
        <p>Keep independent backups of important work, especially before updates, changing sync destinations, restoring a library, or removing app data. Review a restore or deletion action before confirming it. The developer does not operate a copy of your writing library that can be recovered on demand.</p>
        <p>Stop using a feature that appears to be changing data unexpectedly, preserve available copies, and contact <LocaleLink href="/apps/neowriter/support" locale={locale}>Support</LocaleLink> rather than repeatedly deleting and reinstalling the app.</p>
      </>,
    },
    {
      id: "external-services",
      title: "5. Optional external services",
      content: <>
        <p>Sync destinations, AI providers, WordPress sites, storage providers, and system sharing destinations are separate services. Their availability, charges, account rules, retention, and other terms apply when you use them. NeoWriter does not operate an AI relay or guarantee a third party&apos;s uptime, output, security, or continued compatibility.</p>
        <p>Choose trusted services, protect your credentials, and review the recipient and content before transmitting. Your provider may charge for requests using your key. Disabling an integration does not cancel a provider account or undo a completed transmission or publication.</p>
        <p>Wi-Fi Transfer is an optional local server on your device. Use it only on a trusted network and stop it after use. Publishing to WordPress can make content public; check the destination and post before confirming.</p>
      </>,
    },
    {
      id: "ai-output",
      title: "6. AI assistance and review",
      content: <>
        <p>AI features are optional. Generated output can be inaccurate, incomplete, biased, or unsuitable for your purpose. Review it before accepting, sharing, or relying on it; verify factual claims and any rights or permissions relevant to publication.</p>
        <p>AI output is not a substitute for qualified medical, legal, financial, or other professional advice. Do not send confidential or restricted material to a provider without authorization. The app&apos;s request details describe the NeoWriter-controlled request, not a provider&apos;s hidden instructions or internal data practices.</p>
      </>,
    },
    {
      id: "purchases",
      title: "7. Purchases, subscriptions, and refunds",
      content: <>
        <p>No purchase is made through this website. If paid features or subscriptions are offered through Apple, the price, billing period, renewal conditions, included features, and applicable terms shown before purchase govern that offer. We do not promise an unannounced price or future feature.</p>
        <p>Manage an Apple-billed subscription through your Apple account. Removing NeoWriter does not itself cancel a subscription. Apple explains <a href="https://support.apple.com/en-us/118428">how to cancel a subscription</a> and <a href="https://support.apple.com/en-us/118223">how to request a refund</a>. Refund eligibility and mandatory consumer rights depend on the applicable rules; this page does not promise approval or impose a blanket no-refund rule.</p>
        <p>Availability of a monthly, annual, or one-time option should be checked in the actual offer when one is published. This section is conditional on a purchase being offered, not a statement that NeoWriter is already on sale.</p>
      </>,
    },
    {
      id: "support-changes",
      title: "8. Support and changes",
      content: <>
        <p>Contact <ContactLink subject="NeoWriter support" locale={locale} /> for questions or problems. Include only the information needed to understand the issue. Support does not automatically receive diagnostics, and an email does not grant access to your library or accounts.</p>
        <p>The app may evolve, and individual features may depend on a platform version or external service. We will update relevant information when changes affect these terms. Nothing here permits retroactive removal of rights attached to a purchase where that would conflict with applicable law or the governing purchase terms.</p>
      </>,
    },
    {
      id: "responsibility",
      title: "9. Responsibilities and mandatory rights",
      content: <>
        <p>We do not promise uninterrupted or error-free operation or a particular writing outcome. To the extent permitted by applicable law, the app is provided as available. Responsibility and available remedies remain subject to applicable law and any governing app license.</p>
        <p>Nothing in these terms excludes a warranty, remedy, liability, or consumer protection that cannot lawfully be excluded. These terms do not introduce a specific liability cap, mandatory arbitration clause, or exclusive court jurisdiction.</p>
      </>,
    },
    {
      id: "contact",
      title: "10. Questions about these terms",
      content: <>
        <p>Email <ContactLink subject="NeoWriter terms question" locale={locale} /> for questions about these terms. For information about local data, optional transfers, diagnostics, and support correspondence, see the <LocaleLink href="/apps/neowriter/privacy" locale={locale}>Privacy Policy</LocaleLink>.</p>
      </>,
    },
  ];
}

export function NeoWriterTerms({ locale }: { locale: SiteLocale }) {
  const copy = termsMeta[locale];
  return <DocumentPage title={copy.heading} introduction={copy.introduction} updated="2026-09-09" sections={termsSections(locale)} locale={locale} />;
}

export function neoWriterTermsMetadata(locale: SiteLocale) {
  return termsMeta[locale];
}
