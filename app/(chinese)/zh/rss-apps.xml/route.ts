import { renderSiteFeed } from "@/lib/site-feeds";
export const dynamic = "force-static";
export async function GET() { return renderSiteFeed("apps", "zh"); }
