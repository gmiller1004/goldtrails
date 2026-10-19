import { notFound, redirect } from "next/navigation";
import { getEventStates, getVenuesInState, venuePath } from "@/lib/events/venues";

export function generateStaticParams() {
  return getEventStates().map((state) => ({ state: state.slug }));
}

/** State landing. Until a state has more than one venue, send visitors straight to it. */
export default async function EventsStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const venues = getVenuesInState(state);
  if (!venues.length) notFound();
  if (venues.length === 1) redirect(venuePath(venues[0]!));
  redirect(`/events#locations`);
}
