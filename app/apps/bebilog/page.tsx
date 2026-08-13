import BebilogSite from "@/components/bebilog/BebilogSite";

export const metadata = {
  title: "Bebilog — Baby Tracking, Simplified",
  description: "Track feeding, sleep, growth, vaccines, and more — all in one beautifully designed app.",
};

export default function BebilogDefaultPage() {
  return <BebilogSite locale="en" />;
}
