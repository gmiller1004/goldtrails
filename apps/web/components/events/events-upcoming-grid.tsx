import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { EventsSessionsBrowser } from "@/components/events/events-sessions-browser";
import { getUpcomingSessions, getUpcomingSessionsForVenue } from "@/lib/events/sessions";
import { getEventStates, toCardVenue, type EventVenue } from "@/lib/events/venues";

export function EventsUpcomingSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-80 animate-pulse rounded-2xl border border-[#e0d4b3] bg-white/60"
        />
      ))}
    </div>
  );
}

function EmptySessions({ title, body }: { title: string; body: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#e0d4b3] bg-white p-10 text-center">
      <p className="text-lg font-semibold text-[#1a140f]">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-[#5c4f3f]">{body}</p>
    </div>
  );
}

/** All upcoming sessions with a state filter (hub page). */
export async function EventsUpcomingGrid() {
  const sessions = await getUpcomingSessions();

  if (!sessions.length) {
    return (
      <EmptySessions
        title="New sessions are being scheduled"
        body={
          <>
            Kevin&apos;s next field training dates are coming soon. Join the notify list below, or start
            with the{" "}
            <Link href="/masterclass" className="font-semibold !text-[#5a6348]">
              free masterclass
            </Link>{" "}
            while you wait.
          </>
        }
      />
    );
  }

  return (
    <EventsSessionsBrowser
      sessions={sessions.map(({ event, venue }) => ({ event, venue: toCardVenue(venue) }))}
      states={getEventStates()}
    />
  );
}

/** Upcoming sessions at a single venue (location pages). */
export async function VenueUpcomingGrid({ venue }: { venue: EventVenue }) {
  const sessions = await getUpcomingSessionsForVenue(venue.slug);

  if (!sessions.length) {
    return (
      <EmptySessions
        title={`New ${venue.shortName} dates are being scheduled`}
        body={
          <>
            Join the notify list below for early notice, or{" "}
            <Link href="/events#upcoming-events" className="font-semibold !text-[#5a6348]">
              see sessions at other locations
            </Link>
            .
          </>
        }
      />
    );
  }

  const cardVenue = toCardVenue(venue);
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {sessions.map(({ event }) => (
        <EventCard key={event.id} event={event} venue={cardVenue} />
      ))}
    </div>
  );
}
