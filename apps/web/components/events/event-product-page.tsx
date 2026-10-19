import Link from "next/link";
import { MetaPixelProductView } from "@/components/analytics/meta-pixel-product-view";
import {
  EventBenefitsGrid,
  EventChips,
  EventImmersive,
  EventsBreadcrumbs,
  KnowBeforeYouGoItems,
  MembershipCallout,
  VenueHeroImage,
  VenueHighlights,
  VenueLocationCard,
  VenueSchedule,
  VenueStats,
  VenueStory,
} from "@/components/events/venue-sections";
import { ProductDescription } from "@/components/shop/product-description";
import { ProductImageGallery } from "@/components/shop/product-image-gallery";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { formatEventDateRange } from "@/lib/events/format";
import { isSessionPast } from "@/lib/events/sessions";
import { resolveEventVenue, venuePath } from "@/lib/events/venues";
import { cn } from "@/lib/utils";
import type { ShopifyProduct } from "@/lib/shopify";

/** Event detail page: venue story first, then this session's registration card. */
export function EventProductPage({ product }: { product: ShopifyProduct }) {
  const venue = resolveEventVenue(product);
  const ended = isSessionPast(product, venue);
  const eventDate = formatEventDateRange(product, "long");
  const eventLocation = product.eventLocation?.trim() || `${venue.shortName} · ${venue.locationLabel}`;
  const venueHref = venuePath(venue);

  return (
    <div className="bg-[#f7f2e8] text-[#1a140f]">
      <MetaPixelProductView
        productId={product.id}
        title={product.title}
        handle={product.handle}
        price={product.price}
      />

      {ended ? (
        <div className="border-b border-[#e0d4b3] bg-[#efe4cf]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-[#1a140f]">
              <strong>This session has ended.</strong> Registration is closed — see what&apos;s coming up next.
            </p>
            <Link href={`${venueHref}#upcoming-events`} className={cn(nhGoldButtonClass, "px-5 py-2 text-sm")}>
              Upcoming {venue.shortName} sessions
            </Link>
          </div>
        </div>
      ) : null}

      {/* Compact context hero */}
      <section className="relative overflow-hidden border-b border-[#d0d5c4]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(90,99,72,0.14),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(122,95,20,0.1),transparent_38%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div>
            <EventsBreadcrumbs
              items={[
                { label: "Events", href: "/events" },
                { label: `${venue.stateName} · ${venue.shortName}`, href: venueHref },
                { label: "This session" },
              ]}
            />
            <h1 className="mt-3 font-serif text-[1.65rem] font-semibold leading-[1.15] sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5c4f3f] sm:text-base">{venue.sessionIntro}</p>
            <EventChips highlight={eventDate} chips={[eventLocation, ...venue.sessionChips]} />
            {ended ? null : (
              <a href="#register" className={cn(nhGoldButtonClass, "mt-7 px-8 py-3 text-base")}>
                Reserve this session
              </a>
            )}
          </div>
          <VenueHeroImage venue={venue} priority />
        </div>
      </section>

      <VenueStats venue={venue} />
      <VenueStory venue={venue} />
      <VenueHighlights venue={venue} />
      <VenueSchedule venue={venue} />
      <EventBenefitsGrid benefits={venue.benefits} />
      <EventImmersive photo={venue.photos.immersive} title={venue.immersive.title} body={venue.immersive.body} />

      {/* Register this session */}
      <section
        id="register"
        className="scroll-mt-24 border-t border-[#e0d4b3]/60 bg-white py-14 sm:py-16"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">This session</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              {ended ? "This session has ended" : "Reserve your spot"}
            </h2>
            <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">
              {ended
                ? "Registration for these dates is closed. Check upcoming sessions for the next opening."
                : "Choose your event option and complete secure checkout. Seats are capped so everyone gets real hands-on time."}
            </p>
          </div>

          {!ended && (venue.membership.kind === "required" || venue.gearRequirement) ? (
            <div className="mb-6 space-y-2 rounded-xl border border-primary/40 bg-primary/5 px-4 py-4 text-sm leading-relaxed text-[#1a140f] sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5a6348]">Before you register</p>
              {venue.membership.kind === "required" ? (
                <p>
                  <strong>Active GPAA membership required.</strong> Field sessions are held on GPAA claims.{" "}
                  <Link
                    href={venue.membership.links[0]?.href ?? "https://goldprospectors.org/join"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold !text-[#5a6348]"
                  >
                    Not a member yet? Learn about GPAA membership →
                  </Link>
                </p>
              ) : null}
              {venue.gearRequirement ? (
                <p>
                  <strong>{venue.gearRequirement.short}.</strong> {venue.gearRequirement.detail}{" "}
                  {venue.gearRequirement.link ? (
                    <Link href={venue.gearRequirement.link.href} className="font-semibold !text-[#5a6348]">
                      {venue.gearRequirement.link.label}
                    </Link>
                  ) : null}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="rounded-2xl border border-[#e0d4b3] bg-[#f7f2e8] p-6 shadow-sm sm:p-8">
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
              <ProductImageGallery
                title={product.title}
                images={product.images.length ? product.images : product.image ? [product.image] : []}
              />

              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-[#1a140f] sm:text-3xl">{product.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {eventDate ? (
                    <span className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium sm:text-sm">
                      {eventDate}
                    </span>
                  ) : null}
                  <span className="inline-flex items-center rounded-full border border-[#d0d5c4] bg-white px-3 py-1 text-xs font-medium sm:text-sm">
                    {eventLocation}
                  </span>
                </div>

                <ProductDescription
                  html={product.descriptionHtml}
                  plain={product.description}
                  emptyFallback="Session details will be confirmed after registration. Check your confirmation email for timing and packing notes."
                />

                <div className="flex flex-wrap gap-3 pt-2">
                  {ended ? (
                    <Link href={`${venueHref}#upcoming-events`} className={cn(nhGoldButtonClass, "px-6 py-3 text-sm")}>
                      See upcoming {venue.shortName} sessions
                    </Link>
                  ) : (
                    <>
                      <div className="w-full sm:w-auto sm:min-w-[280px]">
                        <ProductPurchaseControls product={product} className="w-full" />
                      </div>
                      <Link
                        href="/cart"
                        className="inline-flex items-center text-sm font-medium !text-[#5a6348] no-underline hover:!text-[#3d4535]"
                      >
                        Go to cart
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#d0d5c4]/80 bg-[#eef0e8]/80 px-4 py-4 sm:px-5 sm:py-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5a6348]">Cancellation policy</p>
            <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">
              We plan and cap these events so everyone gets real hands-on time. Refunds are available only when you
              request cancellation{" "}
              <strong className="font-medium text-[#1a140f]">at least 7 days before the event start date</strong>.
              Requests inside that window help us cover committed costs and staffing.
            </p>
          </div>

          {venue.membership.kind !== "required" ? (
            <MembershipCallout membership={venue.membership} className="mt-10" />
          ) : null}
        </div>
      </section>

      {/* Know before you go + location */}
      <section className="border-t border-[#e0d4b3]/60 bg-[#f7f2e8] py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#d0d5c4] bg-[#eef0e8] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Know before you go</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Plan your trip</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#5c4f3f]">
              <KnowBeforeYouGoItems venue={venue} />
            </ul>
            <p className="mt-5 text-sm text-[#5c4f3f]">
              Lodging, RV, and hotel options are on the{" "}
              <Link href={venueHref} className="font-semibold !text-[#5a6348]">
                {venue.shortName} location page
              </Link>
              .
            </p>
          </div>
          <VenueLocationCard venue={venue} />
        </div>
      </section>

      <section className="border-t border-[#e0d4b3]/60 bg-white py-12 sm:py-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <p className="text-sm text-[#5c4f3f]">Looking for another date or location?</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link href={`${venueHref}#upcoming-events`} className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
              More {venue.shortName} sessions
            </Link>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-[#f7f2e8] px-8 py-3 text-base font-semibold !text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]"
            >
              All Gold Trails events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
