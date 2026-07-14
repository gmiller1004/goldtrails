"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { trackEvent } from "@/lib/analytics";
import { navigateToShopifyCheckout } from "@/lib/navigate-to-shopify-checkout";
import { cn } from "@/lib/utils";

type CertificationClaimClientProps = {
  token: string;
  learnerName?: string | null;
};

export function CertificationClaimClient({ token, learnerName }: CertificationClaimClientProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const greeting = learnerName?.trim() ? learnerName.trim() : null;

  const checkout = async () => {
    setIsCheckingOut(true);
    trackEvent("certification_claim_checkout_click");
    try {
      const response = await fetch("/api/certification/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        checkoutUrl?: string;
      };

      if (!response.ok || !data.success || !data.checkoutUrl) {
        throw new Error(data.error ?? "Could not start checkout.");
      }

      trackEvent("certification_claim_checkout_redirect", {
        host: (() => {
          try {
            return new URL(data.checkoutUrl).host;
          } catch {
            return "unknown";
          }
        })(),
      });
      navigateToShopifyCheckout(data.checkoutUrl);
      setIsCheckingOut(false);
    } catch (error) {
      trackEvent("certification_claim_checkout_failure");
      toast.error(
        error instanceof Error ? error.message : "Could not start checkout. Please try again.",
      );
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1a140f]">
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
          Certification rewards
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">Claim your certificate &amp; hat</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
          {greeting ? `Nice work, ${greeting}. ` : null}
          You&apos;ve passed the final quiz. Continue to checkout to enter your shipping address —
          your reward discount is applied automatically.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            disabled={isCheckingOut}
            onClick={checkout}
            className={cn(nhGoldButtonClass, "px-6 py-3")}
          >
            {isCheckingOut ? "Redirecting to checkout…" : "Continue to checkout"}
          </Button>
          <Link
            href="/#certification"
            className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-6 py-3 text-sm font-semibold !text-[#1a140f] no-underline hover:bg-[#efe4cf]"
          >
            Back to certification
          </Link>
        </div>
      </div>
    </div>
  );
}
