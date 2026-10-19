import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { hubBenefits, hubFaq, hubHeroPhoto } from "@/components/events/events-venue-content";
import { EventsNotifyForm } from "@/components/events/events-notify-form";
import { EventsReviewsSection } from "@/components/events/events-reviews-section";
import { EventsUpcomingGrid, EventsUpcomingSkeleton } from "@/components/events/events-upcoming-grid";
import {
  EventBenefitsGrid,
  EventChips,
  EventImmersive,
  EventsFaqSection,
} from "@/components/events/venue-sections";
import { NewHomeFaq } from "@/components/new-home/new-home-faq";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { formatEventDateRange } from "@/lib/events/format";
import { getUpcomingSessions } from "@/lib/events/sessions";
import { eventVenues, getEventStates, GPAA_JOIN_URL, venuePath } from "@/lib/events/venues";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Gold Trails Events — Hands-On Field Training with Kevin Hoagland",
  description:
    "Train in the field with Kevin Hoagland: river prospecting at LDMA Italian Bar, California, and the Metal Detecting Hands-On Masterclass on GPAA claims in Morristown, Arizona.",
  path: "/events",
});

async function EventsLocationCards() {
  const sessions = await getUpcomingSessions();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {eventVenues.map((venue) => {
        const venueSessions = sessions.filter((session) => session.venue.slug === venue.slug);
        const next = venueSessions[0];
        const nextDate = next ? formatEventDateRange(next.event) : null;
        return (
          <article
            key={venue.slug}
            className="flex flex-col overflow-hidden rounded-2xl border border-[#e0d4b3] bg-white shadow-sm"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#e0d4b3]">
              <Image
                src={venue.photos.card.src}
                alt={venue.photos.card.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full border border-primary/40 bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#1a140f] shadow-sm">
                {venue.stateName}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">{venue.programName}</p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1a140f]">
                {venue.shortName}, {venue.stateName}
              </h3>
              <p className="mt-1 text-sm font-medium text-[#6d7760]">{venue.formatLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f]">{venue.summary}</p>
              <p className="mt-4 text-sm text-[#1a140f]">
                {nextDate ? (
                  <>
                    <span className="font-semibold">Next session:</span> {nextDate}
                    {venueSessions.length > 1 ? (
                      <span className="text-[#6d7760]"> · {venueSessions.length} sessions open</span>
                    ) : null}
                  </>
                ) : (
                  <span className="text-[#6d7760]">New dates coming soon</span>
                )}
              </p>
              {venue.membership.kind === "required" ? (
                <p className="mt-1 text-xs font-medium text-[#5a6348]">Active GPAA membership required</p>
              ) : null}
              <Link
                href={venuePath(venue)}
                className={cn(nhGoldButtonClass, "mt-6 self-start px-6 py-2.5 text-sm")}
              >
                Explore {venue.shortName}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function EventsLocationCardsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {eventVenues.map((venue) => (
        <div key={venue.slug} className="h-[28rem] animate-pulse rounded-2xl border border-[#e0d4b3] bg-white/60" />
      ))}
    </div>
  );
}

export default function EventsPage() {
  const states = getEventStates();

  return (
    <div className="bg-[#f7f2e8] text-[#1a140f]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#d0d5c4]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(90,99,72,0.14),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(122,95,20,0.1),transparent_38%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#5a6348]">
              Gold Trails Field Training
            </p>
            <h1 className="mt-3 font-serif text-[1.75rem] font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">
              Train in the field with Kevin Hoagland
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c4f3f] sm:text-lg">
              Hands-on events on real gold ground — river prospecting at LDMA&apos;s Italian Bar in California
              and a metal detecting masterclass on GPAA claims in Arizona.
            </p>
            <EventChips chips={eventVenues.map((venue) => `${venue.stateName} · ${venue.shortName}`)} />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#upcoming-events" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
                View upcoming sessions
              </a>
              <a
                href="#locations"
                className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-8 py-3 text-base font-semibold !text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]"
              >
                Choose a location
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#d0d5c4] shadow-lg lg:aspect-[5/4]">
            <Image
              src={hubHeroPhoto.src}
              alt={hubHeroPhoto.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Locations */}
      <section id="locations" className="scroll-mt-20 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Locations</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Choose where you want to train</h2>
          <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">
            Each location has its own format, venue, and lodging options. More states are on the way.
          </p>
        </div>
        <Suspense fallback={<EventsLocationCardsSkeleton />}>
          <EventsLocationCards />
        </Suspense>
      </section>

      {/* Upcoming sessions */}
      <section
        id="upcoming-events"
        className="scroll-mt-20 border-t border-[#e0d4b3]/60 bg-white py-14 sm:py-20"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Upcoming sessions</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Reserve your spot</h2>
            <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">
              Select a session, choose your event option, and register through secure checkout.
            </p>
          </div>
          <Suspense fallback={<EventsUpcomingSkeleton />}>
            <EventsUpcomingGrid />
          </Suspense>

          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#d0d5c4] bg-[#eef0e8] p-6 sm:p-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              Membership
            </p>
            <h3 className="mt-2 text-center font-serif text-2xl font-semibold text-[#1a140f]">
              GPAA &amp; LDMA membership by location
            </h3>
            <ul className="mx-auto mt-4 max-w-xl space-y-2 text-sm leading-relaxed text-[#5c4f3f]">
              {eventVenues.map((venue) => (
                <li key={venue.slug}>
                  <strong className="text-[#1a140f]">
                    {venue.shortName}, {venue.stateName}:
                  </strong>{" "}
                  {venue.membership.kind === "required"
                    ? "active GPAA membership required to attend."
                    : venue.membership.kind === "discount"
                      ? "open to the public — GPAA and LDMA members may qualify for member pricing."
                      : "open to everyone — no membership required."}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <Link
                href={GPAA_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(nhGoldButtonClass, "px-6 py-3 text-sm")}
              >
                Learn about GPAA membership
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <EventsNotifyForm states={states} />
          </div>
        </div>
      </section>

      <EventBenefitsGrid
        benefits={hubBenefits}
        subtitle="Structured coaching, real ground, and repeatable skills you can take to your next hunt."
      />

      <EventImmersive
        photo={{ src: "/italian-bar/camp-italian-bar.jpg", alt: "Gold Trails field training with Kevin Hoagland" }}
        title="This is not a passive seminar"
        body="You'll be in the dirt — swinging a coil, dialing in ground balance, running pans and sluices, and recovering gold with coaching nearby. Classroom concepts become muscle memory through drills you can take home."
      />

      <Suspense fallback={null}>
        <EventsReviewsSection />
      </Suspense>

      <EventsFaqSection>
        <NewHomeFaq items={[...hubFaq]} />
      </EventsFaqSection>

      {/* Closing CTA */}
      <section className="border-t border-[#e0d4b3]/60 bg-[#f7f2e8] py-14 sm:py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <h2 className="max-w-2xl font-serif text-2xl font-semibold sm:text-3xl">
            New to prospecting? Start with the free masterclass — then train in the field
          </h2>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/masterclass" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
              Get the free book
            </Link>
            <a
              href="#upcoming-events"
              className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-8 py-3 text-base font-semibold !text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]"
            >
              View sessions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
