"use client";

import { toast } from "sonner";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import type { ShopifyProduct } from "@/lib/shopify";

type AddToCartButtonProps = {
  product: ShopifyProduct;
  className?: string;
  selectedVariantId?: string | null;
  selectedVariantTitle?: string | null;
  selectedPrice?: string | null;
  label?: string;
  onAdded?: (selection: { variantId: string; variantTitle: string; price: string }) => void;
};

export function AddToCartButton({
  product,
  className,
  selectedVariantId,
  selectedVariantTitle,
  selectedPrice,
  label,
  onAdded,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const variantId = selectedVariantId ?? product.variantId;
  const price = selectedPrice ?? product.price;
  const [currency, amount] = price.split(" ");
  const variantTitle = selectedVariantTitle ?? product.variantTitle ?? null;
  const selectedVariant = product.variants.find((variant) => variant.id === variantId) ?? null;
  const isAvailable = selectedVariant ? selectedVariant.availableForSale : product.availableForSale;

  return (
    <Button
      className={className}
      disabled={!variantId || !isAvailable}
      onClick={() => {
        if (!variantId || !isAvailable) return;
        addItem(product, {
          variantId,
          variantTitle: variantTitle ?? undefined,
          price,
        });
        trackEvent("add_to_cart", {
          product_id: product.id,
          product_handle: product.handle,
          product_title: product.title,
          variant_id: variantId,
          variant_title: variantTitle ?? "Default Title",
          currency: currency || "USD",
          value: Number(amount || 0),
        });
        onAdded?.({
          variantId,
          variantTitle: variantTitle ?? "Default Title",
          price,
        });
        toast.success(`${product.title} added to cart`, {
          className: "border border-primary/40 bg-white text-foreground",
        });
      }}
    >
      {variantId && isAvailable ? (label ?? "Add to Cart") : "Unavailable"}
    </Button>
  );
}
