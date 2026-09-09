import ProductCard from "@/components/product-card";
import { products } from "@/lib/products";
import { catalogT } from "@/i18n/catalog";
import type { SiteLocale } from "@/i18n/routing.mjs";
import styles from "@/app/(english)/(catalog)/catalog.module.css";

export default function ProductMatrix({ locale = "en" }: { locale?: SiteLocale }) {
  return (
    <section id="products" aria-labelledby="products-title">
      <h2 id="products-title" className={styles.srOnly}>{catalogT(locale)("common.allApps")}</h2>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div className={styles.productEntry} data-product={product.slug} id={product.slug} key={product.slug}>
            <ProductCard product={product} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}
