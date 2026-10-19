import { getEvents, type ShopifyProduct } from "@/lib/shopify";
import { resolveEventVenue, type EventVenue } from "@/lib/events/venues";

export type EventSession = {
  event: ShopifyProduct;
  venue: EventVenue;
};

function calendarDateInTimeZone(date: Date, timeZone: string): string {
  // en-CA formats as YYYY-MM-DD, which compares correctly as a string.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** Last calendar day of the session (YYYY-MM-DD in the venue's time zone), or null when undated. */
function sessionLastDay(event: ShopifyProduct, timeZone: string): string | null {
  const raw = (event.eventEndDate ?? event.eventStartDate ?? event.eventDate)?.trim();
  if (!raw) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const parsed = Date.parse(raw);
  if (Number.isNaN(parsed)) return null;
  return calendarDateInTimeZone(new Date(parsed), timeZone);
}

/** A session is past once its final day has ended in the venue's local time. Undated sessions stay visible. */
export function isSessionPast(event: ShopifyProduct, venue: EventVenue, now = new Date()): boolean {
  const lastDay = sessionLastDay(event, venue.timeZone);
  if (!lastDay) return false;
  return lastDay < calendarDateInTimeZone(now, venue.timeZone);
}

export function toSession(event: ShopifyProduct): EventSession {
  return { event, venue: resolveEventVenue(event) };
}

/** Upcoming sessions across all venues, soonest first. */
export async function getUpcomingSessions(): Promise<EventSession[]> {
  const events = await getEvents();
  const now = new Date();
  return events.map(toSession).filter(({ event, venue }) => !isSessionPast(event, venue, now));
}

export async function getUpcomingSessionsForVenue(venueSlug: string): Promise<EventSession[]> {
  const sessions = await getUpcomingSessions();
  return sessions.filter(({ venue }) => venue.slug === venueSlug);
}
