"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/event-card";
import { trackEvent } from "@/lib/analytics";
import type { EventCardVenue } from "@/lib/events/venues";
import type { ShopifyProduct } from "@/lib/shopify";
import { cn } from "@/lib/utils";

type BrowserSession = { event: ShopifyProduct; venue: EventCardVenue };

type EventsSessionsBrowserProps = {
  sessions: BrowserSession[];
  states: Array<{ slug: string; name: string }>;
};

const ALL = "all";

export function EventsSessionsBrowser({ sessions, states }: EventsSessionsBrowserProps) {
  const [activeState, setActiveState] = useState<string>(ALL);

  const statesWithSessions = useMemo(
    () => states.filter((state) => sessions.some(({ venue }) => venue.stateSlug === state.slug)),
    [sessions, states],
  );

  const visible =
    activeState === ALL ? sessions : sessions.filter(({ venue }) => venue.stateSlug === activeState);

  return (
    <div>
      {statesWithSessions.length > 1 ? (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter sessions by state">
          {[{ slug: ALL, name: "All locations" }, ...statesWithSessions].map((state) => {
            const active = state.slug === activeState;
            return (
              <button
                key={state.slug}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setActiveState(state.slug);
                  trackEvent("events_state_filter", { state: state.slug });
                }}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                  active
                    ? "border-[#5a6348] bg-[#5a6348] text-white"
                    : "border-[#d0d5c4] bg-white text-[#1a140f] hover:bg-[#eef0e8]",
                )}
              >
                {state.name}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map(({ event, venue }) => (
          <EventCard key={event.id} event={event} venue={venue} />
        ))}
      </div>
    </div>
  );
}
