"use client";

import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

type TrackedDownloadButtonProps = {
  href: string;
  filename?: string;
  children: React.ReactNode;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
  className?: string;
};

export function TrackedDownloadButton({
  href,
  filename,
  children,
  eventName,
  eventProps,
  className,
}: TrackedDownloadButtonProps) {
  return (
    <Button asChild className={className}>
      <a
        href={href}
        download={filename}
        onClick={() =>
          trackEvent(eventName, {
            href,
            ...(eventProps ?? {}),
          })
        }
      >
        {children}
      </a>
    </Button>
  );
}
