"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";

export function Header() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const links = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/masterclass", label: "Masterclass" },
      { href: "/events", label: "Events" },
      { href: "/shop", label: "Shop" },
      { href: "/guides", label: "Guides" },
      { href: "/about", label: "About" },
    ],
    [],
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="border-b border-primary/20 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-3 no-underline">
          <Image
            src="/logo/goldtrailslogo.jpg"
            alt="Gold Trails logo"
            width={44}
            height={44}
            className="rounded-md border border-secondary/70"
          />
          <span className="text-sm font-semibold tracking-wide text-foreground">Gold Trails</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 text-sm font-medium md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "no-underline transition-colors",
                  isActive(link.href)
                    ? "font-semibold text-foreground"
                    : "font-medium text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/cart" className="relative inline-flex items-center no-underline text-foreground">
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 ? (
                <span className="absolute -right-3 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          </nav>

          <Link href="/cart" className="relative inline-flex items-center no-underline text-foreground md:hidden">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 ? (
              <span className="absolute -right-3 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                {itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-md border border-secondary p-2 text-foreground md:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isMobileOpen ? (
        <div className="border-t border-secondary/70 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "no-underline",
                  isActive(link.href) ? "font-semibold text-foreground" : "font-medium text-muted-foreground",
                )}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="no-underline text-foreground"
              onClick={() => setIsMobileOpen(false)}
            >
              Cart {itemCount > 0 ? `(${itemCount})` : ""}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
