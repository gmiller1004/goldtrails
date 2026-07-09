"use client";

import Link from "next/link";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import type { ShopifyProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type EventCardProps = {
  event: ShopifyProduct;
  compact?: boolean;
};

function formatDate(value?: string | null) {
  if (!value) return null;
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  let parsed: Date;
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    parsed = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    parsed = new Date(value);
  }
  if (Number.isNaN(parsed.getTime())) return value;
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

function buildTeaser(description: string, maxLength = 170) {
  const trimmed = description.trim();
  if (!trimmed) return "Live Gold Trails field training event details coming soon.";
  return trimmed.length > maxLength ? `${trimmed.slice(0, maxLength).trimEnd()}...` : trimmed;
}

export function EventCard({ event, compact = false }: EventCardProps) {
  const formattedDate = formatDateRange(event.eventStartDate, event.eventEndDate, event.eventDate);
  const teaser = buildTeaser(event.description, compact ? 90 : 170);
  const includesCamp = event.eventLocation?.toLowerCase().includes("camp") ?? false;

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {event.image ? (
        <div
          className={cn(
            "relative w-full overflow-hidden border-b border-secondary/60 bg-muted/20",
            compact ? "aspect-[4/3]" : "aspect-[16/9]",
          )}
        >
          {includesCamp ? (
            <span
              className={cn(
                "absolute left-2 top-2 z-10 inline-flex items-center rounded-full border border-primary/40 bg-white/95 font-semibold uppercase tracking-[0.08em] text-foreground shadow-sm",
                compact ? "px-2 py-0.5 text-[10px]" : "left-3 top-3 px-2.5 py-1 text-[11px]",
              )}
            >
              Dry Campsite Included
            </span>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <CardHeader className={cn("space-y-2", compact && "space-y-1.5 p-4 pb-2")}>
        <p className={cn("uppercase tracking-[0.18em] text-primary", compact ? "text-[10px]" : "text-xs")}>
          Gold Trails Event
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
