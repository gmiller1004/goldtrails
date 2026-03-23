"use client";

import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import type { ShopifyProduct } from "@/lib/shopify";

type ProductPurchaseControlsProps = {
  product: ShopifyProduct;
  className?: string;
  buttonLabel?: string;
  optionLabel?: string;
  onAdded?: (selection: { variantId: string; variantTitle: string; price: string }) => void;
};

export function ProductPurchaseControls({
  product,
  className,
  buttonLabel,
  optionLabel,
  onAdded,
}: ProductPurchaseControlsProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variantId ?? product.variants[0]?.id ?? "",
  );
  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId) ?? null,
    [product.variants, selectedVariantId],
  );

  return (
    <div className="grid gap-2">
      {product.variants.length > 1 ? (
        <div className="space-y-1.5">
          <label htmlFor={`variant-${product.id}`} className="text-xs font-medium text-foreground">
            {optionLabel ?? "Option"}
          </label>
          <select
            id={`variant-${product.id}`}
            className="h-10 w-full rounded-md border border-input bg-white px-3 text-sm text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
          >
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id} disabled={!variant.availableForSale}>
                {variant.title} - {variant.price}{variant.availableForSale ? "" : " (Sold out)"}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <p className="text-sm font-semibold text-foreground">{selectedVariant?.price ?? product.price}</p>
      <AddToCartButton
        product={product}
        className={className}
        selectedVariantId={selectedVariantId}
        selectedVariantTitle={selectedVariant?.title ?? product.variantTitle ?? null}
        selectedPrice={selectedVariant?.price ?? product.price}
        label={buttonLabel}
        onAdded={onAdded}
      />
    </div>
  );
}
