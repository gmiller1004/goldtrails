import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use – Gold Trails",
  description: "Terms governing use of the Gold Trails website, content, and storefront.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-10 px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-primary">Legal</p>
        <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: March 2026</p>
      </header>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">1. Agreement to these terms</h2>
          <p>
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of the Gold Trails
            website and related services (collectively, the &quot;Site&quot;), operated by or on
            behalf of Gold Trails with Kevin Hoagland (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;). By accessing or using the Site, you agree to be bound by these Terms and
            our{" "}
            <Link href="/privacy" className="text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
            . If you do not agree, do not use the Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">2. Eligibility &amp; accounts</h2>
          <p>
            You must be at least 18 years old (or the age of majority in your jurisdiction) to use
            certain features of the Site, including submitting forms or completing purchases. You are
            responsible for providing accurate information and for maintaining the confidentiality of
            any account credentials you may use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">3. Use of the Site</h2>
          <p>You agree to use the Site only for lawful purposes and in accordance with these Terms. You will not:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Violate any applicable law or regulation;</li>
            <li>Attempt to gain unauthorized access to the Site, servers, or networks;</li>
            <li>Use automated means (e.g., scraping, bots) in a way that overloads or harms the Site;</li>
            <li>Transmit malware, spam, or harmful code;</li>
            <li>Misrepresent your identity or affiliation.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">4. Intellectual property</h2>
          <p>
            The Site, including text, graphics, logos, images, videos, course materials, and layout,
            is owned by us or our licensors and is protected by copyright, trademark, and other
            intellectual property laws. You may view and print content for personal, non-commercial
            use only. You may not copy, modify, distribute, sell, or create derivative works without
            our prior written permission, except as allowed by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">5. Free resources &amp; email</h2>
          <p>
            When you request free resources (such as the masterclass download), you agree that we may
            send you related emails and that your information will be handled as described in our
            Privacy Policy. You may unsubscribe from marketing emails using the link in those messages,
            subject to transactional or legal notices we may still send.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">6. Shop, events &amp; third-party checkout</h2>
          <p>
            Product listings, availability, and prices may change without notice. Certain purchases
            (including gear and event registrations) may be fulfilled through our e-commerce partner
            (e.g., Shopify). Checkout, payment processing, shipping, returns, and related policies may
            be subject to that platform&apos;s terms and our stated policies at checkout. You are
            responsible for reviewing product descriptions, event details, and fees before completing
            a purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">7. Third-party links</h2>
          <p>
            The Site may link to third-party websites or services (including partner organizations and
            retailers). We do not control and are not responsible for third-party content, policies, or
            practices. Your use of third-party sites is at your own risk and subject to their terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">8. Educational content &amp; disclaimer</h2>
          <p>
            Content on the Site (including guides, videos, and masterclass materials) is for general
            educational and entertainment purposes. It is not professional, legal, financial, or
            safety advice. Metal detecting and prospecting involve risks; you are solely responsible
            for complying with local laws, obtaining permissions, and using equipment safely.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">9. Disclaimer of warranties</h2>
          <p>
            THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot;
            WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL
            BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">10. Limitation of liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE AND OUR AFFILIATES, OFFICERS, DIRECTORS,
            EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM
            YOUR USE OF THE SITE OR CONTENT, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR
            TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS OR THE SITE WILL NOT EXCEED THE
            GREATER OF (A) THE AMOUNT YOU PAID US FOR THE SPECIFIC TRANSACTION GIVING RISE TO THE CLAIM
            IN THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS (US $100), IF
            NO SUCH PAYMENT APPLIES. SOME JURISDICTIONS DO NOT ALLOW CERTAIN LIMITATIONS; IN THOSE
            CASES, OUR LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">11. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless Gold Trails and its affiliates from any
            claims, damages, losses, or expenses (including reasonable attorneys&apos; fees) arising
            from your use of the Site, your violation of these Terms, or your violation of any rights of
            a third party.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">12. Changes</h2>
          <p>
            We may update these Terms from time to time. We will post the revised Terms on this page
            and update the &quot;Last updated&quot; date. Continued use of the Site after changes
            constitutes acceptance of the revised Terms. If you do not agree, you must stop using the
            Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">13. Governing law &amp; disputes</h2>
          <p>
            These Terms are governed by the laws of the United States and the State of Arizona,
            without regard to conflict-of-law principles, except where preempted by federal law. You
            agree that exclusive jurisdiction for any dispute arising out of these Terms or the Site
            lies in the state or federal courts located in Arizona, and you consent to personal
            jurisdiction there.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-lg font-semibold text-foreground">14. Contact</h2>
          <p>
            For questions about these Terms, please{" "}
            <Link href="/contact" className="text-primary hover:text-primary/80">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
