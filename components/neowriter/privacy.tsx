import LocaleLink from "@/components/locale-link";
import type { SiteLocale } from "@/i18n/routing.mjs";
import DocumentPage, { ContactLink, type DocumentSection } from "./document";
import styles from "./neowriter.module.css";

const privacyMeta = {
  en: {
    title: "Privacy Policy - NeoWriter",
    description: "How NeoWriter handles local writing, optional external services, diagnostics, and support communications.",
    heading: "Privacy Policy",
    introduction: "Your writing is yours. This policy explains what NeoWriter keeps locally, when information can leave your device, and what the developer receives when you choose to contact support.",
  },
  zh: {
    title: "隐私政策 - NeoWriter",
    description: "NeoWriter 如何处理本地写作内容、可选外部服务、诊断信息和支持通信。",
    heading: "隐私政策",
    introduction: "你的文字属于你。本政策说明 NeoWriter 在本地保留哪些信息、信息何时可能离开你的设备，以及当你选择联系支持时开发者会收到什么。",
  },
} as const;

function privacySections(locale: SiteLocale): readonly DocumentSection[] {
  if (locale === "zh") {
    return [
      {
        id: "scope",
        title: "1. 适用范围与简要说明",
        content: <>
          <p>本政策适用于 iPhone、iPad 和 Mac 版 NeoWriter，包括其可选集成，也适用于你与以 GenjuxApps 名义发布产品的独立开发者 Genjux 之间的支持通信。</p>
          <div className={styles.documentCallout}><p><strong>NeoWriter 没有由开发者运营的写作后端、没有开发者 AI 代理，也不会自动上传使用统计或诊断报告。</strong>你的工作资料库保存在本地。可选的同步、AI、发布和传输功能可以把数据发送到你选择的目标位置。</p></div>
          <p>不运营数据收集后端，并不等于数据永远不会在设备外被处理。当你使用相关服务时，Apple、你选择的提供商、导出内容的接收方以及用于支持的电子邮件服务可能处理数据。</p>
          <p>本网站会在你的浏览器中以 <code>genjuxapps.locale</code> 为键，本地保存你选择的网站语言。该偏好不会被另行发送，也不用于分析或跟踪；本网站未引入单独的分析或偏好上传。访问 <code>/zh/...</code> 页面时，普通网页请求自然会向托管服务提供商显示所请求的网址。此网站偏好与 NeoWriter 原生应用的数据和设置相互独立。</p>
        </>,
      },
      {
        id: "local-data",
        title: "2. 保留在设备上的内容",
        content: <>
          <p>NeoWriter 会在本地存储提供写作功能所需的信息。根据你使用的功能，其中可能包括：</p>
          <ul>
            <li>文章、书籍与文件夹、标签、链接、图片、版本历史和废纸篓项目。</li>
            <li>编辑器偏好、写作目标、自定义模板与提示词，以及其他应用设置。</li>
            <li>同步与发布元数据、本地缓存的购买权益，以及本地诊断信息。</li>
          </ul>
          <p>AI API 密钥、WebDAV 或 WordPress 凭据等集成秘密保存在设备本地的凭据存储中，用于向你配置的服务进行身份验证。它们不会通过 NeoWriter 运营的代理发送，也不会包含在自定义提示词的同步内容中。</p>
          <p>本地存储、应用隐私锁、操作系统数据保护和可选备份加密是不同的保护机制。它们均不代表你的每一份文字副本在所有位置都经过加密，也不保证总能恢复。</p>
        </>,
      },
      {
        id: "sync-backups",
        title: "3. 可选同步与备份",
        content: <>
          <p><strong>iCloud / CloudKit：</strong>如果启用 iCloud 同步，NeoWriter 会使用你 Apple 账户的私有 CloudKit 数据库。同步记录可能包括你的文字、组织与恢复元数据，以及自定义提示词。这是 Apple 的基础设施，并非 Genjux 运营的写作数据库。</p>
          <p><strong>WebDAV 与云存储：</strong>如果你配置 WebDAV 服务器或云端支持的文件夹，所选提供商会收到同步或备份操作所需的数据。其运营方、访问控制、位置、安全性和保留政策都很重要。请使用你信任的目标位置，并在支持时使用安全连接。</p>
          <p><strong>可读模式与加密保险库模式是不同选择。</strong>可读模式使用普通 Markdown 和可读文件名。加密保险库模式会在你的设备上使用 AES-256-GCM 加密文章内容、图片对象和索引；远端对象名称不透明。文件数量、大小、日期和访问模式仍可能可见。该保险库模式并不表示普通导出或每一份 iCloud 副本都使用相同保护。</p>
          <p>新的加密保险库使用单独的空远端文件夹。启用它不会抹掉先前上传到其他文件夹的明文，也不会删除提供商保留的版本。管理这些旧副本前，请保留可用备份。</p>
          <p>保险库保护远端副本，并不会使用同一口令保护实时本地资料库。完整的本地工作副本不依赖该保险库凭据。保险库模式记录和保护计数器可以通过 iCloud 钥匙串同步，缓存的保险库密钥则保存在设备本地。我们不持有用于恢复加密内容的开发者密钥。</p>
          <p>启用自动同步或备份，可能授权之后进行后台传输；你不一定会逐次批准每一次传输。你可以在应用内关闭这些功能。云文件夹提供商也可能继续按照自己的设置同步文件。</p>
          <p>备份可以存储在本地或你选择的目标位置。启用加密备份后，目标位置收到的是已封装的 <code>.nwbackup</code> 容器，而不是先在云文件夹中产生、之后才加密的明文快照。请保护口令与恢复材料：我们无法替你找回秘密或解密这些备份。关闭功能不会移除已经存储在其他位置的副本。</p>
        </>,
      },
      {
        id: "ai",
        title: "4. 可选 AI 及发送内容",
        content: <>
          <p>写作不要求使用 AI。设备端 AI 与外部 AI 是不同的处理模式。当你选择外部提供商并调用 AI 操作时，NeoWriter 会把请求直接发送到所配置的服务，而不是经由开发者运营的中继。</p>
          <p>支持的外部选择包括 Anthropic、OpenAI、DeepSeek、OpenRouter、xAI（Grok）、Google AI Studio，以及自定义 OpenAI 兼容端点。OpenRouter 等路由服务可能把请求转发给所选模型提供商。自定义端点有自己的运营方和数据实践。</p>
          <p><strong>输入内容并不总是只有所选文本。</strong>具体命令和显示的范围决定使用内容：所选文本、当前段落或章节、一篇文章，或光标前的文字。未选择文本时执行摘要，可能使用整篇文章；续写可能使用光标前的全部内容。</p>
          <p>请求包括解析后的源文本、NeoWriter 实际使用的提示词或指令、所选模型、相关请求设置，以及该服务所需的身份验证信息。发送前请检查请求详情、范围和接收方。外部处理需要应用内适用的同意；更换提供商、具体模型或接收方时，可能需要再次确认。</p>
          <p>提供商还可能收到常规网络信息，例如你的 IP 地址和请求元数据。其保留、日志、训练和跨境处理实践受其自身条款及你的提供商设置约束。NeoWriter 无法承诺每个提供商都不保留任何内容，或绝不使用提交内容进行训练。</p>
          <p>关闭外部 AI 或取消请求，可以阻止应用继续处理或发起未来请求，但无法撤回提供商已经收到的字节。除非你有权向该接收方共享，否则不要提交机密材料。</p>
        </>,
      },
      {
        id: "publishing-transfer",
        title: "5. 发布、导出与本地传输",
        content: <>
          <p><strong>Mac 上的 WordPress 发布：</strong>发布会使用身份验证凭据，把文章标题和格式化正文发送到你配置的 WordPress 站点。确认后，该操作可以创建实时文章或更新现有文章。发布的材料可能公开。删除本地文章不会删除远端文章。</p>
          <p><strong>导出与共享：</strong>当你导出文件或使用系统共享时，目标应用、存储提供商或个人会收到你选择的内容。NeoWriter 无法控制其对所生成副本的处理。</p>
          <p><strong>iOS 上的 Wi-Fi 传输：</strong>此可选功能会暂时在你的设备上运行本地传输服务器，而不是在开发者后端运行。能够访问所显示本地地址的设备，可能访问该传输功能提供的文章。它使用本地 HTTP，不应被描述为端到端加密。请使用可信网络，并在完成后停止传输服务器。</p>
        </>,
      },
      {
        id: "local-tools",
        title: "6. 图片、系统功能与本地组件",
        content: <>
          <p>你选择导入的图片或文件会为所请求的功能进行处理，例如插入图片，或使用 Apple Vision 在设备上识别文字。之后的同步、导出、发布或共享可能把导入内容作为作品的一部分进行传输。</p>
          <p>系统功能、权限、身份验证和服务受设备设置及 Apple 披露约束。例如，Face ID 身份验证向应用提供的是验证结果，而不是生物识别模板。使用操作系统服务，不等同于向开发者上传报告。</p>
          <p>NeoWriter 不包含广告或第三方分析跟踪器。本地组件包括 GRDB、swift-markdown、KaTeX、Mermaid 和语法高亮资源。它们支持存储与渲染，其存在并不代表分析数据收集。Markdown 预览使用随应用提供的渲染资源，而不是托管的文档渲染服务。</p>
        </>,
      },
      {
        id: "purchases",
        title: "7. Apple 购买",
        content: <>
          <p>截至本政策日期，NeoWriter 尚未在 App Store 上架。本节说明将来若通过 Apple 提供购买时的购买集成，并非宣布产品可用或公布价格。</p>
          <p>Apple 根据其自身条款处理购买及相关账户与付款信息。NeoWriter 使用解锁和恢复功能所需的交易或权益信息。开发者不会通过 StoreKit 收到你的完整支付卡信息。</p>
        </>,
      },
      {
        id: "support",
        title: "8. 支持邮件与诊断信息",
        content: <>
          <p>NeoWriter 不会自动向开发者发送诊断报告或使用统计。如果你选择发送支持邮件，我们会收到你的发件地址、消息，以及你主动附加的截图、诊断文件或其他附件。</p>
          <p>我们使用这些信息回复你、调查你报告的问题并处理相关跟进。邮件由开发者的电子邮件提供商和邮箱处理与存储；没有应用后端并不表示支持通信永远不会被存储。</p>
          <p>只发送必要内容。附加报告前请检查并删减敏感信息，不要发送 API 密钥、密码、恢复短语、付款详情或无关的私人文字。提供诊断信息完全自愿。最小报告清单请参阅<LocaleLink href="/apps/neowriter/support" locale={locale}>支持页面</LocaleLink>。</p>
        </>,
      },
      {
        id: "retention",
        title: "9. 保留与删除",
        content: <>
          <p>不同副本需要分别管理：</p>
          <ul>
            <li><strong>本地资料库与废纸篓：</strong>应用数据会一直保留，直到通过应用或适当的平台控制移除。移入废纸篓不等同于永久删除。移除你可能需要恢复的数据前，请保留备份。</li>
            <li><strong>Mac 应用数据：</strong>只删除应用本身，可能会留下 Application Support 或沙盒容器数据及备份。不要假设卸载应用会清除每一份本地副本。</li>
            <li><strong>CloudKit：</strong>私有 CloudKit 记录与普通 iCloud Drive 文件不同。只删除 Drive 文件夹，不应被视为删除 CloudKit 数据库。请在可用时使用相应的应用专用 iCloud 存储控制，或联系支持获取指引。</li>
            <li><strong>WebDAV、云文件夹、备份、导出与已发布文章：</strong>请在实际目标位置移除不需要的副本，并考虑其保留和恢复设置。</li>
            <li><strong>外部 AI 请求：</strong>提供商已经持有的副本或日志，受该提供商的保留与删除选项约束。</li>
          </ul>
          <p>支持通信会为处理你的请求及相关跟进而保留，并受适用的记录保留义务约束。你可以要求我们删除所持有的通信；如有信息必须保留，我们会作出说明。由提供商管理的备份与保留受邮件服务政策约束。</p>
          <p>我们不会出售支持信息，也不会将其用于广告。为了让邮件服务处理通信、回应法律义务，或提出及抗辩法律主张，可能需要披露相关信息。</p>
        </>,
      },
      {
        id: "choices-rights",
        title: "10. 选择与隐私请求",
        content: <>
          <p>你可以在不启用外部 AI 或同步的情况下进行本地写作。你可以更改或关闭集成，并决定是否发送支持报告。更改这些设置不会自动抹掉已经交付到其他目标位置的副本。</p>
          <p>根据适用法律，你可能有权访问、更正、删除、限制或反对个人信息处理。如需处理支持通信中所含的信息，请联系<ContactLink subject="NeoWriter 隐私请求" locale={locale} />。我们可能需要适度信息来识别相关请求，但除非已商定必要且适当的流程，否则不要发送无关身份证明或秘密。</p>
          <p>我们无法独立访问或删除你的私有云账户、已发布站点或 AI 提供商记录。有关这些服务的请求可能需要向相应提供商提出。根据你所在地区，你也可能有权向相关隐私监管机构投诉。</p>
        </>,
      },
      {
        id: "children-services",
        title: "11. 年龄分级与外部服务",
        content: <>
          <p>NeoWriter 尚未上架，因此还没有确认 App Store 年龄分级。外部 AI 提供商和其他服务可能规定自己的年龄与账户要求。</p>
          <p>如果你是父母或监护人，并认为儿童通过支持渠道提供了个人信息，请联系我们，以便依适用法律处理请求。所选外部服务可能在不同国家或地区处理数据；共享材料前，请查看其数据区域和传输条款。</p>
        </>,
      },
      {
        id: "changes-contact",
        title: "12. 变更与联系",
        content: <>
          <p>政策变更时，我们会更新本页日期。在有要求时，重大变更会配合适当通知或同意。网站政策更新本身，不会为新的外部 AI 目标位置或更广的文本范围授予许可。</p>
          <p>如有问题或隐私请求，请发送邮件至<ContactLink subject="NeoWriter 隐私请求" locale={locale} />。有关应用使用和第三方服务的信息，请阅读<LocaleLink href="/apps/neowriter/terms" locale={locale}>使用条款</LocaleLink>。</p>
        </>,
      },
    ];
  }

  return [
    {
      id: "scope",
      title: "1. Scope and the short version",
      content: <>
        <p>This policy covers the NeoWriter apps for iPhone, iPad, and Mac, including their optional integrations, and support communications with Genjux, the independent developer publishing under the GenjuxApps name.</p>
        <div className={styles.documentCallout}><p><strong>There is no developer-operated writing backend, no developer AI proxy, and no automatic upload of usage statistics or diagnostic reports by NeoWriter.</strong> Your working library is local. Optional sync, AI, publishing, and transfer features can send data to the destinations you choose.</p></div>
        <p>Not operating a data-collection backend is different from saying that no data is ever processed outside your device. Apple, your chosen providers, recipients of exports, and the email service used for support may process data when you use those services.</p>
        <p>This website stores your selected site language locally in your browser under <code>genjuxapps.locale</code>. The preference is not separately sent or used for analytics or tracking; no separate analytics or preference upload is introduced. Ordinary requests for <code>/zh/...</code> pages naturally disclose the requested URL to the hosting provider. This website preference is separate from NeoWriter&apos;s native-app data and settings.</p>
      </>,
    },
    {
      id: "local-data",
      title: "2. What stays on your device",
      content: <>
        <p>NeoWriter stores the information needed to provide its writing features locally. Depending on the features you use, this includes:</p>
        <ul>
          <li>Articles, books and folders, tags, links, images, version history, and Trash items.</li>
          <li>Editor preferences, writing goals, custom templates and prompts, and other app settings.</li>
          <li>Sync and publishing metadata, locally cached purchase entitlements, and local diagnostic information.</li>
        </ul>
        <p>Integration secrets, such as AI API keys and WebDAV or WordPress credentials, are kept in device-local credential storage and used to authenticate with the service you configure. They are not sent through a NeoWriter-operated proxy or included in custom-prompt sync content.</p>
        <p>Local storage, an app privacy lock, operating-system data protection, and optional backup encryption are different protections. None is a promise that every copy of your writing is encrypted everywhere or that recovery is always possible.</p>
      </>,
    },
    {
      id: "sync-backups",
      title: "3. Optional sync and backups",
      content: <>
        <p><strong>iCloud / CloudKit:</strong> if you enable iCloud sync, NeoWriter uses your Apple account&apos;s private CloudKit database. Synced records can include your writing, organization and recovery metadata, and custom prompts. This is Apple&apos;s infrastructure, not a writing database operated by Genjux.</p>
        <p><strong>WebDAV and cloud storage:</strong> if you configure a WebDAV server or a cloud-backed folder, the selected provider receives the data needed for the sync or backup operation. Its operator, access controls, location, security, and retention policies matter. Use a destination you trust and a secure connection where supported.</p>
        <p><strong>Readable and encrypted vault modes are different choices.</strong> Readable mode stores ordinary Markdown with readable filenames. In encrypted vault mode, article content, image objects, and the index are encrypted on your device with AES-256-GCM; the remote object names are opaque. File counts, sizes, dates, and access patterns can still be visible. This vault mode is not a claim that ordinary exports or every iCloud copy uses the same protection.</p>
        <p>A new encrypted vault uses a separate, empty remote folder. Enabling it does not erase plaintext previously uploaded to another folder or versions retained by a provider. Preserve a usable backup before managing those older copies.</p>
        <p>The vault protects remote copies, not the live local library with the same passphrase. An intact local working copy remains independent of that vault credential. Vault-mode records and protection counters can synchronize through iCloud Keychain, while cached vault keys are device-local. We do not hold a developer recovery key for your encrypted content.</p>
        <p>Enabling automatic sync or backups can authorize later background transfers; you do not necessarily approve every transfer separately. You can disable these features in the app. A cloud-folder provider may also continue synchronizing files according to its own settings.</p>
        <p>Backups may be stored locally or in a destination you choose. With encrypted backups enabled, the destination receives a sealed <code>.nwbackup</code> container, not a plaintext snapshot that is encrypted afterward in the cloud folder. Protect the passphrase and recovery material: we cannot recover your secret or decrypt those backups for you. Turning off a feature does not remove copies already stored elsewhere.</p>
      </>,
    },
    {
      id: "ai",
      title: "4. Optional AI and what is sent",
      content: <>
        <p>Writing does not require AI. On-device AI and external AI are different processing modes. When you choose an external provider and invoke an AI action, NeoWriter sends the request directly to the configured service, not through a developer-operated relay.</p>
        <p>The supported external choices include Anthropic, OpenAI, DeepSeek, OpenRouter, xAI (Grok), Google AI Studio, and a custom OpenAI-compatible endpoint. A routing service such as OpenRouter may forward requests to the selected model provider. A custom endpoint has its own operator and data practices.</p>
        <p><strong>The input is not always just selected text.</strong> The command and displayed scope determine what is used: a selection, the current paragraph or section, an article, or text before the cursor. A summary without a selection can use an entire article; continuation can use everything before the cursor.</p>
        <p>The request includes the resolved source text, NeoWriter&apos;s effective prompt or instructions, the selected model, relevant request settings, and the authentication needed by that service. Review the request details, scope, and recipient before sending. External processing requires the app&apos;s applicable consent; changing the provider, concrete model, or recipient can require confirmation again.</p>
        <p>Providers may also receive ordinary network information, such as your IP address and request metadata. Their retention, logging, training, and international-processing practices are governed by their own terms and your provider settings. NeoWriter cannot promise that every provider retains nothing or never uses submitted content for training.</p>
        <p>Disabling external AI or cancelling a request can prevent further app processing or future requests, but it cannot retract bytes already received by a provider. Do not submit confidential material unless you are authorized to share it with that recipient.</p>
      </>,
    },
    {
      id: "publishing-transfer",
      title: "5. Publishing, exports, and local transfer",
      content: <>
        <p><strong>WordPress publishing on Mac:</strong> publishing sends the article&apos;s title and formatted body to your configured WordPress site using its authentication credentials. The action can create a live post or update an existing one after confirmation. Published material may become public. Removing a local article does not remove the remote post.</p>
        <p><strong>Export and sharing:</strong> when you export files or use system sharing, the destination app, storage provider, or person receives the content you choose. Their handling of the resulting copy is outside NeoWriter&apos;s control.</p>
        <p><strong>Wi-Fi Transfer on iOS:</strong> this optional feature temporarily runs a local transfer server on your device, not on a developer backend. Devices that can reach the displayed local address may access the articles made available by the transfer feature. It uses local HTTP, which should not be described as end-to-end encrypted. Use a trusted network and stop the transfer server when finished.</p>
      </>,
    },
    {
      id: "local-tools",
      title: "6. Images, system features, and local components",
      content: <>
        <p>Images or files you choose to import are processed for the requested feature, such as image insertion or on-device text recognition using Apple Vision. Later sync, export, publishing, or sharing may transmit imported content as part of your work.</p>
        <p>System features, permissions, authentication, and services are governed by your device settings and Apple&apos;s disclosures. For example, Face ID authentication supplies an authentication result to the app, not the biometric template. Using an operating-system service is distinct from uploading a report to the developer.</p>
        <p>NeoWriter does not include advertising or third-party analytics trackers. Its local components include GRDB, swift-markdown, KaTeX, Mermaid, and syntax-highlighting resources. These support storage and rendering; their presence is not analytics collection. The Markdown preview uses bundled rendering assets rather than a hosted document-rendering service.</p>
      </>,
    },
    {
      id: "purchases",
      title: "7. Apple purchases",
      content: <>
        <p>NeoWriter is not yet listed on the App Store as of this policy&apos;s date. This section explains the purchase integration if purchases are offered through Apple; it is not an announcement of availability or pricing.</p>
        <p>Apple processes the purchase and associated account and payment information under its own terms. NeoWriter uses transaction or entitlement information needed to unlock and restore features. The developer does not receive your full payment-card information from StoreKit.</p>
      </>,
    },
    {
      id: "support",
      title: "8. Support emails and diagnostics",
      content: <>
        <p>NeoWriter does not automatically send diagnostic reports or usage statistics to the developer. If you choose to email support, we receive your sender address, message, and any screenshots, diagnostic files, or other attachments you include.</p>
        <p>We use that information to respond, investigate the issue you reported, and handle related follow-up. Email is processed and stored by the developer&apos;s email provider and mailbox; the absence of an app backend does not mean support correspondence is never stored.</p>
        <p>Send only what is needed. Review and redact reports before attaching them, and do not send API keys, passwords, recovery phrases, payment details, or unrelated private writing. Providing diagnostics is voluntary. See <LocaleLink href="/apps/neowriter/support" locale={locale}>Support</LocaleLink> for a minimal report checklist.</p>
      </>,
    },
    {
      id: "retention",
      title: "9. Retention and deletion",
      content: <>
        <p>Different copies need to be managed separately:</p>
        <ul>
          <li><strong>Local library and Trash:</strong> app data remains until removed through the app or appropriate platform controls. Deletion into Trash is not the same as permanent deletion. Keep a backup before removing data you may want to recover.</li>
          <li><strong>Mac app data:</strong> deleting the application itself may leave its Application Support or sandbox-container data and backups behind. Do not assume uninstalling the app clears every local copy.</li>
          <li><strong>CloudKit:</strong> private CloudKit records are distinct from ordinary iCloud Drive files. Deleting a Drive folder alone should not be treated as deletion of the CloudKit database. Use the appropriate app-specific iCloud storage controls where available, or contact support for guidance.</li>
          <li><strong>WebDAV, cloud folders, backups, exports, and published posts:</strong> remove unwanted copies at their actual destinations, considering their retention and recovery settings.</li>
          <li><strong>External AI requests:</strong> copies or logs already held by a provider are governed by that provider&apos;s retention and deletion options.</li>
        </ul>
        <p>Support correspondence is kept for handling your request and related follow-up, subject to applicable record-retention obligations. You may ask us to delete correspondence we hold; we will explain any information that must be retained. Provider-managed backups and retention are subject to the email service&apos;s policies.</p>
        <p>We do not sell support information or use it for advertising. Disclosure may be necessary to the email service that handles the correspondence, to respond to a legal obligation, or to establish or defend a legal claim.</p>
      </>,
    },
    {
      id: "choices-rights",
      title: "10. Choices and privacy requests",
      content: <>
        <p>You can write locally without enabling external AI or sync. You can change or disable integrations and decide whether to send a support report. Changing these settings does not automatically erase copies already delivered to another destination.</p>
        <p>Depending on applicable law, you may have rights to access, correct, delete, restrict, or object to processing of personal information. Contact <ContactLink subject="NeoWriter privacy request" locale={locale} /> about information held in support correspondence. We may need proportionate information to identify the relevant request, but do not send unrelated identity documents or secrets unless a necessary, appropriate process has been agreed.</p>
        <p>We cannot independently access or erase your private cloud account, published site, or an AI provider&apos;s records. Requests about those services may need to be made to the relevant provider. Depending on your location, you may also have a right to complain to the relevant privacy authority.</p>
      </>,
    },
    {
      id: "children-services",
      title: "11. Age ratings and external services",
      content: <>
        <p>No App Store age rating has been confirmed for NeoWriter, which has not yet been listed. External AI providers and other services may impose their own age and account requirements.</p>
        <p>If you are a parent or guardian and believe a child has provided personal information through support, contact us so the request can be handled under applicable law. Chosen external services may process data in different countries; review their data-region and transfer terms before sharing material.</p>
      </>,
    },
    {
      id: "changes-contact",
      title: "12. Changes and contact",
      content: <>
        <p>We will update the date on this page when the policy changes. Where required, material changes will be accompanied by appropriate notice or consent. A website policy update does not itself grant permission for a new external AI destination or broader text scope.</p>
        <p>For questions or privacy requests, email <ContactLink subject="NeoWriter privacy request" locale={locale} />. Read the <LocaleLink href="/apps/neowriter/terms" locale={locale}>Terms of Use</LocaleLink> for information about using the app and third-party services.</p>
      </>,
    },
  ];
}

export function NeoWriterPrivacy({ locale }: { locale: SiteLocale }) {
  const copy = privacyMeta[locale];
  return <DocumentPage title={copy.heading} introduction={copy.introduction} updated="2026-09-09" sections={privacySections(locale)} locale={locale} />;
}

export function neoWriterPrivacyMetadata(locale: SiteLocale) {
  return privacyMeta[locale];
}
