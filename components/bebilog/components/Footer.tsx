import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-white/[0.06] px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Image src="/apps/bebilog/images/app-icon.png" alt="Bebilog" width={24} height={24} className="rounded-md" />
          <span className="text-white/50 text-sm font-semibold">Bebilog</span>
        </div>
        <div className="flex gap-6">
          <a
            href="https://petrguan.github.io/Bebilog-privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 text-sm hover:text-white/50 transition-colors"
          >
            {t("privacy")}
          </a>
          <a
            href="https://petrguan.github.io/Bebilog-privacy-policy/terms-of-service"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 text-sm hover:text-white/50 transition-colors"
          >
            {t("terms")}
          </a>
          <a
            href="mailto:Bebilog@outlook.com"
            className="text-white/30 text-sm hover:text-white/50 transition-colors"
          >
            {t("support")}
          </a>
        </div>
        <div className="text-white/20 text-xs">{t("copyright")}</div>
      </div>
    </footer>
  );
}
