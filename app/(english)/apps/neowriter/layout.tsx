import type { ReactNode } from "react";
import { neoWriterViewport } from "@/components/neowriter/pages";

export const viewport = neoWriterViewport;

export default function NeoWriterLayout({ children }: { children: ReactNode }) {
  return children;
}
