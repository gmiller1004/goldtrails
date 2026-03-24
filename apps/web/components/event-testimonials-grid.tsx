"use client";

import { useMemo, useState } from "react";
import type { EventTestimonial } from "@/lib/judgeme";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type EventTestimonialsGridProps = {
  testimonials: EventTestimonial[];
};

/** ~5 lines of body — “Read more” when longer */
const READ_MORE_THRESHOLD = 240;

const COLLAPSED_CLAMP_STYLE = {
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

export function EventTestimonialsGrid({ testimonials }: EventTestimonialsGridProps) {
  const [expandedById, setExpandedById] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpandedById((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shouldShowToggleById = useMemo(() => {
    const map: Record<number, boolean> = {};
    for (const review of testimonials) {
      map[review.id] = review.body.length > READ_MORE_THRESHOLD;
    }
    return map;
  }, [testimonials]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((review) => {
        const expanded = Boolean(expandedById[review.id]);
        const showToggle = shouldShowToggleById[review.id];

        return (
          <Card
            key={review.id}
            className={`flex h-full min-h-[320px] flex-col border-secondary/70 shadow-sm transition-shadow ${
              !expanded ? "overflow-hidden" : ""
            }`}
          >
            <CardHeader className="shrink-0 space-y-2 pb-2">
              <p className="text-sm font-medium text-foreground">
                {"★".repeat(review.rating)}
                <span className="ml-2 text-xs text-muted-foreground">({review.rating}/5)</span>
              </p>
              {review.title ? (
                <p className="text-base font-semibold leading-snug text-foreground">{review.title}</p>
              ) : null}
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-3 p-6 pt-0 pb-5 text-sm text-muted-foreground">
              <div className="min-h-0 flex-1">
                <p
                  className="leading-relaxed"
                  style={!expanded && showToggle ? COLLAPSED_CLAMP_STYLE : undefined}
                >
                  {review.body}
                </p>
              </div>

              {showToggle ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-8 shrink-0 self-start px-0 text-primary no-underline hover:bg-transparent hover:text-primary/80"
                  onClick={() => toggle(review.id)}
                >
                  {expanded ? "Show less" : "Read more"}
                </Button>
              ) : null}

              <div className="shrink-0 border-t border-secondary/60 pt-3 text-xs text-muted-foreground/90">
                <p className="font-medium text-foreground/90">{review.reviewerName}</p>
                <p className="leading-snug">{review.productTitle}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
