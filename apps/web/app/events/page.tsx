import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  eventBenefits,
  eventsFaq,
  italianBarPhotos,
  italianBarStats,
  ITALIAN_BAR_ADDRESS,
  ITALIAN_BAR_MAPS_URL,
  LDMA_ITALIAN_BAR_URL,
  nearbyLodging,
  nearbyPlaces,
} from "@/components/events/events-venue-content";
import { EventsExpectVideoModal } from "@/components/events/events-expect-video-modal";
import { EventsReviewsSection } from "@/components/events/events-reviews-section";
import { EventsUpcomingGrid, EventsUpcomingSkeleton } from "@/components/events/events-upcoming-grid";
import { NewHomeFaq } from "@/components/new-home/new-home-faq";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Gold Trails Events at Italian Bar, California",
  description:
    "Hands-on gold prospecting training with Kevin Hoagland at LDMA Italian Bar — panning, sluicing, highbanking, metal detecting, dry campsites, and real Mother Lode ground.",
  path: "/events",
});

export default function EventsPage() {
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
              Train at Italian Bar with Kevin Hoagland
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5c4f3f] sm:text-lg">
              Hands-on prospecting at LDMA&apos;s original river camp — panning, sluicing, highbanking,
              metal detecting, and field coaching on historic gold rush ground.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-[#d0d5c4] bg-white/80 px-3 py-1 text-xs font-medium text-[#1a140f] sm:text-sm">
                Columbia, California
              </span>
              <span className="inline-flex items-center rounded-full border border-[#d0d5c4] bg-white/80 px-3 py-1 text-xs font-medium text-[#1a140f] sm:text-sm">
                LDMA Italian Bar
              </span>
              <span className="inline-flex items-center rounded-full border border-[#d0d5c4] bg-white/80 px-3 py-1 text-xs font-medium text-[#1a140f] sm:text-sm">
                Pan · Sluice · Detect
              </span>
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-[#1a140f] sm:text-sm">
                Dry campsite included
              </span>
            </div>
            <a href="#upcoming-events" className={cn(nhGoldButtonClass, "mt-7 px-8 py-3 text-base")}>
              View upcoming sessions
            </a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#d0d5c4] shadow-lg lg:aspect-[5/4]">
            <Image
              src={italianBarPhotos.hero.src}
              alt={italianBarPhotos.hero.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a140f]/50 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white drop-shadow">
              South Fork Stanislaus River · Mother Lode gold country
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#4a5640]/30 bg-[#5a6348] py-5">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6">
          {italianBarStats.map((stat) => (
            <li key={stat.label} className="text-center">
              <p className="font-serif text-2xl font-semibold text-[#f7f2e8] sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#c4b59a] sm:text-sm">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Venue story */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">The venue</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Italian Bar — where LDMA began
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              The very first LDMA camp, built from the ground up in the 1970s on an 1850s gold rush site
              along the South Fork of the Stanislaus River. For decades, Italian Bar has been a destination
              for prospecting, camaraderie, and learning at the river.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Gold Trails events use this real claim ground — not a classroom simulation. Depending on
              the session, you may pan and sluice the Stanislaus, run a highbanker, and work targets with
              a detector — with river access, camp amenities, and field time built in.
            </p>
            <Link
              href={LDMA_ITALIAN_BAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold !text-[#5a6348] no-underline hover:!text-[#3d4535]"
            >
              Explore Italian Bar on LDMA →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {italianBarPhotos.gallery.map((photo) => (
              <div
                key={photo.src}
                className="overflow-hidden rounded-xl border border-[#e0d4b3] bg-white shadow-sm"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Then / Now */}
      <section className="border-y border-[#d0d5c4]/60 bg-[#eef0e8]/60">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1fr_0.9fr] lg:items-stretch">
          <article className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">Then · 1850s</p>
            <h3 className="mt-2 font-serif text-xl font-semibold">River bar gold rush</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f]">
              Thousands of prospectors worked Italian Bar and nearby diggings. Nervie&apos;s Store and the
              historic bar on the Stanislaus drew miners to one of the Mother Lode&apos;s richest stretches.
            </p>
          </article>
          <article className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">Now · LDMA era</p>
            <h3 className="mt-2 font-serif text-xl font-semibold">Living prospecting camp</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f]">
              160 patented acres with clubhouse, showers, campsites, and river access. Panning, sluicing,
              highbanking, detecting, and hands-on education — including Gold Trails sessions with Kevin
              Hoagland.
            </p>
          </article>
          <div className="overflow-hidden rounded-2xl border border-[#e0d4b3] bg-white shadow-sm lg:row-span-1">
            <Image
              src={italianBarPhotos.history.src}
              alt={italianBarPhotos.history.alt}
              width={600}
              height={700}
              className="h-full min-h-[220px] w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Why attend</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            The system for learning in the field
          </h2>
          <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">
            Structured coaching, real ground, and repeatable skills you can take to your next hunt.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eventBenefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-semibold text-[#1a140f]">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Immersive + video CTA */}
      <section className="border-t border-[#3d4535]/40 bg-[#3d4535] text-[#f7f2e8]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#5a6348]/60">
            <Image
              src={italianBarPhotos.immersive.src}
              alt={italianBarPhotos.immersive.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b8c4a8]">
              Immersive field work
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
              This is not a passive seminar
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c4b59a] sm:text-base">
              You&apos;ll be at the river and in the dirt — running pans and sluices, setting up a
              highbanker, swinging a coil, and recovering gold with coaching nearby. Classroom concepts
              become muscle memory through drills you can take home.
            </p>
            <EventsExpectVideoModal className="!mt-6" />
          </div>
        </div>
      </section>

      {/* Know before you go + location */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#d0d5c4] bg-[#eef0e8] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              Know before you go
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Plan your trip</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#5c4f3f]">
              <li>
                <strong className="text-[#1a140f]">Camp season:</strong> Italian Bar is typically open
                March 15 through October 31.
              </li>
              <li>
                <strong className="text-[#1a140f]">Road access:</strong> The canyon road is steep and
                narrow — rigs up to about 30 feet are recommended. Gravel for the last few miles into
                camp.
              </li>
              <li>
                <strong className="text-[#1a140f]">On-site amenities:</strong> Clubhouse, showers,
                restrooms, dump station, and community fire pit.
              </li>
              <li>
                <strong className="text-[#1a140f]">Prospecting:</strong> River panning and sluicing;
                highbanking; designated areas for recirculating units and seasonal dry washing; metal
                detecting on camp and claim ground.
              </li>
            </ul>

            <div className="mt-6 rounded-xl border border-[#d0d5c4] bg-white p-5 sm:p-6">
              <h3 className="font-serif text-lg font-semibold text-[#1a140f]">
                Nearby campgrounds &amp; hotels
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">{nearbyLodging.intro}</p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {(["columbia", "sonora"] as const).map((town) => {
                  const area = nearbyLodging[town];
                  return (
                    <div key={town}>
                      <p className="text-sm font-semibold text-[#1a140f]">
                        {area.label}{" "}
                        <span className="font-normal text-[#6d7760]">({area.distance})</span>
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#5a6348]">
                        Campgrounds
                      </p>
                      <ul className="mt-1.5 space-y-2">
                        {area.campgrounds.map((option) => (
                          <li key={option.name} className="text-sm text-[#5c4f3f]">
                            {option.href ? (
                              <Link
                                href={option.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold !text-[#5a6348] no-underline hover:!text-[#3d4535]"
                              >
                                {option.name}
                              </Link>
                            ) : (
                              <span className="font-semibold text-[#1a140f]">{option.name}</span>
                            )}
                            <span className="block text-xs leading-relaxed text-[#6d7760]">
                              {option.detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#5a6348]">
                        Hotels
                      </p>
                      <ul className="mt-1.5 space-y-2">
                        {area.hotels.map((option) => (
                          <li key={option.name} className="text-sm text-[#5c4f3f]">
                            {option.href ? (
                              <Link
                                href={option.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold !text-[#5a6348] no-underline hover:!text-[#3d4535]"
                              >
                                {option.name}
                              </Link>
                            ) : (
                              <span className="font-semibold text-[#1a140f]">{option.name}</span>
                            )}
                            <span className="block text-xs leading-relaxed text-[#6d7760]">
                              {option.detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#6d7760]">
                Availability and rates change — contact properties directly to book. Event registration
                includes dry camping at Italian Bar when listed on your session.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Location</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold">Italian Bar, California</h2>
            <p className="mt-3 text-sm text-[#5c4f3f]">{ITALIAN_BAR_ADDRESS}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={ITALIAN_BAR_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(nhGoldButtonClass, "px-5 py-2.5 text-sm")}
              >
                Get directions
              </Link>
              <Link
                href={LDMA_ITALIAN_BAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-[#f7f2e8] px-5 py-2.5 text-sm font-semibold !text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]"
              >
                LDMA camp info
              </Link>
            </div>
            <div className="mt-8 border-t border-[#e0d4b3]/80 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5a6348]">Nearby</p>
              <ul className="mt-3 space-y-2">
                {nearbyPlaces.map((place) => (
                  <li key={place.name} className="text-sm text-[#5c4f3f]">
                    <span className="font-semibold text-[#1a140f]">{place.name}</span> — {place.detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section
        id="upcoming-events"
        className="scroll-mt-20 border-t border-[#e0d4b3]/60 bg-white py-14 sm:py-20"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              Upcoming sessions
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Reserve your spot at Italian Bar
            </h2>
            <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">
              Select a session, choose your event option, and register through secure checkout.
            </p>
          </div>
          <Suspense fallback={<EventsUpcomingSkeleton />}>
            <EventsUpcomingGrid />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={null}>
        <EventsReviewsSection />
      </Suspense>

      {/* FAQ */}
      <section className="border-t border-[#e0d4b3]/60 bg-white py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">FAQ</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">Event questions</h2>
          </div>
          <NewHomeFaq items={[...eventsFaq]} />
        </div>
      </section>

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
