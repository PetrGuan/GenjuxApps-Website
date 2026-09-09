import type { SiteLocale } from "@/i18n/routing.mjs";

type FeatureCopy = { title: string; text: string };

type LumadioMessages = {
  metadata: Record<"home" | "privacy" | "terms" | "support", { title: string; description: string }>;
  header: {
    navigation: string;
    home: string;
    features: string;
    pricing: string;
    support: string;
    download: string;
    downloadLabel: string;
  };
  footer: {
    tagline: string;
    product: string;
    overview: string;
    features: string;
    pricing: string;
    appStore: string;
    resources: string;
    support: string;
    github: string;
    genjux: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
    madeFor: string;
  };
  mockup: {
    label: string;
    active: string;
    scene: string;
    focus: string;
    movie: string;
    night: string;
    displays: string;
    connected: string;
    builtInDisplay: string;
    appAudio: string;
    live: string;
    music: string;
    focusScene: string;
  };
  home: {
    pill: string;
    titleLines: [string, string, string];
    lede: string;
    download: string;
    explore: string;
    free: string;
    system: string;
    silicon: string;
    manifestoEyebrow: string;
    manifestoTitle: string;
    manifestoAccent: string;
    featureEyebrow: string;
    featureTitle: string;
    featureAccent: string;
    featureNote: string;
    features: FeatureCopy[];
    scenesEyebrow: string;
    scenesTitle: string;
    scenesBody: string;
    sceneBenefits: [string, string, string];
    sceneCards: [
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string; ready: string },
    ];
    privacyEyebrow: string;
    privacyTitle: string;
    privacyBody: string;
    privacyLink: string;
    pricingEyebrow: string;
    pricingTitle: string;
    pricingNote: string;
    pro: string;
    oneTime: string;
    lifetime: string;
    get: string;
    includes: string;
    proFeatures: [string, string, string, string, string];
    priceNote: string;
    finalAlt: string;
    finalEyebrow: string;
    finalTitle: string;
  };
  legal: {
    lastUpdated: string;
  };
};

export const lumadioMessages = {
  en: {
    metadata: {
      home: {
        title: "Lumadio — Displays and App Audio, Together",
        description: "One menu bar for your displays and app audio. Control brightness, display modes, per-app volume, routing, and scenes on macOS.",
      },
      privacy: {
        title: "Privacy Policy — Lumadio",
        description: "How Lumadio handles settings, diagnostics, permissions, purchases, and support information.",
      },
      terms: {
        title: "Terms of Use — Lumadio",
        description: "Terms governing use of the Lumadio macOS application and website.",
      },
      support: {
        title: "Support — Lumadio",
        description: "System requirements, permission help, troubleshooting, and contact information for Lumadio.",
      },
    },
    header: {
      navigation: "Lumadio navigation",
      home: "Lumadio home",
      features: "Features",
      pricing: "Pricing",
      support: "Support",
      download: "Download",
      downloadLabel: "Download Lumadio on the Mac App Store",
    },
    footer: {
      tagline: "One menu bar for your displays and app audio.",
      product: "Product",
      overview: "Overview",
      features: "Features",
      pricing: "Pricing",
      appStore: "Mac App Store",
      resources: "Resources",
      support: "Support",
      github: "GitHub",
      genjux: "Genjux",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      copyright: "© 2026 Genjux. All rights reserved.",
      madeFor: "Made for macOS",
    },
    mockup: {
      label: "Illustration of the Lumadio menu bar interface",
      active: "Active",
      scene: "SCENE",
      focus: "Focus",
      movie: "Movie",
      night: "Night",
      displays: "DISPLAYS",
      connected: "2 CONNECTED",
      builtInDisplay: "Built-in · Liquid Retina XDR",
      appAudio: "APP AUDIO",
      live: "LIVE",
      music: "Music",
      focusScene: "Focus scene",
    },
    home: {
      pill: "Native macOS menu bar app",
      titleLines: ["Your displays.", "Your app audio.", "One menu bar."],
      lede: "Lumadio puts the controls you reach for every day in one calm, fast place—then lets you save the whole setup as a scene.",
      download: "Download on the Mac App Store",
      explore: "Explore features",
      free: "Free to download",
      system: "macOS 14.2+",
      silicon: "Apple silicon",
      manifestoEyebrow: "CONTROL CENTER, RECONSIDERED",
      manifestoTitle: "Stop hunting through settings.",
      manifestoAccent: "Keep your setup within reach.",
      featureEyebrow: "EVERYDAY CONTROL",
      featureTitle: "Small controls.",
      featureAccent: "A much smoother Mac.",
      featureNote: "Lumadio stays out of your way until you need it.",
      features: [
        { title: "Display control", text: "Adjust brightness, switch resolutions and refresh rates, and manage HiDPI modes without opening System Settings." },
        { title: "Per-app audio", text: "Set volume, mute, watch live levels, and choose an output device for each supported audio app." },
        { title: "Scenes", text: "Save your display and audio setup together. Move from focus to presentation or movie night in one action." },
        { title: "Shortcuts built in", text: "Use global hotkeys, Apple Shortcuts, and the lumadio:// URL scheme for visible display controls." },
        { title: "Presentation mode", text: "Prepare connected displays and audio for sharing a screen, then return to your previous setup when finished." },
        { title: "Useful extras", text: "Bring more light to a call with Face Light, or use supported XDR headroom when your Mac and display allow it." },
      ],
      scenesEyebrow: "ONE ACTION, WHOLE SETUP",
      scenesTitle: "Scenes remember the way you work.",
      scenesBody: "Brightness, warmth, display mode, and app audio can change together. Create a setup once, then bring it back from the menu bar, a hotkey, or Shortcuts.",
      sceneBenefits: ["Settle into evening work", "Route an app to another output", "Normalize or solo supported audio"],
      sceneCards: [
        { title: "Movie night", detail: "Dim displays · Route audio" },
        { title: "Presentation", detail: "Mirror display · Duck notifications" },
        { title: "Deep focus", detail: "72% brightness · Music at 24%", ready: "Ready" },
      ],
      privacyEyebrow: "PRIVATE BY DEFAULT",
      privacyTitle: "Your controls stay on your Mac.",
      privacyBody: "Lumadio stores preferences, scenes, and settings locally. It does not contain advertising trackers, does not record audio content, and does not automatically upload diagnostics.",
      privacyLink: "Read the privacy policy",
      pricingEyebrow: "SIMPLE PRICING",
      pricingTitle: "Start free. Keep Pro forever.",
      pricingNote: "No subscription. No feature bundles. One affordable lifetime unlock.",
      pro: "LUMADIO PRO",
      oneTime: "one-time purchase",
      lifetime: "Lifetime access to Lumadio Pro through a non-consumable in-app purchase.",
      get: "Get Lumadio",
      includes: "Pro includes",
      proFeatures: [
        "Unlimited scenes and scene shortcuts",
        "Per-app routing, Solo, pan, and normalization",
        "XDR enhancement and Face Light",
        "Presentation and display automations",
        "Advanced Apple Shortcuts actions",
      ],
      priceNote: "Price shown in USD. Local App Store pricing and taxes may vary.",
      finalAlt: "Lumadio app icon",
      finalEyebrow: "YOUR MAC, IN HARMONY",
      finalTitle: "One menu bar.\nFewer detours.",
    },
    legal: {
      lastUpdated: "Last updated:",
    },
  },
  zh: {
    metadata: {
      home: {
        title: "Lumadio — 显示器与应用音频，尽在一处",
        description: "用一个菜单栏管理显示器与应用音频。在 macOS 上控制亮度、显示模式、各应用音量、音频路由和场景。",
      },
      privacy: {
        title: "隐私政策 — Lumadio",
        description: "了解 Lumadio 如何处理设置、诊断信息、权限、购买与支持信息。",
      },
      terms: {
        title: "使用条款 — Lumadio",
        description: "适用于 Lumadio macOS 应用及其网站的使用条款。",
      },
      support: {
        title: "支持 — Lumadio",
        description: "Lumadio 的系统要求、权限帮助、故障排除与联系信息。",
      },
    },
    header: {
      navigation: "Lumadio 导航",
      home: "Lumadio 首页",
      features: "功能",
      pricing: "价格",
      support: "支持",
      download: "下载",
      downloadLabel: "在 Mac App Store 下载 Lumadio",
    },
    footer: {
      tagline: "用一个菜单栏管理显示器与应用音频。",
      product: "产品",
      overview: "概览",
      features: "功能",
      pricing: "价格",
      appStore: "Mac App Store",
      resources: "资源",
      support: "支持",
      github: "GitHub",
      genjux: "Genjux",
      legal: "法律",
      privacy: "隐私",
      terms: "条款",
      copyright: "© 2026 Genjux。保留所有权利。",
      madeFor: "为 macOS 打造",
    },
    mockup: {
      label: "Lumadio 菜单栏界面示意图",
      active: "运行中",
      scene: "场景",
      focus: "专注",
      movie: "观影",
      night: "夜间",
      displays: "显示器",
      connected: "已连接 2 台",
      builtInDisplay: "内建 · Liquid Retina XDR",
      appAudio: "应用音频",
      live: "实时",
      music: "音乐",
      focusScene: "专注场景",
    },
    home: {
      pill: "原生 macOS 菜单栏应用",
      titleLines: ["你的显示器。", "你的应用音频。", "一个菜单栏。"],
      lede: "Lumadio 将你每天常用的控制集中在一个从容、迅速的地方，还能把整套配置保存为场景。",
      download: "前往 Mac App Store 下载",
      explore: "探索功能",
      free: "免费下载",
      system: "macOS 14.2+",
      silicon: "Apple 芯片",
      manifestoEyebrow: "重新构想控制中心",
      manifestoTitle: "不必再到处翻找设置。",
      manifestoAccent: "让整套配置触手可及。",
      featureEyebrow: "日常控制",
      featureTitle: "小小控制。",
      featureAccent: "让 Mac 顺畅许多。",
      featureNote: "需要时 Lumadio 随手可用，其余时间安静退居幕后。",
      features: [
        { title: "显示器控制", text: "无需打开“系统设置”，即可调节亮度、切换分辨率与刷新率，并管理 HiDPI 模式。" },
        { title: "各应用音频", text: "为每个受支持的音频应用设置音量、静音、查看实时电平，并选择输出设备。" },
        { title: "场景", text: "将显示器与音频配置保存在一起。只需一个操作，即可在专注、演示或观影之夜间切换。" },
        { title: "内建快捷操作", text: "使用全局热键、Apple 快捷指令和 lumadio:// URL 方案来控制可见的显示器。" },
        { title: "演示模式", text: "为屏幕共享准备已连接的显示器与音频，结束后再恢复先前的配置。" },
        { title: "实用附加功能", text: "用面部补光为通话增添光线；当 Mac 和显示器支持时，也可使用 XDR 余量。" },
      ],
      scenesEyebrow: "一个操作，整套配置",
      scenesTitle: "场景记得你的工作方式。",
      scenesBody: "亮度、色温、显示模式和应用音频可以一起改变。配置一次，即可从菜单栏、热键或快捷指令中随时恢复。",
      sceneBenefits: ["从容进入夜间工作", "将应用路由到其他输出设备", "标准化或独奏受支持的音频"],
      sceneCards: [
        { title: "观影之夜", detail: "调暗显示器 · 路由音频" },
        { title: "演示", detail: "镜像显示器 · 降低通知音量" },
        { title: "深度专注", detail: "亮度 72% · 音乐音量 24%", ready: "就绪" },
      ],
      privacyEyebrow: "默认保护隐私",
      privacyTitle: "控制与数据留在你的 Mac 上。",
      privacyBody: "Lumadio 在本地存储偏好、场景和设置。它不含广告跟踪器，不录制音频内容，也不会自动上传诊断信息。",
      privacyLink: "阅读隐私政策",
      pricingEyebrow: "简单定价",
      pricingTitle: "免费开始，永久保留 Pro。",
      pricingNote: "没有订阅，没有功能捆绑。一次实惠的终身解锁。",
      pro: "LUMADIO PRO",
      oneTime: "一次性购买",
      lifetime: "通过非消耗型 App 内购买，终身使用 Lumadio Pro。",
      get: "获取 Lumadio",
      includes: "Pro 包含",
      proFeatures: [
        "无限场景与场景快捷操作",
        "各应用路由、独奏、声像与标准化",
        "XDR 增强与面部补光",
        "演示与显示器自动化",
        "高级 Apple 快捷指令操作",
      ],
      priceNote: "价格以 USD 显示。当地 App Store 定价和税费可能有所不同。",
      finalAlt: "Lumadio 应用图标",
      finalEyebrow: "让你的 Mac 和谐一致",
      finalTitle: "一个菜单栏。\n少走弯路。",
    },
    legal: {
      lastUpdated: "最后更新：",
    },
  },
} satisfies Record<SiteLocale, LumadioMessages>;
