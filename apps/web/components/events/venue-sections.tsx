import Image from "next/image";
import Link from "next/link";
import { EventsExpectVideoModal } from "@/components/events/events-expect-video-modal";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import type { EventVenue, VenueMembership } from "@/lib/events/venues";
import { cn } from "@/lib/utils";

const eyebrowClass = "text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]";
const externalLinkClass =
  "font-semibold !text-[#5a6348] no-underline hover:!text-[#3d4535]";
const secondaryButtonClass =
  "inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-[#f7f2e8] px-5 py-2.5 text-sm font-semibold !text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]";

export function EventsBreadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center gap-2">
            {index > 0 ? <span aria-hidden className="text-[#b8a98a]">›</span> : null}
            {item.href ? (
              <Link href={item.href} className="no-underline !text-[#5a6348] hover:!text-[#3d4535]">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#6d7760]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EventChips({ chips, highlight }: { chips: string[]; highlight?: string | null }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {highlight ? (
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-[#1a140f] sm:text-sm">
          {highlight}
        </span>
      ) : null}
      {chips.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center rounded-full border border-[#d0d5c4] bg-white/80 px-3 py-1 text-xs font-medium text-[#1a140f] sm:text-sm"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

export function VenueHeroImage({ venue, priority }: { venue: EventVenue; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#d0d5c4] shadow-lg lg:aspect-[5/4]">
      <Image
        src={venue.photos.hero.src}
        alt={venue.photos.hero.alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a140f]/50 via-transparent to-transparent" />
      <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white drop-shadow">
        {venue.hero.caption}
      </p>
    </div>
  );
}

export function VenueStats({ venue }: { venue: EventVenue }) {
  return (
    <section className="border-b border-[#4a5640]/30 bg-[#5a6348] py-5">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:grid-cols-4 sm:px-6">
        {venue.stats.map((stat) => (
          <li key={stat.label} className="text-center">
            <p className="font-serif text-2xl font-semibold text-[#f7f2e8] sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#c4b59a] sm:text-sm">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function VenueStory({ venue }: { venue: EventVenue }) {
  const { story } = venue;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className={eyebrowClass}>{story.eyebrow}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{story.title}</h2>
          {story.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              {paragraph}
            </p>
          ))}
          {story.link ? (
            <Link
              href={story.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("mt-5 inline-flex text-sm", externalLinkClass)}
            >
              {story.link.label}
            </Link>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {venue.photos.gallery.map((photo) => (
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
  );
}

export function VenueHighlights({ venue }: { venue: EventVenue }) {
  if (!venue.highlights) return null;
  const { cards, image } = venue.highlights;
  return (
    <section className="border-y border-[#d0d5c4]/60 bg-[#eef0e8]/60">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1fr_0.9fr] lg:items-stretch">
        {cards.map((card) => (
          <article key={card.title} className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">{card.eyebrow}</p>
            <h3 className="mt-2 font-serif text-xl font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f]">{card.body}</p>
          </article>
        ))}
        {image ? (
          <div className="overflow-hidden rounded-2xl border border-[#e0d4b3] bg-white shadow-sm">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={700}
              className="h-full min-h-[220px] w-full object-cover object-center"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function VenueSchedule({ venue }: { venue: EventVenue }) {
  if (!venue.schedule) return null;
  const { schedule } = venue;
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className={eyebrowClass}>{schedule.eyebrow}</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">{schedule.title}</h2>
        <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">{schedule.intro}</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {schedule.days.map((day) => (
          <article key={day.label} className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-xl font-semibold text-[#1a140f]">{day.label}</h3>
              {day.note ? (
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-[#1a140f]">
                  {day.note}
                </span>
              ) : null}
            </div>
            <ol className="mt-5 space-y-4">
              {day.blocks.map((block) => (
                <li key={`${day.label}-${block.label}`} className="flex gap-4">
                  <span className="mt-0.5 w-20 shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[#5a6348]">
                    {block.label}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1a140f]">{block.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#5c4f3f]">{block.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      {schedule.footnote ? (
        <p className="mt-5 text-center text-xs text-[#6d7760]">{schedule.footnote}</p>
      ) : null}
    </section>
  );
}

export function EventBenefitsGrid({
  benefits,
  subtitle,
}: {
  benefits: ReadonlyArray<{ title: string; description: string }>;
  subtitle?: string;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <p className={eyebrowClass}>Why attend</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">The system for learning in the field</h2>
        {subtitle ? <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">{subtitle}</p> : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-lg font-semibold text-[#1a140f]">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventImmersive({
  photo,
  title,
  body,
}: {
  photo: { src: string; alt: string };
  title: string;
  body: string;
}) {
  return (
    <section className="border-t border-[#3d4535]/40 bg-[#3d4535] text-[#f7f2e8]">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#5a6348]/60">
          <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b8c4a8]">Immersive field work</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-[#c4b59a] sm:text-base">{body}</p>
          <EventsExpectVideoModal className="!mt-6" />
        </div>
      </div>
    </section>
  );
}

export function KnowBeforeYouGoItems({ venue }: { venue: EventVenue }) {
  return (
    <>
      {venue.knowBeforeYouGo.map((item) => (
        <li key={item.label}>
          <strong className="text-[#1a140f]">{item.label}:</strong> {item.body}
          {item.link ? (
            <>
              {" "}
              <Link href={item.link.href} className={externalLinkClass}>
                {item.link.label}
              </Link>
            </>
          ) : null}
        </li>
      ))}
    </>
  );
}

export function VenuePlanTrip({ venue }: { venue: EventVenue }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-[#d0d5c4] bg-[#eef0e8] p-6 sm:p-8">
          <p className={eyebrowClass}>Know before you go</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Plan your trip</h2>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#5c4f3f]">
            <KnowBeforeYouGoItems venue={venue} />
          </ul>

          <div className="mt-6 rounded-xl border border-[#d0d5c4] bg-white p-5 sm:p-6">
            <h3 className="font-serif text-lg font-semibold text-[#1a140f]">{venue.lodging.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">{venue.lodging.intro}</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {venue.lodging.areas.map((area) => (
                <div key={area.label}>
                  <p className="text-sm font-semibold text-[#1a140f]">
                    {area.label}{" "}
                    {area.distance ? <span className="font-normal text-[#6d7760]">({area.distance})</span> : null}
                  </p>
                  {area.groups.map((group) => (
                    <div key={group.label}>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#5a6348]">{group.label}</p>
                      <ul className="mt-1.5 space-y-2">
                        {group.options.map((option) => (
                          <li key={option.name} className="text-sm text-[#5c4f3f]">
                            {option.href ? (
                              <Link
                                href={option.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={externalLinkClass}
                              >
                                {option.name}
                              </Link>
                            ) : (
                              <span className="font-semibold text-[#1a140f]">{option.name}</span>
                            )}
                            <span className="block text-xs leading-relaxed text-[#6d7760]">{option.detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[#6d7760]">{venue.lodging.footnote}</p>
          </div>
        </div>
        <VenueLocationCard venue={venue} />
      </div>
    </section>
  );
}

export function VenueLocationCard({ venue }: { venue: EventVenue }) {
  return (
    <div className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
      <p className={eyebrowClass}>Location</p>
      <h2 className="mt-2 font-serif text-2xl font-semibold">
        {venue.shortName}, {venue.stateName}
      </h2>
      <div className="mt-4 space-y-5">
        {venue.locations.map((location) => (
          <div key={location.name}>
            {venue.locations.length > 1 ? (
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5a6348]">{location.label}</p>
            ) : null}
            <p className="mt-1 text-sm font-semibold text-[#1a140f]">{location.name}</p>
            {location.address ? <p className="mt-1 text-sm text-[#5c4f3f]">{location.address}</p> : null}
            {location.detail ? <p className="mt-1 text-sm text-[#5c4f3f]">{location.detail}</p> : null}
            <div className="mt-3 flex flex-wrap gap-3">
              {location.mapsUrl ? (
                <Link
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(nhGoldButtonClass, "px-5 py-2.5 text-sm")}
                >
                  Get directions
                </Link>
              ) : null}
              {location.link ? (
                <Link href={location.link.href} target="_blank" rel="noopener noreferrer" className={secondaryButtonClass}>
                  {location.link.label}
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {venue.partnerLinks.length ? (
        <div className="mt-5 flex flex-wrap gap-3">
          {venue.partnerLinks.map((link) => (
            <Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={secondaryButtonClass}>
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
      <div className="mt-8 border-t border-[#e0d4b3]/80 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5a6348]">Nearby</p>
        <ul className="mt-3 space-y-2">
          {venue.nearby.map((place) => (
            <li key={place.name} className="text-sm text-[#5c4f3f]">
              <span className="font-semibold text-[#1a140f]">{place.name}</span> — {place.detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MembershipCallout({
  membership,
  className,
}: {
  membership: VenueMembership;
  className?: string;
}) {
  const required = membership.kind === "required";
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl rounded-2xl border p-6 text-center sm:p-8",
        required ? "border-primary/40 bg-primary/5" : "border-[#d0d5c4] bg-[#eef0e8]",
        className,
      )}
    >
      <p className={eyebrowClass}>
        {required ? "Membership required" : membership.kind === "discount" ? "Member pricing" : "Membership"}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-semibold text-[#1a140f]">{membership.title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#5c4f3f]">{membership.body}</p>
      <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        {membership.links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={
              index === 0
                ? cn(nhGoldButtonClass, "px-6 py-3 text-sm")
                : "inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-6 py-3 text-sm font-semibold !text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FeeDisclosure({ venue, className }: { venue: EventVenue; className?: string }) {
  if (!venue.feeDisclosure) return null;
  return (
    <div className={cn("rounded-xl border border-[#d0d5c4]/80 bg-[#eef0e8]/80 px-4 py-4 sm:px-5 sm:py-5", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5a6348]">{venue.feeDisclosure.title}</p>
      <p className="mt-2 text-xs leading-relaxed text-[#5c4f3f] sm:text-sm">{venue.feeDisclosure.body}</p>
    </div>
  );
}

export function EventsFaqSection({
  title = "Event questions",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#e0d4b3]/60 bg-white py-14 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="mb-8 text-center">
          <p className={eyebrowClass}>FAQ</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
