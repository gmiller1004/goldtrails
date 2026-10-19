import Image from "next/image";
import Link from "next/link";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";
import { eventVenues, venuePath } from "@/lib/events/venues";
import { cn } from "@/lib/utils";

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
          <a href="/#masterclass" className={cn(nhGoldButtonClass, "w-full px-5 py-2.5 text-sm sm:w-auto")}>
            Download free masterclass
          </a>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/" className="text-[#c4b59a] no-underline hover:text-white">
            Home
          </Link>
          <Link href="/events" className="text-[#c4b59a] no-underline hover:text-white">
            Events
          </Link>
          {eventVenues.map((venue) => (
            <Link key={venue.slug} href={venuePath(venue)} className="text-[#c4b59a] no-underline hover:text-white">
              Events: {venue.stateName}
            </Link>
          ))}
          <Link href="/guides" className="text-[#c4b59a] no-underline hover:text-white">
            Guides
          </Link>
          <Link href="/about" className="text-[#c4b59a] no-underline hover:text-white">
            About
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
