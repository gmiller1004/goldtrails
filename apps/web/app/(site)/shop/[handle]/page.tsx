import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MetaPixelProductView } from "@/components/analytics/meta-pixel-product-view";
import { EventProductPage } from "@/components/events/event-product-page";
import { ProductDescription } from "@/components/shop/product-description";
import { ProductImageGallery } from "@/components/shop/product-image-gallery";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { getShopProductByHandle } from "@/lib/shopify";
import { pageMetadata } from "@/lib/site";

function metaDescription(description: string, title: string): string {
  const cleaned = description.replace(/\s+/g, " ").trim();
  const max = 160;
  if (cleaned.length > max) return `${cleaned.slice(0, max - 1).trimEnd()}…`;
  if (cleaned.length > 0) return cleaned;
  return `${title} – Gold Trails shop.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getShopProductByHandle(handle);
  if (!product) {
    return { title: "Product" };
  }
  return pageMetadata({
    title: product.title,
    description: metaDescription(product.description, product.title),
    path: `/shop/${handle}`,
  });
}

export default async function ShopProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getShopProductByHandle(handle);
  if (!product) notFound();

  const isEvent = product.tags.includes("gold-trails-event");
  if (isEvent) {
    return <EventProductPage product={product} />;
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <MetaPixelProductView
        productId={product.id}
        title={product.title}
        handle={product.handle}
        price={product.price}
      />
      <section className="rounded-2xl border border-secondary bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
          <ProductImageGallery
            title={product.title}
            images={product.images.length ? product.images : product.image ? [product.image] : []}
          />

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">Shop Detail</p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{product.title}</h1>
            <ProductDescription html={product.descriptionHtml} plain={product.description} />

            <div className="flex flex-wrap gap-3">
              <div className="w-full sm:w-auto sm:min-w-[280px]">
                <ProductPurchaseControls product={product} className="w-full" />
              </div>
              <Link href="/cart" className="inline-flex items-center text-sm font-medium no-underline">
                Go to cart
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
