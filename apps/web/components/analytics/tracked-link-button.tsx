"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkButtonProps = {
  href: string;
  children: React.ReactNode;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
} & Omit<ButtonProps, "asChild">;

export function TrackedLinkButton({
  href,
  children,
  eventName,
  eventProps,
  ...buttonProps
}: TrackedLinkButtonProps) {
  return (
    <Button
      {...buttonProps}
      asChild
      onClick={(event) => {
        buttonProps.onClick?.(event);
        trackEvent(eventName, {
          href,
          ...(eventProps ?? {}),
        });
      }}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
