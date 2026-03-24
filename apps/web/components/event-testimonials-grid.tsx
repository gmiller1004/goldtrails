"use client";

import { useMemo, useState } from "react";
import type { EventTestimonial } from "@/lib/judgeme";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type EventTestimonialsGridProps = {
  testimonials: EventTestimonial[];
};

const COLLAPSED_LINE_CLAMP_STYLE = {
  display: "-webkit-box",
  WebkitLineClamp: 5,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
} as const;

export function EventTestimonialsGrid({ testimonials }: EventTestimonialsGridProps) {
  const [expandedById, setExpandedById] = useState<Record<number, boolean>>({});

  const toggle = (id: number) => {
    setExpandedById((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shouldShowToggleById = useMemo(() => {
    const map: Record<number, boolean> = {};
    for (const review of testimonials) {
      map[review.id] = review.body.length > 260;
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
            className={`border-secondary/70 transition-all ${expanded ? "h-auto" : "h-[340px]"}`}
          >
            <CardHeader className="space-y-2 pb-3">
              <p className="text-sm font-medium text-foreground">
                {"★".repeat(review.rating)}
                <span className="ml-2 text-xs text-muted-foreground">({review.rating}/5)</span>
              </p>
              {review.title ? <p className="text-base font-semibold text-foreground">{review.title}</p> : null}
            </CardHeader>
            <CardContent className="flex h-full flex-col space-y-3 text-sm text-muted-foreground">
              <p className="leading-relaxed" style={expanded ? undefined : COLLAPSED_LINE_CLAMP_STYLE}>
                {review.body}
              </p>
              {showToggle ? (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="mt-auto w-fit px-0 text-primary hover:bg-transparent hover:text-primary/80"
                  onClick={() => toggle(review.id)}
                >
                  {expanded ? "Show less" : "Read more"}
                </Button>
              ) : (
                <div className="mt-auto" />
              )}
              <div className="pt-1 text-xs text-muted-foreground/90">
                <p className="font-medium text-foreground/90">{review.reviewerName}</p>
                <p>{review.productTitle}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

