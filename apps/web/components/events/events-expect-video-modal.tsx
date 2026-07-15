"use client";

import { Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { KEVIN_EVENTS_YOUTUBE_VIDEO_ID } from "@/components/events/events-venue-content";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { cn } from "@/lib/utils";

type EventsExpectVideoModalProps = {
  className?: string;
};

export function EventsExpectVideoModal({ className }: EventsExpectVideoModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(nhGoldButtonClass, "gap-2 px-6 py-3 text-sm", className)}
      >
        <Play className="h-4 w-4 shrink-0 fill-current" aria-hidden />
        What to expect at Gold Trails events
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a140f]/80 p-4 backdrop-blur-sm sm:p-6"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="events-video-title"
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[#e0d4b3] bg-[#1f1810] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#5c4f3f]/40 px-4 py-3 sm:px-5">
              <p id="events-video-title" className="text-sm font-semibold text-[#f7f2e8] sm:text-base">
                Kevin Hoagland on Gold Trails events
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#c4b59a] transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                title="What to expect at a Gold Trails event with Kevin Hoagland"
                src={`https://www.youtube.com/embed/${KEVIN_EVENTS_YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
