"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

const hiddenOn = ["/masterclass", "/cart", "/thank-you"];

export function MobileMasterclassCta() {
  const pathname = usePathname();
  if (hiddenOn.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/20 bg-white/95 p-3 backdrop-blur md:hidden">
      <Button asChild className="w-full font-semibold">
        <Link
          href="/masterclass"
          onClick={() =>
            trackEvent("sticky_mobile_cta_click", {
              cta: "masterclass",
            })
          }
        >
          Get Free Masterclass
        </Link>
      </Button>
    </div>
  );
}
