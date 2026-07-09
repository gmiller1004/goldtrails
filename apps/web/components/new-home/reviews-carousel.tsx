"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const reviewCardClassName =
  "flex w-[min(85vw,20rem)] shrink-0 snap-start flex-col rounded-2xl border border-[#e0d4b3] bg-white p-5 shadow-sm sm:w-80";

type ReviewsCarouselProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
};

export function ReviewsCarousel({ children, ariaLabel, className }: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateScrollState();

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    el.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", updateScrollState);
    };
  }, [updateScrollState, children]);

  const scroll = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-review-card]");
    const gap = window.matchMedia("(min-width: 640px)").matches ? 20 : 16;
    const amount = (firstCard?.offsetWidth ?? 320) + gap;

    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        aria-label={`Previous ${ariaLabel}`}
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0d4b3] bg-white text-[#1a140f] shadow-md transition-colors hover:bg-[#efe4cf] disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto overscroll-x-contain px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory touch-pan-x sm:gap-5 sm:px-6 lg:px-14 [&::-webkit-scrollbar]:hidden"
        aria-label={ariaLabel}
        role="region"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label={`Next ${ariaLabel}`}
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e0d4b3] bg-white text-[#1a140f] shadow-md transition-colors hover:bg-[#efe4cf] disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
