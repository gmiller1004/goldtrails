import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Gold Trails collects, uses, and protects your personal information when you use the site and storefront.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">Legal</p>
        <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">1. Introduction</h2>
          <p>
            Gold Trails with Kevin Hoagland (&quot;Gold Trails,&quot; &quot;we,&quot; &quot;us,&quot;
            or &quot;our&quot;) respects your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard information when you visit our website, request free
            resources (such as the masterclass), sign up for email, browse our shop, or otherwise
            interact with us. By using the Site, you agree to this Policy and our{" "}
            <Link href="/terms" className="text-primary hover:text-primary/80">
              Terms of Use
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">2. Information we collect</h2>
          <p className="font-medium text-foreground">Information you provide</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Contact &amp; account:</strong> name, email address,
              phone number (if you provide it), and similar details when you fill out forms, join a
              list, register for events, or contact us.
            </li>
            <li>
              <strong className="text-foreground">Orders:</strong> billing and shipping details,
              order history, and communications about purchases when you buy through our checkout
              partner.
            </li>
            <li>
              <strong className="text-foreground">Communications:</strong> content of messages you send
              us (e.g., via our contact form or email).
            </li>
          </ul>
          <p className="font-medium text-foreground pt-2">Information collected automatically</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Device &amp; usage:</strong> IP address, browser
              type, device identifiers, pages viewed, referring/exit pages, and approximate location
              derived from IP.
            </li>
            <li>
              <strong className="text-foreground">Cookies &amp; similar technologies:</strong> we and
              our analytics partners may use cookies, pixels, and local storage to remember
              preferences, measure traffic, and improve the Site. You can control cookies through your
              browser settings.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">3. How we use information</h2>
          <p>We use personal information to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide the Site, free downloads, and customer support;</li>
            <li>Process and fulfill orders and event registrations;</li>
            <li>Send transactional messages (e.g., order confirmations, service notices);</li>
            <li>
              Send marketing or educational emails when you opt in or where permitted by law—you may
              unsubscribe at any time;
            </li>
            <li>Measure analytics, improve content, and secure the Site;</li>
            <li>Comply with law, enforce our terms, and protect rights and safety.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">4. Legal bases (EEA/UK visitors)</h2>
          <p>
            If applicable privacy laws require a &quot;legal basis,&quot; we rely on: (a) performance
            of a contract; (b) legitimate interests (e.g., analytics, security, improving services),
            balanced against your rights; (c) consent, where required (e.g., certain cookies or
            marketing); and (d) legal obligation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">5. Sharing of information</h2>
          <p>We may share information with:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Service providers</strong> who assist with hosting,
              email delivery (e.g., marketing platforms), customer support, analytics, payment
              processing, and e-commerce (e.g., Shopify)—subject to contractual safeguards;
            </li>
            <li>
              <strong className="text-foreground">Professional advisors</strong> (lawyers,
              accountants) when necessary;
            </li>
            <li>
              <strong className="text-foreground">Authorities</strong> when required by law or to
              protect rights, safety, and security;
            </li>
            <li>
              <strong className="text-foreground">Business transfers</strong> in connection with a
              merger, acquisition, or asset sale, with notice as required by law.
            </li>
          </ul>
          <p>We do not sell your personal information for monetary consideration as defined by U.S. state &quot;sale&quot; laws in the traditional sense of selling lists for cash.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">6. Retention</h2>
          <p>
            We retain information as long as needed for the purposes above, including legal,
            accounting, and dispute resolution requirements. Marketing preferences and suppression lists
            may be retained to honor unsubscribe requests.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">7. Your choices &amp; rights</h2>
          <p>Depending on where you live, you may have the right to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Access, correct, or delete certain personal information;</li>
            <li>Object to or restrict certain processing;</li>
            <li>Port data where applicable;</li>
            <li>Withdraw consent where processing is consent-based;</li>
            <li>Opt out of certain &quot;sharing&quot; or targeted advertising as defined by U.S. state laws (e.g., via browser signals where recognized).</li>
          </ul>
          <p>
            To exercise these rights,{" "}
            <Link href="/contact" className="text-primary hover:text-primary/80">
              contact us
            </Link>
            . We may verify your request and respond as required by law. You may appeal certain
            decisions as permitted by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">8. Children</h2>
          <p>
            The Site is not directed to children under 13 (or 16 in some jurisdictions). We do not
            knowingly collect personal information from children. If you believe we have collected
            such information, please contact us and we will take appropriate steps.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">9. International users</h2>
          <p>
            If you access the Site from outside the United States, your information may be processed
            in the U.S. or other countries where we or our vendors operate, which may have different
            data protection laws than your country.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">10. Security</h2>
          <p>
            We use reasonable administrative, technical, and organizational measures to protect
            information. No method of transmission or storage is 100% secure; we cannot guarantee
            absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">11. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will post the updated version on
            this page and revise the &quot;Last updated&quot; date. Material changes may be communicated
            as required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">12. Contact</h2>
          <p>
            For privacy-related questions or requests, please{" "}
            <Link href="/contact" className="text-primary hover:text-primary/80">
              contact us
            </Link>{" "}
            through the Site.
          </p>
        </section>
      </div>
    </div>
  );
}
