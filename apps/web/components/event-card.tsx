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

function formatDate(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
}

function formatDateRange(start?: string | null, end?: string | null, fallback?: string | null) {
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);
  if (startFormatted && endFormatted) return `${startFormatted} - ${endFormatted}`;
  if (startFormatted) return startFormatted;
  if (endFormatted) return endFormatted;
  return formatDate(fallback);
}

function buildTeaser(description: string) {
  const trimmed = description.trim();
  if (!trimmed) return "Live Gold Trails field training event details coming soon.";
  return trimmed.length > 170 ? `${trimmed.slice(0, 170).trimEnd()}...` : trimmed;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = formatDateRange(event.eventStartDate, event.eventEndDate, event.eventDate);
  const teaser = buildTeaser(event.description);

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {event.image ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-secondary/60 bg-muted/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <CardHeader className="space-y-2">
        <p className="text-xs uppercase tracking-[0.18em] text-primary">Gold Trails Event</p>
        <CardTitle className="text-foreground">{event.title}</CardTitle>
        <div className="flex flex-wrap gap-2">
          {formattedDate ? (
            <span className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-xs font-medium text-foreground">
              {formattedDate}
            </span>
          ) : null}
          {event.eventLocation ? (
            <span className="inline-flex items-center rounded-full border border-secondary bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
              {event.eventLocation}
            </span>
          ) : null}
        </div>
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
