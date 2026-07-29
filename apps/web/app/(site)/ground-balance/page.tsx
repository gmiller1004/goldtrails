import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { JoinGpaaButton } from "@/components/ground-balance/join-gpaa-button";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { testimonials } from "@/lib/testimonials";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/site";

/**
 * Paid Facebook Reel landing — ground-balancing tip → masterclass lead → GPAA membership.
 *
 * Suggested ad URL (attribution is first-touch via AttributionBootstrap):
 * https://goldtrails.gold/ground-balance?utm_source=facebook&utm_medium=paid_social&utm_campaign=ground_balance_reel&utm_content=make_the_ground_disappear
 *
 * Membership CTAs send cold traffic to https://goldprospectors.org/join for more info before purchase.
 */

export const metadata: Metadata = pageMetadata({
  title: "Make the Ground Disappear — Kevin's Ground Balancing Technique",
  description:
    "Just watched Kevin Hoagland make mineralized ground disappear? Download the free 75-page Metal Detecting Masterclass, then practice on real GPAA claims.",
  path: "/ground-balance",
});

const takeaways = [
  {
    title: "Balance until the ground goes quiet",
    body: "When ground balance is dialed in, the mineralized dirt stops yelling at your ears — so real targets can speak up.",
  },
  {
    title: "Hot ground needs a repeatable routine",
    body: "Factory baseline → faint threshold hum → pump and balance → sensitivity at the edge of stability. Same sequence every time conditions change.",
  },
  {
    title: "Noise is not treasure",
    body: "Fast swings and max sensitivity turn hot soil into false chatter. Slow the coil, re-balance on new patches, and keep the coil in the dirt.",
  },
  {
    title: "One tip opens the door — mastery fills the bag",
    body: "Ground balance is a foundation skill. The free masterclass walks you through settings, threshold, coil control, and field habits that stack on top of it.",
  },
] as const;

const masterclassBenefits = [
  "Ground balancing and mineralized “hot ground” setups that stay stable",
  "Threshold, sensitivity, and frequency choices you can repeat in the field",
  "Coil control and swing habits that protect depth and target clarity",
  "Recovery and patch-reading routines from 55+ years of Kevin’s detecting",
] as const;

const membershipBenefits = [
  {
    title: "200+ member claims nationwide",
    body: "Real ground to practice ground balance, tones, and recovery — not just your backyard.",
  },
  {
    title: "Property Guide & claim intel",
    body: "Know where you can swing legally and plan trips with confidence.",
  },
  {
    title: "Magazine + community",
    body: "Ongoing education and a nationwide network of prospectors who share what’s working.",
  },
  {
    title: "Welcome kit to get started",
    body: "Membership includes the tools and materials to begin hunting as a GPAA family.",
  },
] as const;

const skillTestimonials = testimonials.filter((t) =>
  /detector|machine|skills|nugget|confidence|class|learning/i.test(`${t.title} ${t.quote}`),
);

export default function GroundBalanceLandingPage() {
  return (
    <div className="bg-[#f7f2e8] text-[#1a140f]">
      {/* Hero */}
      <section
        id="masterclass"
        className="relative overflow-hidden border-b border-[#d0d5c4]/70"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(90,99,72,0.14),transparent_42%),radial-gradient(circle_at_88%_18%,rgba(122,95,20,0.1),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
          <div className="mx-auto mb-8 max-w-3xl text-center lg:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#5a6348]">
              From Kevin&apos;s ground-balancing tip
            </p>
            <h1 className="text-balance font-serif text-[1.75rem] font-semibold leading-[1.15] sm:text-4xl lg:text-5xl">
              Make the ground disappear —{" "}
              <span className="text-primary">then go deeper</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5c4f3f] sm:text-lg">
              You just saw Kevin quiet mineralized ground so targets can speak. Grab the free
              75-page Metal Detecting Masterclass and turn that one skill into a full field system.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-end lg:gap-8">
            <div className="mx-auto hidden w-full max-w-[12rem] lg:block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#d0d5c4] bg-[#efe4cf] shadow-lg">
                <Image
                  src="/images/gt4.jpg"
                  alt="Kevin Hoagland metal detecting in the field"
                  fill
                  priority
                  sizes="12rem"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="w-full lg:self-center">
              <LeadForm
                className="mx-auto w-full max-w-md border-[#d0d5c4] shadow-lg"
                eyebrow="Free 75-page PDF"
                title="Download the Metal Detecting Masterclass"
                submitLabel="Send me the free book"
                redirectTo="/thank-you"
              />
              <p className="mx-auto mt-3 max-w-md text-center text-xs text-[#6d7760]">
                Same free book Kevin teaches from — delivered by email. Mark{" "}
                <span className="font-medium text-[#1a140f]">gpaastore@goldprospectors.org</span> as
                a safe sender.
              </p>
            </div>

            <div className="mx-auto hidden w-full max-w-[12rem] lg:block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#d0d5c4] bg-[#efe4cf] shadow-lg">
                <Image
                  src="/images/gt2.jpg"
                  alt="Kevin Hoagland teaching detector skills"
                  fill
                  sizes="12rem"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technique reinforcement */}
      <section className="border-b border-[#d0d5c4]/60 bg-[#eef0e8]/50">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              What you just saw
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Quiet the dirt. Hear the targets.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Ground balancing is how you teach your detector to ignore mineralized soil — so iron
              chatter and hot ground stop masking the signals that matter.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {takeaways.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm"
              >
                <h3 className="font-serif text-lg font-semibold text-[#1a140f]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Masterclass offer */}
      <section className="border-b border-[#d0d5c4]/60 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              Free masterclass
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Turn one tip into a complete field system
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Kevin&apos;s 75-page Metal Detecting Masterclass expands what you just watched —
              settings, threshold, ground balance, coil control, and recovery — so you leave the
              patch with habits you can repeat.
            </p>
            <ul className="mt-6 space-y-3">
              {masterclassBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm leading-relaxed text-[#5c4f3f]">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#5a6348] text-xs font-bold text-white"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <a href="#masterclass" className={cn(nhGoldButtonClass, "mt-8 px-8 py-3 text-base")}>
              Download the free masterclass
            </a>
          </div>

          <div className="space-y-4">
            {skillTestimonials.slice(0, 3).map((item) => (
              <blockquote
                key={item.name}
                className="rounded-2xl border border-[#e0d4b3] bg-[#f7f2e8] p-5 shadow-sm sm:p-6"
              >
                <p className="text-sm leading-relaxed text-[#5c4f3f]">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-3 text-sm font-semibold text-[#1a140f]">
                  {item.name}
                  <span className="mt-0.5 block text-xs font-medium text-[#6d7760]">{item.title}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge */}
      <section className="border-b border-[#3d4535]/40 bg-[#3d4535] text-[#f7f2e8]">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b8c4a8]">
            Next step
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-white sm:text-4xl">
            Now that you can make the ground disappear… here&apos;s where to swing the coil
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#c4b59a] sm:text-base">
            Skills stick when you practice on real mineralized ground. GPAA membership opens
            member claims nationwide — and Gold Trails field events with Kevin take the same
            lessons into the dirt at Italian Bar.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#membership" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
              See GPAA membership
            </a>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-lg border border-[#5a6348]/60 bg-[#4a5640]/40 px-8 py-3 text-base font-semibold !text-[#f7f2e8] no-underline hover:bg-[#4a5640]"
            >
              Gold Trails events
            </Link>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="scroll-mt-24 border-b border-[#d0d5c4]/60 bg-[#eef0e8]/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              GPAA membership
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Practice these skills on real gold ground
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Join the Gold Prospectors Association of America and bring Kevin&apos;s detector
              habits to member claims — with your household covered.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="grid gap-4 sm:grid-cols-2">
              {membershipBenefits.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#e0d4b3] bg-white p-5 shadow-sm"
                >
                  <h3 className="font-serif text-lg font-semibold text-[#1a140f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">{item.body}</p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-[#e0d4b3] bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5a6348]">
                Simple to start
              </p>
              <p className="mt-3 font-serif text-3xl font-semibold text-[#1a140f]">
                $199{" "}
                <span className="text-lg font-medium text-[#5c4f3f]">to join</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#5c4f3f]">
                Then about <strong className="text-[#1a140f]">$120/year</strong> to renew (monthly
                options available). See current plans and details on the GPAA membership page.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#5c4f3f]">
                <li>• Claims access for you and your household</li>
                <li>• Property Guide / claim resources</li>
                <li>• Magazine &amp; member community</li>
                <li>• Welcome materials to get you hunting</li>
              </ul>
              <div className="mt-7 flex flex-col gap-3">
                <JoinGpaaButton
                  className="w-full"
                  label="See GPAA membership details"
                  source="ground_balance_membership"
                />
                <a
                  href="#masterclass"
                  className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-[#f7f2e8] px-6 py-3 text-sm font-semibold !text-[#1a140f] no-underline hover:bg-[#efe4cf]"
                >
                  Start with the free masterclass first
                </a>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[#6d7760]">
                Opens goldprospectors.org/join — review benefits and plans before you decide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Kevin credibility */}
      <section className="border-b border-[#d0d5c4]/60 bg-white">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-[#e0d4b3] shadow-sm">
            <Image
              src="/images/gt3.jpg"
              alt="Kevin Hoagland"
              fill
              sizes="(max-width: 1024px) 100vw, 24rem"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
              Who is Kevin Hoagland?
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">
              Teacher first. Prospecting leader always.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              Kevin is a veteran prospector, GPAA/LDMA leader, and host of Gold Trails. His
              teaching turns detector settings — ground balance, threshold, tones, coil control —
              into practical routines beginners and experienced hunters can run on every hunt.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
              From the free masterclass to Italian Bar field events, the goal is the same: leave
              you more confident with your machine on real ground.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#f7f2e8]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 sm:py-16">
          <h2 className="max-w-2xl font-serif text-2xl font-semibold sm:text-3xl">
            Keep the tip. Build the system. Hunt real ground.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
            Download the free masterclass for the full detector playbook — then join GPAA when
            you&apos;re ready to practice on member claims.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <a href="#masterclass" className={cn(nhGoldButtonClass, "px-8 py-3 text-base")}>
              Download free masterclass
            </a>
            <JoinGpaaButton
              label="See GPAA membership"
              source="ground_balance_final"
              appearance="secondary"
            />
          </div>
          <p className="text-xs text-[#6d7760]">
            Want hands-on coaching with Kevin?{" "}
            <Link href="/events" className="font-semibold !text-[#5a6348] no-underline hover:!text-[#3d4535]">
              See Gold Trails events →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
