"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

const GPAA_MEMBERSHIP_URL =
  "https://gpaastore.com/pages/membership-in-the-gold-prospectors-association-of-america";

export function GpaaMembershipPitch() {
  return (
    <Card className="overflow-hidden border-primary/25 bg-gradient-to-br from-muted/40 to-white shadow-sm">
      <CardHeader className="pb-2">
        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-primary">Gold in the ground</p>
        <CardTitle className="font-serif text-2xl text-foreground sm:text-3xl">
          Take your new skills from the masterclass to real claims
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-left text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p className="text-foreground">
          You&apos;re building toward <strong>expert-level confidence</strong> in metal detecting—and
          with <strong>gold trading at over $4,000 an ounce</strong>, every swing matters.
        </p>
        <p>
          For <strong>as little as $199 for a full year</strong>, you and your family can join the
          Gold Prospectors Association of America and get access to{" "}
          <strong>more than 200 member-exclusive claims</strong>—real ground where you can bring
          your detector, read the land, and hunt for gold alongside a nationwide community.
        </p>
        <div className="pt-1">
          <Button asChild className="w-full sm:w-auto">
            <a
              href={GPAA_MEMBERSHIP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("thank_you_cta_click", {
                  cta: "gpaa_membership",
                  href: GPAA_MEMBERSHIP_URL,
                })
              }
            >
              Explore GPAA membership
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Membership is offered by the Gold Prospectors Association of America (GPAA). Opens the
          official GPAA store in a new tab.
        </p>
      </CardContent>
    </Card>
  );
}
