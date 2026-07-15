import { cn } from "@/lib/utils";

/**
 * Renders Shopify product body copy.
 * Prefers `descriptionHtml` so paragraph / list structure from Admin is preserved.
 */
export function ProductDescription({
  html,
  plain,
  className,
  emptyFallback = "Field-tested gear for serious detectorists.",
}: {
  html?: string | null;
  plain?: string | null;
  className?: string;
  emptyFallback?: string;
}) {
  const trimmedHtml = html?.trim() ?? "";
  if (trimmedHtml) {
    return (
      <div
        className={cn(
          "product-description text-sm leading-relaxed text-[#5c4f3f]",
          "[&_p]:mb-3 [&_p:last-child]:mb-0",
          "[&_ul]:mb-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5",
          "[&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5",
          "[&_li]:leading-relaxed",
          "[&_a]:font-semibold [&_a]:text-[#5a6348] [&_a]:underline-offset-2 hover:[&_a]:text-[#3d4535]",
          "[&_strong]:font-semibold [&_strong]:text-[#1a140f]",
          "[&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:font-serif [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-[#1a140f]",
          "[&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:font-serif [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1a140f]",
          "[&_br]:block [&_br]:content-[''] [&_br]:mb-2",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: trimmedHtml }}
      />
    );
  }

  const cleaned = plain?.trim() ?? "";
  if (!cleaned) {
    return <p className={cn("text-sm leading-relaxed text-muted-foreground", className)}>{emptyFallback}</p>;
  }

  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (paragraphs.length > 1) {
    return (
      <div className={cn("space-y-3 text-sm leading-relaxed text-[#5c4f3f]", className)}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return <p className={cn("text-sm leading-relaxed text-[#5c4f3f]", className)}>{cleaned}</p>;
}
