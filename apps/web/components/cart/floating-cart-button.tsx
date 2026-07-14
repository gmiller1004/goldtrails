"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Keeps cart access on-screen after adding items (events/shop are long pages).
 * Sits above the mobile masterclass sticky CTA.
 */
export function FloatingCartButton() {
  const { itemCount } = useCart();
  const pathname = usePathname();

  if (itemCount <= 0) return null;
  if (pathname.startsWith("/cart")) return null;

  return (
    <Link
      href="/cart"
      aria-label={`Open cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      onClick={() => trackEvent("floating_cart_click", { item_count: itemCount })}
      className={cn(
        "fixed z-50 inline-flex items-center gap-2 rounded-full border border-[#e0d4b3] bg-[#1a140f] px-4 py-3 text-sm font-semibold !text-[#f7f2e8] no-underline shadow-lg",
        "right-4 bottom-20 md:bottom-6",
        "transition-transform hover:scale-[1.02] active:scale-[0.98]",
      )}
    >
      <span className="relative inline-flex">
        <ShoppingCart className="h-5 w-5" aria-hidden />
        <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      </span>
      <span className="pr-0.5">Cart</span>
    </Link>
  );
}
