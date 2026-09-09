import { getLumadioMetadata, lumadioViewport, renderLumadioPage } from "@/components/lumadio/pages";

export function generateMetadata() { return getLumadioMetadata("support", "en"); }
export const viewport = lumadioViewport;

export default function SupportPage() {
  return renderLumadioPage("support", "en");
}
