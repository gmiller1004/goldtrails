import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BundleCheckoutButton } from "@/components/black-friday/bundle-checkout-button";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { getProductByHandle, type ShopifyProduct } from "@/lib/shopify";
import { pageMetadata } from "@/lib/site";
import { cn } from "@/lib/utils";

const BUNDLE_HANDLE = "gold-trails-and-detector-academy-march-2027";
const SALE_PRICE = 800;
const RETAIL_PRICE = 1400;
const ACADEMY_URL = "https://myldma.com/events/detector-academy-stanton-2027";

const pageMeta = pageMetadata({
  title: "Black Friday Bundle: Gold Trails + Detector Academy — $800",
  description:
    "Black Friday through Cyber Monday: Gold Trails Morristown March 6–7 plus LDMA Detector Academy at Stanton March 11–14 for $800 (normally $1,400).",
  path: "/black-friday",
});

export const metadata: Metadata = {
  ...pageMeta,
  robots: { index: false, follow: false },
  openGraph: {
    ...pageMeta.openGraph,
    images: [
      {
        url: "/events/black-friday-bundle/morristown-hero.jpg",
        width: 1600,
        height: 1067,
        alt: "Gold Trails Black Friday Arizona bundle",
      },
    ],
  },
};

const FALLBACK_PRODUCT: ShopifyProduct = {
  id: "gid://shopify/Product/15518246371638",
  title: "Gold Trails and Detector Academy, March 2027",
  rawTitle: "Gold Trails and Detector Academy, March 2027",
  price: `USD ${SALE_PRICE.toFixed(2)}`,
  image: "/events/black-friday-bundle/morristown-hero.jpg",
  images: [
    "/events/black-friday-bundle/morristown-hero.jpg",
    "/events/black-friday-bundle/detector-academy.jpg",
  ],
  handle: BUNDLE_HANDLE,
  description: "",
  descriptionHtml: "",
  tags: ["gold-trails-bundle", "gold-trails-promo"],
  eventStartDate: "2027-03-06",
  eventEndDate: "2027-03-14",
  eventLocation: "Morristown, AZ and Stanton, AZ",
  variantId: "gid://shopify/ProductVariant/68303945105718",
  variantTitle: "Default Title",
  availableForSale: true,
  variants: [
    {
      id: "gid://shopify/ProductVariant/68303945105718",
      title: "Default Title",
      price: `USD ${SALE_PRICE.toFixed(2)}`,
      availableForSale: true,
    },
  ],
  reserveUrl: `/shop/${BUNDLE_HANDLE}`,
};

const included = [
  "Gold Trails Metal Detecting Hands-On Masterclass — March 6–7 in Morristown",
  "Course handbook and lunch both Morristown days",
  "LDMA Detector Academy — March 11–14 at Stanton",
  "Test garden, claim hunts, and coaching from Kevin plus the Stanton instructor team",
] as const;

const faqs = [
  {
    q: "What dates are covered?",
    a: "March 6–7, 2027 for Gold Trails in Morristown, then March 11–14 for Detector Academy at LDMA Stanton (Congress, AZ). March 8 is an optional half-day hunt with Kevin available.",
  },
  {
    q: "Do I need a GPAA membership?",
    a: "Yes for the Morristown days — field time is on Maricopa Group GPAA claims. Detector Academy at Stanton is open to members and the public; every participant hunts Stanton claims during the academy.",
  },
  {
    q: "What is not included?",
    a: "Travel, lodging, and camping/meals at Stanton are separate. Bring your own gold detector, headphones, pinpointer, and digging tool. RV sites at the 1899 Historic Hotel are booked with the venue.",
  },
  {
    q: "How long is this price available?",
    a: "Black Friday, November 27, through Cyber Monday, November 30, 2026 only. After that the bundle returns to $1,400.",
  },
] as const;

function PriceBlock({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-3 gap-y-1", className)}>
      <span className="font-serif text-4xl font-semibold tracking-tight text-[#1a140f] sm:text-5xl">
        ${SALE_PRICE}
      </span>
      <span className="text-lg text-[#6d7760] line-through">${RETAIL_PRICE.toLocaleString()}</span>
      <span className="w-full text-sm font-medium text-[#5a6348] sm:w-auto">
        Save ${RETAIL_PRICE - SALE_PRICE} · Black Friday – Cyber Monday
      </span>
    </div>
  );
}

export default async function BlackFridayBundlePage() {
  const product = (await getProductByHandle(BUNDLE_HANDLE)) ?? FALLBACK_PRODUCT;

  return (
    <div className="bg-[#f7f2e8] text-[#1a140f]">
      {/* Hero — full-bleed atmosphere, brand first */}
      <section className="relative min-h-[88vh] overflow-hidden border-b border-[#3d4535]/30">
        <Image
          src="/events/black-friday-bundle/morristown-hero.jpg"
          alt="Gold Trails metal detecting training in the Arizona desert"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,20,15,0.55)_0%,rgba(26,20,15,0.35)_42%,rgba(26,20,15,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,151,36,0.18),transparent_50%)]" />

        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16 lg:pb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#e8d5a3]">
            Gold Trails
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-serif text-[2rem] font-semibold leading-[1.12] text-white sm:text-5xl lg:text-[3.25rem]">
            Two Arizona weeks. One Black Friday price.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#e8dfd0] sm:text-lg">
            Kevin&apos;s Gold Trails masterclass in Morristown, then LDMA Detector Academy at
            Stanton — normally $1,400, yours for $800 through Cyber Monday.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <BundleCheckoutButton
              product={product}
              className="h-12 px-8 text-base shadow-lg"
              label="Lock in $800 — go to checkout"
            />
            <a
              href="#details"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/35 bg-white/10 px-6 text-sm font-semibold !text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              See what&apos;s included
            </a>
          </div>
          <p className="mt-4 text-xs text-[#c4b59a]">
            Offer ends Monday, November 30, 2026 · March 6–7 + March 11–14, 2027
          </p>
        </div>
      </section>

      {/* Offer bar */}
      <section className="border-b border-[#d0d5c4]/70 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <PriceBlock />
          <BundleCheckoutButton
            product={product}
            className="h-11 shrink-0 px-6"
            label="Claim the bundle"
          />
        </div>
      </section>

      {/* Two weeks */}
      <section id="details" className="scroll-mt-24 border-b border-[#d0d5c4]/60">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              One registration · Two events
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Start small with Kevin. Finish the week at Stanton.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Morristown dials in your machine in a class of 30. A few days later Stanton opens the
              same habits to a larger crew, a test garden, and more coaches on LDMA ground.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <article className="space-y-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#e0d4b3] shadow-sm">
                <Image
                  src="/events/black-friday-bundle/morristown-field.jpg"
                  alt="Field coaching on the Maricopa Group GPAA claims near Morristown"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">
                March 6–7 · Morristown, AZ
              </p>
              <h3 className="font-serif text-2xl font-semibold">
                Gold Trails Hands-On Masterclass
              </h3>
              <p className="text-sm leading-relaxed text-[#5c4f3f]">
                Mornings in the classroom at the 1899 Historic Hotel. Afternoons on the Maricopa
                Group GPAA claims — about 15 minutes away — with Kevin coaching beside you. Cap of
                30. Includes handbook and lunch. Standalone value: $600.
              </p>
              <ul className="space-y-2 text-sm text-[#5c4f3f]">
                <li>
                  <span className="mr-2 text-primary">✓</span>
                  Classroom + one-on-one field time with Kevin
                </li>
                <li>
                  <span className="mr-2 text-primary">✓</span>
                  Optional March 8 half-day hunt
                </li>
                <li>
                  <span className="mr-2 text-primary">✓</span>
                  Active GPAA membership required for claim access
                </li>
              </ul>
              <Link
                href="/events/arizona/morristown"
                className="inline-flex text-sm font-semibold !text-[#5a6348] hover:!text-[#3d4535]"
              >
                Morristown venue details →
              </Link>
            </article>

            <article className="space-y-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#e0d4b3] shadow-sm">
                <Image
                  src="/events/black-friday-bundle/detector-academy.jpg"
                  alt="LDMA Detector Academy training at Stanton, Arizona"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">
                March 11–14 · Stanton, AZ
              </p>
              <h3 className="font-serif text-2xl font-semibold">LDMA Detector Academy</h3>
              <p className="text-sm leading-relaxed text-[#5c4f3f]">
                Four days at LDMA Stanton: classroom, test garden with gold at known depths, and
                claim hunts in groups of about 25. Kevin, John Mathis, Heath Jones, Amber Evans,
                Dylan Pritchard, and Dominic Ricci. Standalone value: $800.
              </p>
              <ul className="space-y-2 text-sm text-[#5c4f3f]">
                <li>
                  <span className="mr-2 text-primary">✓</span>
                  PI and VLF stations on real Stanton dirt
                </li>
                <li>
                  <span className="mr-2 text-primary">✓</span>
                  Day 4 open hunt with trainers nearby
                </li>
                <li>
                  <span className="mr-2 text-primary">✓</span>
                  Open to members and the public · 100 seats
                </li>
              </ul>
              <a
                href={ACADEMY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-semibold !text-[#5a6348] hover:!text-[#3d4535]"
              >
                Full Detector Academy details →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Why bundle */}
      <section className="border-b border-[#3d4535]/40 bg-[#3d4535] text-[#f7f2e8]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b8c4a8]">
              Why this week works
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
              Morristown is where your machine starts to make sense. Stanton is where you use it.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c4b59a] sm:text-base">
              Two days of tight coaching, then four days rotating through stations with more
              instructors listening beside you. Same Arizona dirt. Same detector. More reps before
              you go home.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#5a6348]/50 shadow-lg">
            <Image
              src="/events/black-friday-bundle/morristown-highlight.jpg"
              alt="Attendee with a gold find from Arizona desert detecting"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Included + CTA */}
      <section id="register" className="scroll-mt-24 border-b border-[#d0d5c4]/60 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              What you get
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Both events for the price of the academy alone
            </h2>
            <ul className="mt-6 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-[#6d7760]">
              Retail $1,400 ($600 + $800). Black Friday through Cyber Monday:{" "}
              <strong className="text-[#1a140f]">$800</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e0d4b3] bg-[#f7f2e8] p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">
              Limited-time offer
            </p>
            <PriceBlock className="mt-3" />
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f]">
              Secure checkout through Shopify. Seats are shared with each event&apos;s capacity —
              claim yours before the sale ends Monday night.
            </p>
            <BundleCheckoutButton
              product={product}
              className="mt-6 h-12 w-full text-base"
              label="Checkout — $800 Black Friday bundle"
            />
            <p className="mt-4 text-xs leading-relaxed text-[#6d7760]">
              By registering you agree you&apos;ll bring an active GPAA membership for Morristown
              claim days, and that Stanton camping/meals are booked separately.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#d0d5c4]/60">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-center font-serif text-3xl font-semibold sm:text-4xl">
            Before you register
          </h2>
          <dl className="mt-10 space-y-8">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-serif text-lg font-semibold text-[#1a140f]">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1a140f] text-[#f7f2e8]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e8d5a3]">
            Gold Trails · Black Friday
          </p>
          <h2 className="max-w-2xl font-serif text-2xl font-semibold text-white sm:text-3xl">
            $800 for March in Arizona — then it&apos;s $1,400 again.
          </h2>
          <BundleCheckoutButton
            product={product}
            className={cn(nhGoldButtonClass, "h-12 px-8 text-base")}
            label="Claim the bundle now"
          />
          <p className="text-xs text-[#8a8070]">
            Sale ends November 30, 2026 · Questions?{" "}
            <Link href="/contact" className="font-semibold !text-[#e8d5a3] hover:!text-white">
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
