import { getLumadioMetadata, lumadioViewport, renderLumadioPage } from "@/components/lumadio/pages";

export function generateMetadata() { return getLumadioMetadata("home", "en"); }
export const viewport = lumadioViewport;

export default function LumadioPage() {
  return renderLumadioPage("home", "en");
}
