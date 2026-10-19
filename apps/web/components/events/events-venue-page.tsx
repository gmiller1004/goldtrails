import Link from "next/link";
import { Suspense } from "react";
import { venueSharedFaq } from "@/components/events/events-venue-content";
import { EventsNotifyForm } from "@/components/events/events-notify-form";
import { EventsReviewsSection } from "@/components/events/events-reviews-section";
import { EventsUpcomingSkeleton, VenueUpcomingGrid } from "@/components/events/events-upcoming-grid";
import {
  EventBenefitsGrid,
  EventChips,
  EventImmersive,
  EventsBreadcrumbs,
  EventsFaqSection,
  FeeDisclosure,
  MembershipCallout,
  VenueHeroImage,
  VenueHighlights,
  VenuePlanTrip,
  VenueSchedule,
  VenueStats,
  VenueStory,
} from "@/components/events/venue-sections";
import { NewHomeFaq } from "@/components/new-home/new-home-faq";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { getEventStates, type EventVenue } from "@/lib/events/venues";
import { cn } from "@/lib/utils";

export function EventsVenuePage({ venue }: { venue: EventVenue }) {
  return (
    <div className="bg-[#f7f2e8] text-[#1a140f]">
      <section className="relative overflow-hidden border-b border-[#d0d5c4]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(90,99,72,0.14),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(122,95,20,0.1),transparent_38%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-20">
          <div>
            <EventsBreadcrumbs
              items={[
                { label: "Events", href: "/events" },
                { label: venue.stateName },
                { label: venue.shortName },
              ]}
            />
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#5a6348]">
              {venue.hero.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-[1.75rem] font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">
              {venue.hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c4f3f] sm:text-lg">{venue.hero.subtitle}</p>
            <EventChips chips={venue.hero.chips} />
            <a href="#upcoming-events" className={cn(nhGoldButtonClass, "mt-7 px-8 py-3 text-base")}>
              View upcoming sessions
            </a>
          </div>
          <VenueHeroImage venue={venue} priority />
        </div>
      </section>

      <VenueStats venue={venue} />
      <VenueStory venue={venue} />
      <VenueHighlights venue={venue} />
      <VenueSchedule venue={venue} />
      <EventBenefitsGrid
        benefits={venue.benefits}
        subtitle="Structured coaching, real ground, and repeatable skills you can take to your next hunt."
      />
      <EventImmersive photo={venue.photos.immersive} title={venue.immersive.title} body={venue.immersive.body} />
      <VenuePlanTrip venue={venue} />

      <section
        id="upcoming-events"
        className="scroll-mt-20 border-t border-[#e0d4b3]/60 bg-white py-14 sm:py-20"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Upcoming sessions</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Reserve your spot in {venue.shortName}
            </h2>
            <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">
              Select a session, choose your event option, and register through secure checkout.
            </p>
          </div>
          <Suspense fallback={<EventsUpcomingSkeleton />}>
            <VenueUpcomingGrid venue={venue} />
          </Suspense>

          <MembershipCallout membership={venue.membership} className="mt-12" />
          <FeeDisclosure venue={venue} className="mx-auto mt-6 max-w-3xl" />

          <div className="mx-auto mt-12 max-w-3xl">
            <EventsNotifyForm
              states={getEventStates()}
              defaultLocations={[venue.stateSlug]}
              venueName={venue.shortName}
            />
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <EventsReviewsSection />
      </Suspense>

      <EventsFaqSection title={`${venue.shortName} event questions`}>
        <NewHomeFaq items={[...venue.faq, ...venueSharedFaq]} />
      </EventsFaqSection>

      <section className="border-t border-[#e0d4b3]/60 bg-[#f7f2e8] py-14 sm:py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <h2 className="max-w-2xl font-serif text-2xl font-semibold sm:text-3xl">
            New to detecting? Start with the free masterclass — then train in the field
          </h2>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/masterclass" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
              Get the free book
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-8 py-3 text-base font-semibold !text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]"
            >
              All Gold Trails locations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
