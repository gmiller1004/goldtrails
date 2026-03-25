"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

type MetaPixelProductViewProps = {
  productId: string;
  title: string;
  handle: string;
  price: string;
};

function parsePrice(price: string) {
  const [currency, amount] = price.split(" ");
  return {
    currency: currency || "USD",
    value: Number(amount || 0),
  };
}

export function MetaPixelProductView({ productId, title, handle, price }: MetaPixelProductViewProps) {
  useEffect(() => {
    const parsed = parsePrice(price);
    trackMetaEvent("ViewContent", {
      content_type: "product",
      content_ids: [productId].join(","),
      content_name: title,
      content_category: "shop",
      product_handle: handle,
      currency: parsed.currency,
      value: parsed.value,
    });
  }, [productId, title, handle, price]);

  return null;
}
