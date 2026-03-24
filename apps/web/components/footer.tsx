import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6">
        <div className="inline-flex items-center gap-3">
          <Image
            src="/logo/goldtrailslogo.jpg"
            alt="Gold Trails logo"
            width={34}
            height={34}
            className="rounded-md border border-secondary/70"
          />
          <p className="text-xs text-foreground/70">
            Gold Trails with Kevin Hoagland
          </p>
        </div>
        <div className="inline-flex flex-wrap items-center gap-4 text-xs">
          <Link href="/" className="no-underline text-muted-foreground hover:text-foreground">Home</Link>
          <Link href="/masterclass" className="no-underline text-muted-foreground hover:text-foreground">Masterclass</Link>
          <Link href="/events" className="no-underline text-muted-foreground hover:text-foreground">Events</Link>
          <Link href="/shop" className="no-underline text-muted-foreground hover:text-foreground">Shop</Link>
          <Link href="/guides" className="no-underline text-muted-foreground hover:text-foreground">Guides</Link>
          <Link href="/about" className="no-underline text-muted-foreground hover:text-foreground">About</Link>
          <Link href="/testimonials" className="no-underline text-muted-foreground hover:text-foreground">Testimonials</Link>
          <Link href="/cart" className="no-underline text-muted-foreground hover:text-foreground">Cart</Link>
          <Link href="/contact" className="no-underline text-muted-foreground hover:text-foreground">Contact</Link>
          <Link href="/privacy" className="no-underline text-muted-foreground hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="no-underline text-muted-foreground hover:text-foreground">Terms</Link>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Gold Trails. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
