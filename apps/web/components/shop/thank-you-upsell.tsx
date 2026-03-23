"use client";

import Link from "next/link";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import type { ShopifyProduct } from "@/lib/shopify";

export function ThankYouUpsell({ products }: { products: ShopifyProduct[] }) {
  if (!products.length) return null;

  return (
    <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Top Picks For Beginners</p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Build Your Starter Setup</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="flex h-full flex-col">
            <CardHeader className="space-y-2">
              <CardTitle className="text-base text-foreground">
                <Link
                  href={`/shop/${product.handle}`}
                  className="no-underline"
                  onClick={() =>
                    trackEvent("product_detail_click", {
                      source: "thank-you-upsell",
                      product_id: product.id,
                      product_title: product.title,
                    })
                  }
                >
                  {product.title}
                </Link>
              </CardTitle>
              <p className="text-sm font-semibold text-foreground">{product.price}</p>
            </CardHeader>
            <CardContent className="mt-auto">
              <AddToCartButton product={product} className="w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
