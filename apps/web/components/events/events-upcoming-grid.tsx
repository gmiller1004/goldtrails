import { EventCard } from "@/components/event-card";
import { getEvents } from "@/lib/shopify";

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

export async function EventsUpcomingGrid() {
  const events = await getEvents();

  if (!events.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#e0d4b3] bg-white p-10 text-center">
        <p className="text-lg font-semibold text-[#1a140f]">New sessions are being scheduled</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#5c4f3f]">
          Kevin&apos;s next Italian Bar training dates are coming soon. Start with the free masterclass
          while you wait.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
