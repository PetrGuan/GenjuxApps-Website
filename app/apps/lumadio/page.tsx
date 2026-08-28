import type { Metadata } from "next";
import { LumadioHome } from "@/components/lumadio/lumadio-site";

export const metadata: Metadata = {
  title: "Lumadio — Displays and App Audio, Together",
  description: "One menu bar for your displays and app audio. Control brightness, display modes, per-app volume, routing, and scenes on macOS.",
};

export default function LumadioPage() {
  return <LumadioHome />;
}
