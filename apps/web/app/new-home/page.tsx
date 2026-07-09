import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { NewHomeFaq } from "@/components/new-home/new-home-faq";
import { NewHomeJumpStrip } from "@/components/new-home/new-home-jump-strip";
import { NewHomeFooter, NewHomeHeader } from "@/components/new-home/new-home-chrome";
import { NewHomeEventReviews } from "@/components/new-home/new-home-event-reviews";
import { NewHomeEvents, NewHomeEventsSkeleton } from "@/components/new-home/new-home-events";
import { NewHomeReviews } from "@/components/new-home/new-home-reviews";
import { TrainingVideoModal } from "@/components/new-home/training-video-modal";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { PartnersSection } from "@/components/new-home/partners-section";
import { WaitlistForm } from "@/components/new-home/waitlist-form";
import { LeadForm } from "@/components/lead-form";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Gold Trails — Learn Metal Detecting In The Field",
    description:
      "Free masterclass, field guides, GPAA certification path, webinars, and hands-on Gold Trails events with Kevin Hoagland.",
    path: "/new-home",
  }),
  robots: { index: false, follow: false },
};

const guides = [
  {
    href: "/guides/best-metal-detector-for-beginners",
    title: "Best Metal Detector for Beginners",
    description: "Choose a beginner setup based on terrain, budget, and practical field use.",
    image: "/images/gt2.jpg",
  },
  {
    href: "/guides/how-to-find-gold-nuggets",
    title: "How to Find Gold Nuggets",
    description: "Research, gridding, coil control, and recovery — a practical nugget strategy.",
    image: "/images/gt1.jpg",
  },
  {
    href: "/guides/ground-balancing-hot-ground",
    title: "Ground Balancing in Hot Ground",
    description: "Dial in your detector for mineralized soil and cut down false signals.",
    image: "/images/gt3.jpg",
  },
];

const webinars = [
  {
    topic: "metal-detecting-101",
    title: "Metal Detecting 101",
    description: "Detector basics, tones, and field routines you can repeat on every hunt.",
    image: "/images/gt4.jpg",
  },
  {
    topic: "gold-panning-101",
    title: "Gold Panning 101",
    description: "Reading water, sample workflow, and panning technique for beginners.",
    image: "/images/gt3.jpg",
  },
  {
    topic: "where-to-find-gold",
    title: "Where to Find the Gold?",
    description: "Research tools, geology clues, and how to pick ground worth your drive.",
    image: "/images/gt1.jpg",
  },
  {
    topic: "prospecting-gear-101",
    title: "Prospecting Gear 101",
    description: "Essential kit for detecting, digging, and recovering targets cleanly.",
    image: "/images/gt2.jpg",
  },
];

const certificationPerks = [
  {
    title: "GPAA Metal Detecting Certificate",
    description: "Complete the free 12-step lesson plan and quiz to earn your certification.",
  },
  {
    title: "Free Gold Trails hat",
    description: "Shipped after you finish the certification quiz — our thanks for learning with us.",
  },
  {
    title: "Event discounts",
    description: "Exclusive savings on future Gold Trails hands-on training events.",
  },
];

const faqItems = [
  {
    question: "How do I get my Metal Detecting Certificate?",
    answer:
      "Join the free 12-step lesson plan (coming soon on this page), work through each module, and pass the certification quiz. You'll receive your GPAA Metal Detecting Certificate, a free Gold Trails hat, and discounts on future Gold Trails events.",
  },
  {
    question: "Is the masterclass really free?",
    answer:
      "Yes. Enter your email and we'll send the full masterclass book (PDF and EPUB) through our email series. No payment required for the download.",
  },
  {
    question: "How often can I dig for gold on GPAA claims?",
    answer:
      "GPAA members can access 200+ claims nationwide. Membership covers your household for lawful prospecting on GPAA properties according to each claim's posted rules.",
  },
  {
    question: "How much does GPAA membership cost?",
    answer:
      "Visit goldprospectors.org/join for current pricing and what's included — claims access, magazine, chapters, and the Property Guide.",
  },
];

export default function NewHomePage() {
  return (
    <div id="top" className="min-h-screen bg-[#f7f2e8] text-[#1a140f]">
      <NewHomeHeader />

      {/* Hero + masterclass lead */}
      <section
        id="masterclass"
        className="relative overflow-hidden border-b border-[#d0d5c4]/70 bg-[#f7f2e8]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(90,99,72,0.12),transparent_42%),radial-gradient(circle_at_88%_12%,rgba(122,95,20,0.1),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
          {/* Full-width headline */}
          <div className="mx-auto mb-8 max-w-4xl text-center lg:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#5a6348]">
              Gold Trails Masterclass
            </p>
            <h1 className="text-balance font-serif text-[1.65rem] font-semibold leading-[1.2] sm:text-4xl lg:text-5xl">
              55 years of metal detecting wisdom — download Kevin Hoagland&apos;s{" "}
              <span className="text-primary">free</span> masterclass book
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#5c4f3f] sm:mt-4 sm:text-lg">
              Learn proven field tactics, detector mastery, and recovery strategies from one of the
              most trusted voices in prospecting. Delivered to your inbox in minutes.
            </p>
          </div>

          {/* Kevin · form · Kevin — images desktop only; matched portrait size */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-end lg:gap-6 xl:gap-10">
            <div className="mx-auto hidden w-full max-w-[11rem] lg:order-1 lg:block xl:max-w-[12.5rem]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#d0d5c4] bg-[#efe4cf] shadow-lg">
                <Image
                  src="/images/gt4.jpg"
                  alt="Kevin Hoagland detecting in the field"
                  fill
                  sizes="(max-width: 1280px) 11rem, 12.5rem"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="w-full lg:order-2 lg:self-center">
              <LeadForm
                className="mx-auto w-full max-w-md border-[#d0d5c4] shadow-lg"
                eyebrow="Free download"
                title="Send me the masterclass"
                submitLabel="Download free book"
              />
            </div>

            <div className="mx-auto hidden w-full max-w-[11rem] lg:order-3 lg:block xl:max-w-[12.5rem]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#d0d5c4] bg-[#efe4cf] shadow-lg">
                <Image
                  src="/images/gt2.jpg"
                  alt="Kevin Hoagland teaching in the field"
                  fill
                  sizes="(max-width: 1280px) 11rem, 12.5rem"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewHomeJumpStrip />

      {/* Guides */}
      <section id="guides" className="border-b border-[#d0d5c4]/60 bg-[#eef0e8]/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Gold Trails Guides</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Learn faster in the field</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
            Short tactical reads to help you detect smarter, recover cleaner, and find more.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group overflow-hidden rounded-2xl border border-[#e0d4b3] bg-white no-underline shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#efe4cf]">
                <Image
                  src={guide.image}
                  alt=""
                  width={700}
                  height={440}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-semibold text-[#1a140f] group-hover:text-primary">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">{guide.description}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#5a6348]">Read guide →</span>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* Certification */}
      <section id="certification" className="border-y border-[#d0d5c4]/60 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Get certified</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Earn your GPAA Metal Detecting Certificate
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Start your golden adventure with a free 12-step lesson plan. When you complete the
              quiz, you unlock real rewards — not just a PDF on your phone.
            </p>
            <ul className="mt-8 space-y-4">
              {certificationPerks.map((perk) => (
                <li key={perk.title} className="flex gap-3 rounded-xl border border-[#d0d5c4] bg-[#eef0e8]/50 p-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5a6348] text-sm font-bold text-white">
                    ✓
                  </span>
                  <div>
                    <p className="font-semibold text-[#1a140f]">{perk.title}</p>
                    <p className="mt-1 text-sm text-[#5c4f3f]">{perk.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e0d4b3] bg-[#f7f2e8] p-6 shadow-sm sm:p-8">
            <div className="mb-6 overflow-hidden rounded-xl border border-[#e0d4b3] bg-white">
              <Image
                src="/images/gt4.jpg"
                alt="Detector training in the field"
                width={800}
                height={500}
                className="h-48 w-full object-cover sm:h-56"
              />
            </div>
            <h3 className="font-serif text-xl font-semibold">Certification waitlist</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">
              The 12-step lesson plan and quiz are launching soon. Join the waitlist and we&apos;ll
              notify you when certification opens — wired to Klaviyo flows later.
            </p>
            <div className="mt-5">
              <WaitlistForm topic="certification" topicLabel="GPAA Metal Detecting Certification" />
            </div>
          </div>
        </div>
      </section>

      {/* About Kevin */}
      <section id="about" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">About</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Who is Kevin Hoagland?</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Kevin Hoagland is a veteran prospector, GPAA/LDMA leader, and host of Gold Trails. His
              teaching style turns complex detector settings into practical, repeatable field routines
              for beginners and experienced hunters alike.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Kevin has appeared across prospecting-focused series including Gold Trails and HISTORY
              Channel&apos;s Lost Gold of the Aztecs. At Gold & Treasure Shows he leads seminars on
              metal detecting, local geology, and field-ready techniques. Metal Detecting 101 sessions
              combine classroom instruction with in-field drills for ground balance, tones, and coil
              control.
            </p>
            <TrainingVideoModal />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["gt1.jpg", "gt2.jpg", "gt3.jpg", "gt4.jpg"].map((file) => (
              <div
                key={file}
                className="overflow-hidden rounded-xl border border-[#e0d4b3] bg-white shadow-sm"
              >
                <Image
                  src={`/images/${file}`}
                  alt="Kevin Hoagland in the field"
                  width={400}
                  height={400}
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewHomeReviews />

      {/* Webinars */}
      <section id="webinars" className="border-t border-[#3d4535]/40 bg-[#3d4535] text-[#f7f2e8]">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b8c4a8]">Live learning</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">Upcoming webinars</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#c4b59a] sm:text-base">
              Discover firsthand insights from top prospectors. Join a waitlist — we&apos;ll email you
              when registration opens.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {webinars.map((webinar) => (
              <article
                key={webinar.topic}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#5a6348]/60 bg-[#4a5640]/40"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={webinar.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3d4535] via-[#3d4535]/25 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-serif text-xl font-semibold text-white">{webinar.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#c4b59a]">{webinar.description}</p>
                  <div className="mt-5 border-t border-[#5a6348]/50 pt-5">
                    <WaitlistForm
                      topic={webinar.topic}
                      topicLabel={webinar.title}
                      compact
                      onDark
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#8a7d68]">And more to come.</p>
        </div>
      </section>

      {/* Events */}
      <section id="events" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">In the dirt</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Gold Trails events</h2>
            <p className="mt-3 max-w-xl text-sm text-[#5c4f3f] sm:text-base">
              Hands-on training with Kevin at real claims — Italian Bar and more on the calendar.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-5 py-2.5 text-sm font-semibold text-[#1a140f] no-underline shadow-sm hover:bg-[#efe4cf]"
          >
            View all events
          </Link>
        </div>
        <Suspense fallback={<NewHomeEventsSkeleton />}>
          <NewHomeEvents />
        </Suspense>
        <Suspense fallback={null}>
          <NewHomeEventReviews />
        </Suspense>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[#e0d4b3]/60 bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">FAQ</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold">Common questions</h2>
          </div>
          <NewHomeFaq items={faqItems} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="overflow-hidden rounded-2xl border border-[#d0d5c4] bg-[#eef0e8]">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Contact</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">Questions? We&apos;re here.</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
                Events, the free masterclass, gear orders, or media — send a note and we&apos;ll reply
                as soon as we can.
              </p>
              <Link href="/contact" className={cn(nhGoldButtonClass, "mt-6 px-6 py-3 text-sm")}>
                Contact us
              </Link>
            </div>
            <div className="relative min-h-[220px] bg-[#1f1810] lg:min-h-full">
              <Image
                src="/images/gt3.jpg"
                alt=""
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1810]/80 to-transparent lg:bg-gradient-to-l" />
            </div>
          </div>
        </div>
      </section>

      {/* Secondary masterclass CTA */}
      <section className="border-t border-[#e0d4b3]/60 bg-[#f7f2e8]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16">
          <h2 className="max-w-2xl font-serif text-2xl font-semibold sm:text-3xl">
            Start with the free masterclass — then train in the field with Kevin
          </h2>
          <a href="#masterclass" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
            Get the free book
          </a>
        </div>
      </section>

      <PartnersSection />

      <NewHomeFooter />
    </div>
  );
}
