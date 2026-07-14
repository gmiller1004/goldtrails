import Link from "next/link";
import { redirect } from "next/navigation";
import { hasPassedQuiz } from "@/lib/certification/attempts";
import { getEnrollmentByToken } from "@/lib/certification/enrollments";
import {
  CERTIFICATION_REWARD_DISCOUNT_CODE,
  CERTIFICATION_REWARD_PRODUCT_ID,
} from "@/lib/certification/reward";
import { createCheckoutUrl, getProductDefaultVariantId } from "@/lib/shopify";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Claim your certificate & hat",
  description: "Claim your GPAA Metal Detecting Certificate and Gold Trails hat after passing the final quiz.",
  path: "/certification/claim",
});

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

function ClaimError({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1a140f]">
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
          Certification rewards
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">{title}</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">{body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/new-home#certification"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold !text-primary-foreground no-underline hover:bg-primary/90"
          >
            Certification home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-6 py-3 text-sm font-semibold !text-[#1a140f] no-underline hover:bg-[#efe4cf]"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function CertificationClaimPage({ searchParams }: PageProps) {
  const { token: rawToken } = await searchParams;
  const token = rawToken?.trim() ?? "";

  if (!token) {
    return (
      <ClaimError
        title="Open your claim link from email"
        body="This page needs your personalized certification link. Use the button in your final-quiz success email so we can verify you passed and start checkout."
      />
    );
  }

  if (!process.env.DATABASE_URL?.trim()) {
    return (
      <ClaimError
        title="Claim temporarily unavailable"
        body="We couldn’t verify certification progress right now. Please try again in a few minutes."
      />
    );
  }

  let enrollment: Awaited<ReturnType<typeof getEnrollmentByToken>> | null = null;
  try {
    enrollment = await getEnrollmentByToken(token);
  } catch (error) {
    console.error("[certification/claim] enrollment lookup failed:", error);
    return (
      <ClaimError
        title="Claim temporarily unavailable"
        body="We couldn’t verify your enrollment right now. Please try again in a few minutes."
      />
    );
  }

  if (!enrollment) {
    return (
      <ClaimError
        title="This claim link isn’t valid"
        body="We couldn’t match that token to a certification enrollment. Use the link from your latest success email, or contact us if you think this is a mistake."
      />
    );
  }

  let passedFinal = false;
  try {
    passedFinal = await hasPassedQuiz(enrollment.id, "final");
  } catch (error) {
    console.error("[certification/claim] pass check failed:", error);
    return (
      <ClaimError
        title="Claim temporarily unavailable"
        body="We couldn’t verify your quiz results right now. Please try again in a few minutes."
      />
    );
  }

  if (!passedFinal) {
    return (
      <ClaimError
        title="Final quiz not passed yet"
        body="Your certificate and hat unlock after you pass the comprehensive final quiz. Open your final quiz from the Week 4 success email, then come back to claim."
      />
    );
  }

  const variantId = await getProductDefaultVariantId(CERTIFICATION_REWARD_PRODUCT_ID);
  if (!variantId) {
    console.error(
      "[certification/claim] Could not resolve reward variant for product",
      CERTIFICATION_REWARD_PRODUCT_ID,
    );
    return (
      <ClaimError
        title="Reward checkout isn’t ready"
        body="We couldn’t load the certificate & hat product from Shopify. Please contact us and we’ll get your reward shipping."
      />
    );
  }

  const checkoutUrl = await createCheckoutUrl([{ variantId, quantity: 1 }], {
    discountCodes: [CERTIFICATION_REWARD_DISCOUNT_CODE],
    email: enrollment.email,
  });

  if (!checkoutUrl) {
    return (
      <ClaimError
        title="Couldn’t start checkout"
        body="Shopify checkout didn’t open. Please try again, or contact us so we can process your certificate and hat manually."
      />
    );
  }

  redirect(checkoutUrl);
}
