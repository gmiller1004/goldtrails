"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type CertificationQuizNextStepsProps = {
  quizSlug: string;
  passed: boolean;
  claimToken?: string;
};

const nextSteps = [
  {
    id: "gpaa_join",
    href: "https://goldprospectors.org/join",
    external: true,
    title: "Join GPAA",
    body: "Get places to go — member claims, chapters, and a community that hunts for real.",
  },
  {
    id: "magazine",
    href: "https://goldprospectors.org/publications",
    external: true,
    title: "Gold Prospectors Magazine",
    body: "More metal detecting tips and tricks, including Kevin’s Where’s the Gold column. First issue free.",
  },
  {
    id: "events",
    href: "/events",
    external: false,
    title: "Gold Trails events",
    body: "Put what you just learned on real ground with Kevin in the field.",
  },
] as const;

export function CertificationQuizNextSteps({
  quizSlug,
  passed,
  claimToken,
}: CertificationQuizNextStepsProps) {
  const showClaim = passed && quizSlug === "final" && Boolean(claimToken);

  return (
    <section className="mt-8 border-t border-[#e0d4b3] pt-8" aria-labelledby="quiz-next-steps-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">Keep going</p>
      <h3 id="quiz-next-steps-heading" className="mt-2 font-serif text-xl font-semibold text-[#1a140f]">
        {passed ? "You showed up — now put it to work" : "Still building — these help between attempts"}
      </h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#5c4f3f]">
        While this quiz is fresh, here are the best next steps for places to hunt, ongoing tips, and
        field time.
      </p>

      {showClaim ? (
        <Link
          href={`/certification/claim?token=${encodeURIComponent(claimToken!)}`}
          onClick={() =>
            trackEvent("certification_quiz_cta_click", {
              slug: quizSlug,
              cta: "claim_reward",
              passed,
            })
          }
          className="mt-5 flex flex-col gap-1 rounded-xl border border-[#d4a017] bg-[#fbf6ea] px-4 py-4 no-underline transition-colors hover:bg-[#f5ecd8] sm:px-5"
        >
          <span className="text-sm font-semibold text-[#1a140f]">Claim your certificate &amp; hat</span>
          <span className="text-sm leading-relaxed text-[#5c4f3f]">
            You passed the final. Enter shipping and we’ll apply your reward discount.
          </span>
        </Link>
      ) : null}

      <ul className="mt-4 space-y-3">
        {nextSteps.map((step) => {
          const className =
            "flex flex-col gap-1 rounded-xl border border-[#d0d5c4] bg-[#f7f2e8]/50 px-4 py-4 no-underline transition-colors hover:border-[#5a6348]/40 hover:bg-[#eef0e8] sm:px-5";
          const content = (
            <>
              <span className="text-sm font-semibold text-[#1a140f]">{step.title}</span>
              <span className="text-sm leading-relaxed text-[#5c4f3f]">{step.body}</span>
            </>
          );
          const onClick = () =>
            trackEvent("certification_quiz_cta_click", {
              slug: quizSlug,
              cta: step.id,
              passed,
              href: step.href,
            });

          return (
            <li key={step.id}>
              {step.external ? (
                <a
                  href={step.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClick}
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <Link href={step.href} onClick={onClick} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
