export type StudioRecord = {
  code: string;
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  image?: string;
};

export const studioCapabilities: readonly StudioRecord[] = [
  {
    code: "NATIVE_SYSTEMS",
    title: "Native systems engineering",
    description:
      "Performance-focused foundations for dependable client software.",
    tags: ["C/C++", "Algorithms", "Systems"],
    href: "/contact",
  },
  {
    code: "APPLE_PLATFORMS",
    title: "Apple-platform product development",
    description:
      "Thoughtful iOS, macOS, and watchOS experiences built close to the platform.",
    tags: ["Swift", "SwiftUI", "AppKit"],
    href: "/contact",
  },
  {
    code: "CROSS_PLATFORM",
    title: "Cross-platform architecture",
    description:
      "Shared engineering foundations that keep multi-platform products coherent.",
    tags: ["C++", "iOS", "Android"],
    href: "/contact",
  },
  {
    code: "AI_WORKFLOWS",
    title: "AI-enabled workflows",
    description:
      "Practical AI features that make personal tools calmer and more useful.",
    tags: ["AI/LLM", "On-device AI", "Markdown"],
    href: "/contact",
  },
  {
    code: "PRODUCT_CRAFT",
    title: "Product craft",
    description:
      "Private-by-design tools with clear, polished everyday interactions.",
    tags: ["Privacy", "UX", "Native apps"],
    href: "/contact",
  },
];

export const selectedWork: readonly StudioRecord[] = [
  {
    code: "OUTLOOK_MOBILE",
    title: "Outlook Mobile",
    description:
      "Background experience on the core C++ engine behind cross-platform email, calendar, and search experiences.",
    tags: ["C++", "Objective-C", "iOS", "Android"],
    href: "https://apps.apple.com/us/app/microsoft-outlook/id951937596",
    image: "/studio/outlook.webp",
  },
  {
    code: "BEBILOG",
    title: "Bebilog",
    description:
      "A privacy-first baby tracker for iOS and watchOS, with local data storage and no ads.",
    tags: ["Swift", "SwiftUI", "watchOS"],
    href: "/apps/bebilog",
    image: "/studio/bebilog.webp",
  },
  {
    code: "MARKVERSE",
    title: "MarkVerse",
    description:
      "An AI-native Markdown content runtime for macOS that routes and renders content from everyday sources.",
    tags: ["Swift", "AppKit", "WKWebView", "cmark-gfm"],
    href: "/contact",
  },
  {
    code: "MUYE_FRESH_PET_FOOD",
    title: "MuYe Fresh Pet Food",
    description:
      "A WeChat Mini Program for fresh pet food storefronts, orders, and merchant operations.",
    tags: ["WeChat Mini Program", "E-commerce"],
    href: "/contact",
  },
];

export const studioExperience: readonly StudioRecord[] = [
  {
    code: "NATIVE_CLIENT_ENGINEERING",
    title: "Native client engineering",
    description:
      "Experience behind Genjux: building and maintaining Outlook Mobile with high-performance C++ and cross-platform architecture.",
    tags: ["C++", "Objective-C", "iOS", "Android", "Cross-platform"],
    href: "https://apps.apple.com/us/app/microsoft-outlook/id951937596",
  },
  {
    code: "DATA_SYSTEMS",
    title: "Data systems experience",
    description:
      "Data pipelines and analytics infrastructure, with hands-on work in processing, text retrieval, and search.",
    tags: ["Big Data", "Python", "Search"],
    href: "/contact",
  },
  {
    code: "COMPUTER_SCIENCE_FOUNDATIONS",
    title: "Computer science foundations",
    description:
      "A grounding in computer science fundamentals, algorithms, and systems programming.",
    tags: ["Algorithms", "Systems programming"],
    href: "/contact",
  },
];

export const openSourceContributions: readonly StudioRecord[] = [
  {
    code: "SWIFT_TOOLS_SUPPORT_CORE",
    title: "swift-tools-support-core",
    description:
      "Common infrastructure for Swift Package Manager and llbuild, supporting the Swift build ecosystem.",
    tags: ["Swift", "Build tools"],
    href: "https://github.com/swiftlang/swift-tools-support-core",
  },
  {
    code: "APPCENTER_SDK_APPLE",
    title: "appcenter-sdk-apple",
    description:
      "An Apple-platform SDK for analytics, crash reporting, and beta distribution.",
    tags: ["Objective-C", "iOS", "macOS", "tvOS"],
    href: "https://github.com/microsoft/appcenter-sdk-apple",
  },
  {
    code: "CPP_CLIENT_TELEMETRY",
    title: "cpp_client_telemetry",
    description:
      "Cross-platform C/C++ telemetry collection infrastructure for Apple, Linux, and Windows platforms.",
    tags: ["C", "C++", "Telemetry"],
    href: "https://github.com/microsoft/cpp_client_telemetry",
  },
];
