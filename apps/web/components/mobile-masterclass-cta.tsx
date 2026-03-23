"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const hiddenOn = ["/masterclass", "/cart", "/thank-you"];

export function MobileMasterclassCta() {
  const pathname = usePathname();
  if (hiddenOn.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-white/95 p-3 backdrop-blur md:hidden">
      <Link
        href="/masterclass"
        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline"
        onClick={() =>
          trackEvent("sticky_mobile_cta_click", {
            cta: "masterclass",
          })
        }
      >
        Get Free Masterclass
      </Link>
    </div>
  );
}
