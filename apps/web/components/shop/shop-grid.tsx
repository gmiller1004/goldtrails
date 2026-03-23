"use client";

import Link from "next/link";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ShopifyProduct } from "@/lib/shopify";

type ShopGridProps = {
  products: ShopifyProduct[];
};

function teaser(text: string) {
  const cleaned = text.trim();
  if (!cleaned) return "Field-tested gear for serious detectorists.";
  return cleaned.length > 140 ? `${cleaned.slice(0, 140).trimEnd()}...` : cleaned;
}

export function ShopGrid({ products }: ShopGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-xl border border-secondary bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-foreground">Shop inventory is updating. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="flex h-full flex-col">
          <CardHeader className="space-y-3">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.title}
                className="h-56 w-full rounded-lg border border-secondary/60 object-cover"
              />
            ) : null}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Kevin&apos;s Gear Picks</p>
              <CardTitle className="mt-1 text-foreground">
                <Link href={`/shop/${product.handle}`} className="no-underline">
                  {product.title}
                </Link>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <p className="text-sm text-muted-foreground">{teaser(product.description)}</p>
            <div className="mt-auto grid gap-2">
              <ProductPurchaseControls product={product} className="w-full" />
              <Button asChild variant="secondary" className="w-full">
                <Link
                  href={`/shop/${product.handle}`}
                  className="no-underline"
                  onClick={() =>
                    trackEvent("product_detail_click", {
                      source: "shop-grid",
                      product_id: product.id,
                      product_title: product.title,
                    })
                  }
                >
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
