import Link from "next/link";
import { EventCard } from "@/components/event-card";
import { getEvents } from "@/lib/shopify";

export function NewHomeEventsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-72 animate-pulse rounded-2xl border border-[#e0d4b3] bg-white/60"
        />
      ))}
    </div>
  );
}

export async function NewHomeEvents() {
  const events = (await getEvents()).slice(0, 4);

  if (!events.length) {
    return (
      <p className="rounded-2xl border border-dashed border-[#e0d4b3] bg-white p-8 text-center text-sm text-[#5c4f3f]">
        New field events are being scheduled. Check back soon or visit the{" "}
        <Link href="/events" className="font-semibold text-[#5a6348]">
          events page
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} compact />
      ))}
    </div>
  );
}
