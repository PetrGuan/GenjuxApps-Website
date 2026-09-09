import BebilogSite from "@/components/bebilog/BebilogSite";
import { getBebilogMetadata, bebilogViewport } from "@/components/bebilog/metadata";

export function generateMetadata() { return getBebilogMetadata("en"); }
export const viewport = bebilogViewport;

export default function BebilogDefaultPage() {
  return <BebilogSite locale="en" />;
}
