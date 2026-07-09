const jumpLinks = [
  { href: "#guides", mobile: "Guides", desktop: "Field Guides" },
  { href: "#certification", mobile: "Certificate", desktop: "Earn Your Certificate" },
  { href: "#about", mobile: "About", desktop: "Meet Kevin" },
  { href: "#webinars", mobile: "Webinars", desktop: "Webinars" },
  { href: "#events", mobile: "Events", desktop: "Upcoming Events" },
] as const;

export function NewHomeJumpStrip() {
  return (
    <nav
      className="border-b border-[#4a5640]/30 bg-[#5a6348] py-3"
      aria-label="Page sections"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 text-center text-xs font-medium tracking-wide sm:gap-x-3 sm:px-6 sm:text-sm">
        {jumpLinks.map((link, index) => (
          <li key={link.href} className="inline-flex items-center gap-x-2 sm:gap-x-3">
            {index > 0 ? (
              <span className="text-[#8a7d68]" aria-hidden>
                ·
              </span>
            ) : null}
            <a
              href={link.href}
              className="!text-[#c4b59a] no-underline transition-colors hover:!text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="sm:hidden">{link.mobile}</span>
              <span className="hidden sm:inline">{link.desktop}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
