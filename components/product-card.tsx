import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { categoryLabel, localizeProduct, platformLabel } from "@/lib/localized-products";
import { catalogT } from "@/i18n/catalog";
import type { SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

type ProductCardProps = {
  index?: number;
  product: Product;
  locale?: SiteLocale;
};

export default function ProductCard({ product: source, locale = "en" }: ProductCardProps) {
  const product = localizeProduct(source, locale);
  return (
    <a href={product.route} className={styles.productCard} aria-label={catalogT(locale)("common.discover", { name: product.name })}>
      <Image src={product.assets.icon} alt="" width={88} height={88} className={styles.productIcon} />
      <div className={styles.productCopy}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        <p className={styles.productTagline}>{product.tagline}</p>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${styles.platformBadge}`}>{platformLabel(product.platform, locale)}</span>
          <span className={styles.badge}>{categoryLabel(product.category, locale)}</span>
        </div>
      </div>
      <ArrowUpRight size={17} className={styles.cardArrow} aria-hidden="true" />
    </a>
  );
}
