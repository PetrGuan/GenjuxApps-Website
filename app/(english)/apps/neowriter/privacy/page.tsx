import { getNeoWriterMetadata, renderNeoWriterPage } from "@/components/neowriter/pages";

export function generateMetadata() {
  return getNeoWriterMetadata("privacy", "en");
}

export default function PrivacyPage() {
  return renderNeoWriterPage("privacy", "en");
}
