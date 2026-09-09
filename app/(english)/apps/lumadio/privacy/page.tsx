import { getLumadioMetadata, lumadioViewport, renderLumadioPage } from "@/components/lumadio/pages";

export function generateMetadata() { return getLumadioMetadata("privacy", "en"); }
export const viewport = lumadioViewport;

export default function PrivacyPage() {
  return renderLumadioPage("privacy", "en");
}
