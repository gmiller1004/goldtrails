"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { cn } from "@/lib/utils";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";

const navLinks = [
  { href: "#masterclass", label: "Masterclass" },
  { href: "#guides", label: "Guides" },
  { href: "#certification", label: "Certificate" },
  { href: "#webinars", label: "Webinars" },
  { href: "#events", label: "Events" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function NewHomeHeader() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartLink = useMemo(
    () => (
      <Link
        href="/cart"
        className="relative inline-flex items-center rounded-md p-2 text-[#1a140f] no-underline hover:bg-[#f0e6d0]"
        aria-label="Cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
            {itemCount}
          </span>
        ) : null}
      </Link>
    ),
    [itemCount],
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background,box-shadow] duration-200",
        scrolled
          ? "border-[#d0d5c4]/90 bg-[#f7f2e8]/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-[#f7f2e8]/90 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="#top" className="inline-flex min-w-0 items-center gap-2.5 no-underline">
          <Image
            src="/logo/goldtrailslogo.jpg"
            alt="Gold Trails"
            width={40}
            height={40}
            className="rounded-md border border-[#e0d4b3]"
          />
          <span className="truncate text-sm font-semibold tracking-wide text-[#1a140f]">Gold Trails</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-[#5c4f3f] no-underline transition-colors hover:bg-[#eef0e8] hover:text-[#1a140f]"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/shop"
            className="rounded-md px-2.5 py-2 text-sm font-medium text-[#5c4f3f] no-underline hover:bg-[#efe4cf] hover:text-[#1a140f]"
          >
            Shop
          </Link>
          {cartLink}
          <a
            href="#masterclass"
            className={cn(nhGoldButtonClass, "ml-1 px-4 py-2 text-sm")}
          >
            Free book
          </a>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          {cartLink}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-md border border-[#e0d4b3] p-2 text-[#1a140f]"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[#e0d4b3]/80 bg-[#f7f2e8] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-[#1a140f] no-underline hover:bg-[#efe4cf]"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/shop"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-[#1a140f] no-underline hover:bg-[#efe4cf]"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <a
              href="#masterclass"
              className={cn(nhGoldButtonClass, "mt-2 px-4 py-3 text-sm")}
              onClick={() => setMenuOpen(false)}
            >
              Get the free masterclass
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function NewHomeFooter() {
  return (
    <footer className="border-t border-[#e0d4b3] bg-[#1f1810] text-[#f7f2e8]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex items-center gap-3">
            <Image
              src="/logo/goldtrailslogo.jpg"
              alt="Gold Trails logo"
              width={36}
              height={36}
              className="rounded-md border border-[#5c4f3f]"
            />
            <div>
              <p className="text-sm font-semibold text-white">Gold Trails with Kevin Hoagland</p>
              <p className="text-xs text-[#c4b59a]">Field training · Masterclass · GPAA education</p>
            </div>
          </div>
          <a
            href="#masterclass"
            className={cn(nhGoldButtonClass, "w-full px-5 py-2.5 text-sm sm:w-auto")}
          >
            Download free masterclass
          </a>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="text-[#c4b59a] no-underline hover:text-white">
            Current home
          </Link>
          <Link href="/events" className="text-[#c4b59a] no-underline hover:text-white">
            Events
          </Link>
          <Link href="/shop" className="text-[#c4b59a] no-underline hover:text-white">
            Shop
          </Link>
          <Link href="/contact" className="text-[#c4b59a] no-underline hover:text-white">
            Contact
          </Link>
          <Link href="/privacy" className="text-[#c4b59a] no-underline hover:text-white">
            Privacy
          </Link>
          <Link href="/terms" className="text-[#c4b59a] no-underline hover:text-white">
            Terms
          </Link>
        </div>
        <p className="text-xs text-[#8a7d68]">© {new Date().getFullYear()} Gold Trails. All rights reserved.</p>
      </div>
    </footer>
  );
}
