import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop/shop-grid";
import { getDetectors } from "@/lib/shopify";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Shop Metal Detectors & Field Gear",
  description:
    "Gold detectors, coin & relic machines, and field gear curated by Kevin Hoagland. Add to cart and check out securely via Shopify.",
  path: "/shop",
});

export default async function ShopPage() {
  const products = await getDetectors();
  const metalDetectors = products.filter((product) => product.tags.includes("metal-detector"));
  const goldDetectors = metalDetectors.filter((product) => product.tags.includes("gold-detector"));
  const coinRelicDetectors = metalDetectors.filter((product) => !product.tags.includes("gold-detector"));
  const fieldGear = products.filter(
    (product) => product.tags.includes("field-gear") || product.tags.includes("detecting-gear"),
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Gold Trails Shop</p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Detectors & Field Gear
        </h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Build your setup with proven tools Kevin recommends for real-world hunting.
          Add items to your cart here, then complete checkout when you&apos;re ready.
        </p>
      </header>

      <section className="space-y-8">
        <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Gold Detectors</h2>
          <ShopGrid products={goldDetectors} />
        </div>

        <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Coin &amp; Relic Detectors</h2>
          <ShopGrid products={coinRelicDetectors} />
        </div>

        <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Field Gear</h2>
          <ShopGrid products={fieldGear} />
        </div>
      </section>
    </div>
  );
}
