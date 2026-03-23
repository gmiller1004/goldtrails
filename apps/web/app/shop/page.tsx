import { ShopGrid } from "@/components/shop/shop-grid";
import { getDetectors } from "@/lib/shopify";

export default async function ShopPage() {
  const products = await getDetectors();
  const detectors = products.filter((product) => product.tags.includes("metal-detector"));
  const coils = products.filter((product) => product.tags.includes("coil"));
  const fieldGear = products.filter(
    (product) => product.tags.includes("field-gear") || product.tags.includes("detecting-gear"),
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-3 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Gold Trails Shop</p>
        <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          Detectors, Coils & Field Gear
        </h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Build your setup with proven tools Kevin recommends for real-world hunting.
          Add items to your cart here, then complete checkout when you&apos;re ready.
        </p>
      </header>

      <section className="space-y-8">
        <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Detectors</h2>
          <ShopGrid products={detectors} />
        </div>

        <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Coils</h2>
          <ShopGrid products={coils} />
        </div>

        <div className="rounded-2xl bg-muted/30 p-4 sm:p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">Field Gear</h2>
          <ShopGrid products={fieldGear} />
        </div>
      </section>
    </div>
  );
}
