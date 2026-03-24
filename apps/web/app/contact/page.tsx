import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Gold Trails about events, shop orders, media, the free masterclass, or general questions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10 pb-24 sm:px-6 sm:py-14 md:pb-14">
      <header className="text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-primary">Gold Trails</p>
        <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Contact us</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:text-base">
          Questions about Gold Trails events, the free masterclass, gear orders, or media? Send us a
          note and we&apos;ll reply as soon as we can.
        </p>
      </header>

      <ContactForm />
    </div>
  );
}
