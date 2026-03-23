"use client";

import Link from "next/link";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import type { ShopifyProduct } from "@/lib/shopify";

type EventCardProps = {
  event: ShopifyProduct;
};

function formatEventDate(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function buildTeaser(description: string) {
  const trimmed = description.trim();
  if (!trimmed) return "Live Gold Trails field training event details coming soon.";
  return trimmed.length > 170 ? `${trimmed.slice(0, 170).trimEnd()}...` : trimmed;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = formatEventDate(event.eventDate);
  const teaser = buildTeaser(event.description);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Gold Trails Event</p>
        <CardTitle className="text-foreground">{event.title}</CardTitle>
        {formattedDate ? (
          <p className="text-sm font-medium text-primary/90">{formattedDate}</p>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{teaser}</p>
        <div className="mt-auto grid gap-2">
          <ProductPurchaseControls
            product={event}
            className="w-full"
            buttonLabel="Add Event to Cart"
            optionLabel="Event Option"
            onAdded={(selection) =>
              trackEvent("event_reserve_click", {
                event_id: event.id,
                event_title: event.title,
                variant_id: selection.variantId,
                variant_title: selection.variantTitle,
              })
            }
          />
          <Button asChild variant="secondary" className="w-full">
            <Link
              href={`/shop/${event.handle}`}
              className="no-underline"
              onClick={() =>
                trackEvent("product_detail_click", {
                  source: "events-grid",
                  product_id: event.id,
                  product_title: event.title,
                })
              }
            >
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
