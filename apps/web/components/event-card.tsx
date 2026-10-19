"use client";

import Link from "next/link";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { formatEventDateRange } from "@/lib/events/format";
import type { EventCardVenue } from "@/lib/events/venues";
import type { ShopifyProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type EventCardProps = {
  event: ShopifyProduct;
  venue?: EventCardVenue;
  compact?: boolean;
};

function buildTeaser(description: string, maxLength = 170) {
  const trimmed = description.trim();
  if (!trimmed) return "Live Gold Trails field training event details coming soon.";
  return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength).trimEnd()}...` : trimmed;
}

export function EventCard({ event, venue, compact = false }: EventCardProps) {
  const formattedDate = formatEventDateRange(event);
  const teaser = buildTeaser(event.description, compact ? 90 : 170);
  const badge = venue?.cardBadge;

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {event.image ? (
        <div
          className={cn(
            "relative w-full overflow-hidden border-b border-secondary/60 bg-muted/20",
            compact ? "aspect-[4/3]" : "aspect-[16/9]",
          )}
        >
          {badge ? (
            <span
              className={cn(
                "absolute left-2 top-2 z-10 inline-flex items-center rounded-full border border-primary/40 bg-white/95 font-semibold uppercase tracking-[0.08em] text-foreground shadow-sm",
                compact ? "px-2 py-0.5 text-[10px]" : "left-3 top-3 px-2.5 py-1 text-[11px]",
              )}
            >
              {badge}
            </span>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <CardHeader className={cn("space-y-2", compact && "space-y-1.5 p-4 pb-2")}>
        <p className={cn("uppercase tracking-[0.18em] text-primary", compact ? "text-[10px]" : "text-xs")}>
          {venue ? `${venue.stateName} · ${venue.shortName}` : "Gold Trails Event"}
        </p>
        <CardTitle className={cn("text-foreground", compact && "text-base leading-snug")}>{event.title}</CardTitle>
        <div className="flex flex-wrap gap-1.5">
          {formattedDate ? (
            <span
              className={cn(
                "inline-flex items-center rounded-full border border-primary/35 bg-primary/10 font-medium text-foreground",
                compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
              )}
            >
              {formattedDate}
            </span>
          ) : null}
          {event.eventLocation ? (
            <span
              className={cn(
                "inline-flex items-center rounded-full border border-secondary bg-muted font-medium text-foreground",
                compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
              )}
            >
              {event.eventLocation}
            </span>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className={cn("flex flex-1 flex-col gap-4", compact && "gap-3 p-4 pt-0")}>
        <p
          className={cn(
            "leading-relaxed text-muted-foreground",
            compact ? "line-clamp-3 text-xs" : "text-sm",
          )}
        >
          {teaser}
        </p>
        {venue?.membershipRequired || venue?.gearNote ? (
          <ul className={cn("space-y-0.5 font-medium text-[#5a6348]", compact ? "text-[11px]" : "text-xs")}>
            {venue.membershipRequired ? <li>Active GPAA membership required</li> : null}
            {venue.gearNote ? <li>{venue.gearNote}</li> : null}
          </ul>
        ) : null}
        <div className="mt-auto grid gap-2">
          <ProductPurchaseControls
            product={event}
            className={cn("w-full", compact && "h-9 text-xs")}
            buttonLabel={compact ? "Add to cart" : "Add Event to Cart"}
            optionLabel={compact ? "Option" : "Event Option"}
            onAdded={(selection) =>
              trackEvent("event_reserve_click", {
                event_id: event.id,
                event_title: event.title,
                variant_id: selection.variantId,
                variant_title: selection.variantTitle,
              })
            }
          />
          <Button asChild variant="secondary" className="w-full" size={compact ? "sm" : "default"}>
            <Link
              href={`/shop/${event.handle}`}
              className="no-underline"
              onClick={() =>
                trackEvent("product_detail_click", {
                  source: "events-grid",
                  product_id: event.id,
                  product_title: event.title,
                  venue: venue?.slug ?? "unknown",
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
