"use client";

import { useEffect } from "react";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { cn } from "@/lib/utils";

type ClaimCheckoutRedirectProps = {
  checkoutUrl: string;
};

/**
 * Shopify checkout cannot load in iframes (X-Frame-Options: DENY → ERR_BLOCKED_BY_RESPONSE).
 * Navigate the top-level window so previews / embedded browsers break out.
 */
export function ClaimCheckoutRedirect({ checkoutUrl }: ClaimCheckoutRedirectProps) {
  useEffect(() => {
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = checkoutUrl;
        return;
      }
    } catch {
      // Cross-origin frame access can throw; fall through to same-window navigate.
    }
    window.location.assign(checkoutUrl);
  }, [checkoutUrl]);

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1a140f]">
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
          Certification rewards
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">Taking you to checkout…</h1>
        <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
          We verified your final quiz pass and applied your reward discount. If checkout doesn&apos;t
          open automatically, use the button below — open it in a full browser tab (not an in-app
          preview).
        </p>
        <a href={checkoutUrl} target="_blank" rel="noopener noreferrer" className={cn(nhGoldButtonClass, "mt-8 px-6 py-3")}>
          Continue to Shopify checkout
        </a>
      </div>
    </div>
  );
}
