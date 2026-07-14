"use client";

import { useEffect, useState } from "react";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { cn } from "@/lib/utils";

type ClaimCheckoutRedirectProps = {
  checkoutUrl: string;
};

function isEmbeddedBrowser() {
  try {
    return window.self !== window.top;
  } catch {
    // Cross-origin parent → treat as embedded
    return true;
  }
}

/**
 * Shopify checkout sets X-Frame-Options: DENY. Navigating there from Cursor’s
 * Simple Browser / other iframes yields ERR_BLOCKED_BY_RESPONSE.
 * Auto-redirect only in a real top-level tab; otherwise show an open-externally CTA.
 */
export function ClaimCheckoutRedirect({ checkoutUrl }: ClaimCheckoutRedirectProps) {
  const [embedded, setEmbedded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isEmbeddedBrowser()) {
      setEmbedded(true);
      return;
    }
    window.location.assign(checkoutUrl);
  }, [checkoutUrl]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(checkoutUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f2e8] text-[#1a140f]">
      <div className="mx-auto w-full max-w-xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#5a6348]">
          Certification rewards
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold">
          {embedded ? "Open checkout in your browser" : "Taking you to checkout…"}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#5c4f3f] sm:text-base">
          {embedded ? (
            <>
              We verified your final quiz pass and built your reward cart. Shopify checkout can&apos;t
              open inside this preview window — use the button below (or paste the link into Chrome /
              Safari).
            </>
          ) : (
            <>
              We verified your final quiz pass and applied your reward discount. If checkout doesn&apos;t
              open automatically, use the button below.
            </>
          )}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(nhGoldButtonClass, "px-6 py-3")}
          >
            Open Shopify checkout
          </a>
          <button
            type="button"
            onClick={copyUrl}
            className="inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-white px-6 py-3 text-sm font-semibold text-[#1a140f] hover:bg-[#efe4cf]"
          >
            {copied ? "Link copied" : "Copy checkout link"}
          </button>
        </div>
        {embedded ? (
          <p className="mt-6 break-all rounded-xl border border-[#e0d4b3] bg-white p-3 text-xs text-[#6d7760]">
            {checkoutUrl}
          </p>
        ) : null}
      </div>
    </div>
  );
}
