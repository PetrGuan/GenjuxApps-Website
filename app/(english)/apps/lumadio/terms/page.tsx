import { getLumadioMetadata, lumadioViewport, renderLumadioPage } from "@/components/lumadio/pages";

export function generateMetadata() { return getLumadioMetadata("terms", "en"); }
export const viewport = lumadioViewport;

export default function TermsPage() {
  return renderLumadioPage("terms", "en");
}
