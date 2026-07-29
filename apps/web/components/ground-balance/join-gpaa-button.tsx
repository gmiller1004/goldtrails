"use client";

import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { nhGoldButtonClass } from "@/components/new-home/new-home-styles";

const JOIN_URL = "https://goldprospectors.org/join";

type JoinGpaaButtonProps = {
  label?: string;
  className?: string;
  source: string;
  appearance?: "primary" | "secondary";
};

export function JoinGpaaButton({
  label = "Learn about GPAA membership",
  className,
  source,
  appearance = "primary",
}: JoinGpaaButtonProps) {
  return (
    <a
      href={JOIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("cta_click", { cta: "join_gpaa", source })}
      className={cn(
        appearance === "primary"
          ? cn(nhGoldButtonClass, "px-6 py-3 text-sm")
          : "inline-flex items-center justify-center rounded-lg border border-[#e0d4b3] bg-[#f7f2e8] px-6 py-3 text-sm font-semibold !text-[#1a140f] no-underline hover:bg-[#efe4cf]",
        className,
      )}
    >
      {label}
    </a>
  );
}
