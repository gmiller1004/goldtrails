import Image from "next/image";
import Link from "next/link";
import {
  eventBenefits,
  italianBarPhotos,
  italianBarStats,
  ITALIAN_BAR_ADDRESS,
  ITALIAN_BAR_MAPS_URL,
  LDMA_ITALIAN_BAR_URL,
  nearbyPlaces,
} from "@/components/events/events-venue-content";
import { EventsExpectVideoModal } from "@/components/events/events-expect-video-modal";
import { MetaPixelProductView } from "@/components/analytics/meta-pixel-product-view";
import { ProductDescription } from "@/components/shop/product-description";
import { ProductImageGallery } from "@/components/shop/product-image-gallery";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { cn } from "@/lib/utils";
import type { ShopifyProduct } from "@/lib/shopify";

function formatDate(value?: string | null) {
  if (!value) return null;
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  let parsed: Date;
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    parsed = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    parsed = new Date(value);
  }
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function formatDateRange(start?: string | null, end?: string | null, fallback?: string | null) {
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);
  if (startFormatted && endFormatted) return `${startFormatted} - ${endFormatted}`;
  if (startFormatted) return startFormatted;
  if (endFormatted) return endFormatted;
  return formatDate(fallback);
}

/**
 * Event detail page: Italian Bar venue story first, then this session’s registration card.
 */
export function EventProductPage({ product }: { product: ShopifyProduct }) {
  const eventDate = formatDateRange(product.eventStartDate, product.eventEndDate, product.eventDate);
  const eventLocation = product.eventLocation?.trim() || "Italian Bar · Columbia, CA";

  return (
    <div className="bg-[#f7f2e8] text-[#1a140f]">
      <MetaPixelProductView
        productId={product.id}
        title={product.title}
        handle={product.handle}
        price={product.price}
      />

      {/* Compact context hero */}
      <section className="relative overflow-hidden border-b border-[#d0d5c4]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(90,99,72,0.14),transparent_42%),radial-gradient(circle_at_90%_20%,rgba(122,95,20,0.1),transparent_38%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
          <div>
            <Link
              href="/events"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348] no-underline hover:text-[#3d4535]"
            >
              ← All Gold Trails events
            </Link>
            <h1 className="mt-3 font-serif text-[1.65rem] font-semibold leading-[1.15] sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Hands-on prospecting with Kevin Hoagland at LDMA&apos;s Italian Bar — historic Mother Lode
              ground on the Stanislaus River near Columbia, California.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {eventDate ? (
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium sm:text-sm">
                  {eventDate}
                </span>
              ) : null}
              <span className="inline-flex items-center rounded-full border border-[#d0d5c4] bg-white/80 px-3 py-1 text-xs font-medium sm:text-sm">
                {eventLocation}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#d0d5c4] bg-white/80 px-3 py-1 text-xs font-medium sm:text-sm">
                Dry campsite included
              </span>
            </div>
            <a href="#register" className={cn(nhGoldButtonClass, "mt-7 px-8 py-3 text-base")}>
              Reserve this session
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
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
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
              This Gold Trails session uses that real claim ground — not a classroom simulation. You may
              pan and sluice the Stanislaus, run a highbanker, and work targets with a detector — with
              river access, camp amenities, and field time built in.
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
              highbanking, detecting, and hands-on education — including this session with Kevin Hoagland.
            </p>
          </article>
          <div className="overflow-hidden rounded-2xl border border-[#e0d4b3] bg-white shadow-sm">
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
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Why attend</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
            The system for learning in the field
          </h2>
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

      {/* Immersive */}
      <section className="border-t border-[#3d4535]/40 bg-[#3d4535] text-[#f7f2e8]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:items-center">
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
              highbanker, swinging a coil, and recovering gold with coaching nearby.
            </p>
            <EventsExpectVideoModal className="!mt-6" />
          </div>
        </div>
      </section>

      {/* Register this session */}
      <section
        id="register"
        className="scroll-mt-24 border-t border-[#e0d4b3]/60 bg-white py-14 sm:py-16"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">This session</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Reserve your spot</h2>
            <p className="mt-3 text-sm text-[#5c4f3f] sm:text-base">
              Choose your event option and complete secure checkout. Seats are capped so everyone gets
              real hands-on time.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e0d4b3] bg-[#f7f2e8] p-6 shadow-sm sm:p-8">
            <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
              <ProductImageGallery
                title={product.title}
                images={product.images.length ? product.images : product.image ? [product.image] : []}
              />

              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-[#1a140f] sm:text-3xl">
                  {product.title}
                </h3>
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
                  <div className="w-full sm:w-auto sm:min-w-[280px]">
                    <ProductPurchaseControls product={product} className="w-full" />
                  </div>
                  <Link
                    href="/cart"
                    className="inline-flex items-center text-sm font-medium !text-[#5a6348] no-underline hover:!text-[#3d4535]"
                  >
                    Go to cart
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#d0d5c4]/80 bg-[#eef0e8]/80 px-4 py-4 sm:px-5 sm:py-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5a6348]">
              Cancellation policy
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">
              We plan and cap these events so everyone gets real hands-on time. Refunds are available only
              when you request cancellation{" "}
              <strong className="font-medium text-[#1a140f]">at least 7 days before the event start date</strong>.
              Requests inside that window help us cover committed costs and staffing.
            </p>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-[#e0d4b3]/60 bg-[#f7f2e8] py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
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
                narrow — rigs up to about 30 feet are recommended.
              </li>
              <li>
                <strong className="text-[#1a140f]">On-site amenities:</strong> Clubhouse, showers,
                restrooms, dump station, and community fire pit.
              </li>
              <li>
                <strong className="text-[#1a140f]">Dry campsite:</strong> Included with many session
                options — check your event variant for details.
              </li>
            </ul>
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

      <section className="border-t border-[#e0d4b3]/60 bg-white py-12 sm:py-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
          <p className="text-sm text-[#5c4f3f]">Looking for another date?</p>
          <Link href="/events" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
            View all upcoming sessions
          </Link>
        </div>
      </section>
    </div>
  );
}
