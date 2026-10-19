import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventsVenuePage } from "@/components/events/events-venue-page";
import { eventVenues, getVenue, venuePath } from "@/lib/events/venues";
import { pageMetadata } from "@/lib/site";

type Params = Promise<{ state: string; venue: string }>;

export function generateStaticParams() {
  return eventVenues.map((venue) => ({ state: venue.stateSlug, venue: venue.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { state, venue: venueSlug } = await params;
  const venue = getVenue(state, venueSlug);
  if (!venue) return { title: "Events" };
  return pageMetadata({
    title: `${venue.programName} — ${venue.shortName}, ${venue.stateName}`,
    description: venue.summary,
    path: venuePath(venue),
  });
}

export default async function VenuePage({ params }: { params: Params }) {
  const { state, venue: venueSlug } = await params;
  const venue = getVenue(state, venueSlug);
  if (!venue) notFound();
  return <EventsVenuePage venue={venue} />;
}
