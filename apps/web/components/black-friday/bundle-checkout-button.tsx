"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { navigateToShopifyCheckout } from "@/lib/navigate-to-shopify-checkout";
import { cn } from "@/lib/utils";
import type { ShopifyProduct } from "@/lib/shopify";

type BundleCheckoutButtonProps = {
  product: ShopifyProduct;
  className?: string;
  label?: string;
};

export function BundleCheckoutButton({
  product,
  className,
  label = "Claim the Black Friday bundle — $800",
}: BundleCheckoutButtonProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const variantId = product.variantId ?? product.variants[0]?.id ?? null;
  const available = product.availableForSale && Boolean(variantId);
  const [currency, amount] = product.price.split(" ");

  const checkout = async () => {
    if (!variantId || !available) return;
    trackEvent("checkout_click", {
      product_id: product.id,
      product_handle: product.handle,
      product_title: product.title,
      variant_id: variantId,
      value: Number(amount || 800),
      currency: currency || "USD",
      source: "black_friday_landing",
    });
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/cart/checkout-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ variantId, quantity: 1 }],
        }),
      });
      if (!response.ok) throw new Error("Checkout URL failed");
      const payload = (await response.json()) as { checkoutUrl?: string };
      if (!payload.checkoutUrl) throw new Error("Missing checkout URL");
      trackEvent("begin_checkout", {
        product_handle: product.handle,
        num_items: 1,
        value: Number(amount || 800),
        currency: currency || "USD",
        source: "black_friday_landing",
      });
      navigateToShopifyCheckout(payload.checkoutUrl);
    } catch {
      toast.error("Could not start checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <Button
      className={cn("font-semibold", className)}
      disabled={!available || isCheckingOut}
      onClick={checkout}
    >
      {!available
        ? "Currently unavailable"
        : isCheckingOut
          ? "Redirecting to checkout…"
          : label}
    </Button>
  );
}
