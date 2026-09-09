import { siteConfig } from "@/lib/site-config";
import { translator } from "./translator";
import type { SiteLocale } from "./routing.mjs";

const en = {
  nav: { apps: "Apps", about: "About", blog: "Blog", donate: "Donate", supporters: "Supporters", rss: "RSS feeds", email: "Email", contact: "Email and contact", menu: "Menu", primary: "Primary navigation", mobile: "Mobile navigation", home: "{name} home" },
  common: { skip: "Skip to content", footer: "Site footer", social: "Social profiles", unconfigured: "Not configured yet", profilePending: "{name} profile not configured yet", portrait: "{name}'s portrait", tagline: siteConfig.tagline, untranslated: "No Chinese translation is available; the original English content is shown below.", originalEnglish: "Original English", allApps: "All apps", discover: "Discover {name}", explore: "Explore {name}", updated: "Updated", readTime: "{count} min read" },
  home: { code: "Code", line1: "Small, considered apps for everyday life.", line2: "Made for Mac, iPhone, and iPad.", codePending: "Code profile not configured yet.", featured: "Featured app: {name}", collection: "From my app collection", meet: "Meet {name}", screenshot: "Bebilog home screen showing daily care records and insights", shelf: "A few things I've made" },
  apps: { title: "Apps, made ", accent: "with care.", line1: "A little more useful. A little more delightful.", line2: "Made for Mac, iPhone, and iPad.", note: "Something new, every now and then.", rss: "Follow along with RSS." },
  about: { eyebrow: "A little introduction", title: "Hi, I'm {name}.", draft: "A longer introduction is on the way. In the meantime, take a look at what I'm making.", appsTitle: "Things I'm making", appsBody: "Small apps for different parts of the day. Explore the collection for Mac, iPhone, and iPad.", explore: "Explore my apps", blog: "Read the blog", connect: "Let's connect", connectBody: "You'll find contact details and social profiles in one place.", contact: "Get in touch" },
  blog: { eyebrow: "Notes from the workbench", title: "The blog.", line1: "On making things, small discoveries,", line2: "and everything learned along the way.", emptyTitle: "A quiet corner, for now.", emptyBody: "No posts published yet. Subscribe to the blog feed and new writing will find its way to you.", follow: "Follow with RSS", back: "Back to the blog", more: "More notes, whenever there's something worth sharing.", subscribe: "Subscribe with RSS" },
  contact: { eyebrow: "Say hello", title: "Let's keep in touch.", lede: "A question, an idea, or just a hello.", email: "Email", emailNote: "For an app question, please use the support options below so it reaches the right place.", emptyTitle: "Email details are on the way.", emptyBody: "A general contact address hasn't been configured yet. For help with an app, its existing support options are still available.", appsTitle: "Need a hand with an app?", appsBody: "Visit the app's website for its support, feedback, and contact options.", elsewhere: "Elsewhere on the internet" },
  donate: { eyebrow: "A little support goes a long way", title: "Support the work.", line1: "If you enjoy what I make, here are a few ways", line2: "to help more of it find its way into the world.", monthly: "Monthly support", once: "A one-time thank you", emptyTitle: "Thank you for being here.", emptyBody: "Donation options aren't configured yet. In the meantime, trying an app or sharing it with a friend is a lovely way to support the work.", appsTitle: "Find an app you love", appsBody: "Explore the apps, tell a friend, or leave an honest review on the App Store. Every bit of encouragement matters.", browse: "Browse the apps", supporters: "Meet the supporters" },
  supporters: { eyebrow: "Made possible by people", title: "A heartfelt thank you.", line1: "A place to recognize the people and companies", line2: "who support this independent work.", group: "Supporters", former: "Previous {group}", emptyTitle: "There's room for you here.", emptyBody: "No supporters are listed yet. Names will appear here only with permission. Thanks for following along, using the apps, and cheering on the work.", cta: "Want to be part of what comes next?", support: "Support the work" },
  feeds: { eyebrow: "Follow at your own pace", title: "A quieter way to keep up.", line1: "No algorithm. No inbox clutter.", line2: "Just updates, in your favorite RSS reader.", blog: "Blog", blogBody: "New writing, delivered to your reader.", apps: "New apps", appsBody: "Be the first to hear about a new app.", repos: "New projects", reposBody: "New public code and open-source projects, when shared.", entries: "{count, plural, =0 {No entries yet} one {# entry} other {# entries}}", updates: "{count, plural, =0 {No updates published yet} one {# update} other {# updates}}", releases: "App release notes", followApp: "Follow what's new in {name}.", help: "New to RSS?", helpBody: "Copy a feed's link into your RSS reader to subscribe. Feeds without entries are ready to subscribe to now; they'll update when something is published." },
  metadata: {
    homeTitle: "{name}", homeDescription: siteConfig.description,
    appsTitle: "Apps", appsDescription: "Explore {apps}. Apps for Mac, iPhone, and iPad.",
    aboutTitle: "About", aboutDescription: "Meet {name}, the maker behind GenjuxApps.",
    blogTitle: "Blog", blogDescription: "Notes on making apps, small discoveries, and the things learned along the way.",
    contactTitle: "Contact", contactDescription: "Contact Genjux, find social profiles, and get help with an app.",
    donateTitle: "Donate", donateDescription: "Support independent app making and the work behind GenjuxApps.",
    supportersTitle: "Supporters", supportersDescription: "A thank you to the people supporting GenjuxApps.",
    feedsTitle: "RSS feeds", feedsDescription: "Follow new writing, app launches, public projects, and app release notes with RSS.",
  },
};

const zh: typeof en = {
  nav: { apps: "应用", about: "关于", blog: "博客", donate: "赞助", supporters: "支持者", rss: "RSS 订阅", email: "邮箱", contact: "邮箱与联系", menu: "菜单", primary: "主导航", mobile: "移动端导航", home: "{name} 首页" },
  common: { skip: "跳转到正文", footer: "网站页脚", social: "社交账号", unconfigured: "暂未配置", profilePending: "{name} 账号暂未配置", portrait: "{name} 的头像", tagline: "独立开发者与应用创作者", untranslated: "暂无中文译文，以下显示英文原文。", originalEnglish: "英文原文", allApps: "所有应用", discover: "了解 {name}", explore: "探索 {name}", updated: "更新于", readTime: "约 {count} 分钟阅读" },
  home: { code: "代码", line1: "为日常生活，用心制作小而实用的应用。", line2: "适用于 Mac、iPhone 和 iPad。", codePending: "代码主页暂未配置。", featured: "精选应用：{name}", collection: "我的应用作品", meet: "认识 {name}", screenshot: "Bebilog 英文版主界面，展示日常护理记录与洞察", shelf: "一些我制作的应用" },
  apps: { title: "每一款应用，", accent: "都用心打磨。", line1: "多一点实用，多一点愉悦。", line2: "为 Mac、iPhone 和 iPad 而做。", note: "不时会有新的作品。", rss: "通过 RSS 关注更新。" },
  about: { eyebrow: "简单介绍一下", title: "你好，我是 {name}。", draft: "更完整的介绍正在准备中。你可以先看看我正在制作的应用。", appsTitle: "我正在制作什么", appsBody: "为一天中的不同片刻制作小应用。来看看适用于 Mac、iPhone 和 iPad 的作品。", explore: "探索我的应用", blog: "阅读博客", connect: "保持联系", connectBody: "联系方式与社交账号，都整理在这里。", contact: "联系我" },
  blog: { eyebrow: "工作台上的笔记", title: "博客。", line1: "关于创作、那些小小的发现，", line2: "以及一路学到的事情。", emptyTitle: "这里暂时还很安静。", emptyBody: "还没有发布文章。订阅博客 RSS，有新内容时，它会来到你的阅读器里。", follow: "通过 RSS 关注", back: "返回博客", more: "有值得分享的内容时，就写下来。", subscribe: "订阅 RSS" },
  contact: { eyebrow: "打个招呼", title: "一起保持联系。", lede: "一个问题、一个想法，或一句问候。", email: "邮箱", emailNote: "如果是应用使用问题，请通过下方的支持入口，让问题到达合适的地方。", emptyTitle: "联系邮箱即将补充。", emptyBody: "通用联系邮箱尚未配置。如需应用帮助，仍可使用各应用现有的支持渠道。", appsTitle: "使用应用时需要帮助？", appsBody: "进入对应应用的网站，查看支持、反馈和联系方式。", elsewhere: "也可以在这些地方找到我" },
  donate: { eyebrow: "一点支持，也有很大意义", title: "支持独立创作。", line1: "如果你喜欢我制作的东西，", line2: "这里有几种方式，帮助更多作品来到大家面前。", monthly: "按月支持", once: "一次性的感谢", emptyTitle: "谢谢你来到这里。", emptyBody: "赞助方式尚未配置。现在，试用一款应用，或把它分享给朋友，就是很好的支持。", appsTitle: "找到一款喜欢的应用", appsBody: "探索这些应用，推荐给朋友，或在 App Store 留下真实评价。每一份鼓励都很重要。", browse: "浏览应用", supporters: "认识支持者" },
  supporters: { eyebrow: "因为有人支持，创作才得以继续", title: "真心说一声谢谢。", line1: "在这里，感谢支持独立创作的", line2: "每一个人和每一家企业。", group: "支持者", former: "曾经的{group}", emptyTitle: "这里也为你留着位置。", emptyBody: "目前还没有列出支持者。只有得到许可后，名字才会展示在这里。谢谢你关注、使用应用，并为创作加油。", cta: "愿意参与接下来的旅程吗？", support: "支持创作" },
  feeds: { eyebrow: "按自己的节奏关注", title: "安静一点，跟上新变化。", line1: "没有算法，也不挤占收件箱。", line2: "更新会出现在你喜欢的 RSS 阅读器里。", blog: "博客", blogBody: "新文章，直接送到阅读器。", apps: "新应用", appsBody: "有新作品时，及时知道。", repos: "新项目", reposBody: "在公开分享时，收到代码与开源项目的消息。", entries: "{count, plural, =0 {暂无内容} other {# 条内容}}", updates: "{count, plural, =0 {暂未发布更新} other {# 次更新}}", releases: "应用更新日志", followApp: "关注 {name} 的新变化。", help: "第一次使用 RSS？", helpBody: "把订阅源链接复制到 RSS 阅读器即可订阅。暂时没有内容的订阅源也可以先关注，发布后就会更新。" },
  metadata: {
    homeTitle: "{name}", homeDescription: "为 Mac、iPhone 和 iPad 用心制作的应用，来自 Genjux。",
    appsTitle: "应用", appsDescription: "探索 {apps}。适用于 Mac、iPhone 和 iPad 的应用。",
    aboutTitle: "关于", aboutDescription: "认识 GenjuxApps 背后的创作者 {name}。",
    blogTitle: "博客", blogDescription: "关于制作应用、小小的发现，以及一路学到的事情。",
    contactTitle: "联系", contactDescription: "联系 Genjux、查找社交账号，或获得应用帮助。",
    donateTitle: "赞助", donateDescription: "支持 GenjuxApps 背后的独立应用创作。",
    supportersTitle: "支持者", supportersDescription: "感谢支持 GenjuxApps 的每一个人。",
    feedsTitle: "RSS 订阅", feedsDescription: "通过 RSS 关注文章、新应用、公开项目和应用更新。",
  },
};

export function catalogT(locale: SiteLocale = "en") {
  return translator(locale, locale === "zh" ? zh : en);
}
