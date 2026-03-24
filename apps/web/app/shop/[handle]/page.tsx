import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/shop/product-image-gallery";
import { ProductPurchaseControls } from "@/components/shop/product-purchase-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDetectors, getShopProductByHandle } from "@/lib/shopify";

function teaser(text: string) {
  const cleaned = text.trim();
  if (!cleaned) return "Field-tested gear for serious detectorists.";
  return cleaned;
}

function formatDate(value?: string | null) {
  if (!value) return null;
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  let parsed: Date;
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    parsed = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    parsed = new Date(value);
  }
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

function formatDateRange(start?: string | null, end?: string | null, fallback?: string | null) {
  const startFormatted = formatDate(start);
  const endFormatted = formatDate(end);
  if (startFormatted && endFormatted) return `${startFormatted} - ${endFormatted}`;
  if (startFormatted) return startFormatted;
  if (endFormatted) return endFormatted;
  return formatDate(fallback);
}

export default async function ShopProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getShopProductByHandle(handle);
  if (!product) notFound();

  const all = await getDetectors();
  const related = all.filter((item) => item.handle !== handle).slice(0, 3);
  const isEvent = product.tags.includes("gold-trails-event");
  const eventDate = formatDateRange(product.eventStartDate, product.eventEndDate, product.eventDate);
  const eventLocation = product.eventLocation?.trim() || null;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-14">
      <section className="rounded-2xl border border-secondary bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
          <ProductImageGallery
            title={product.title}
            images={product.images.length ? product.images : product.image ? [product.image] : []}
          />

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">
              {isEvent ? "Event Detail" : "Shop Detail"}
            </p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{product.title}</h1>
            {isEvent ? (
              <div className="flex flex-wrap gap-2">
                {eventDate ? (
                  <span className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-foreground sm:text-sm">
                    {eventDate}
                  </span>
                ) : null}
                {eventLocation ? (
                  <span className="inline-flex items-center rounded-full border border-secondary bg-muted px-3 py-1 text-xs font-medium text-foreground sm:text-sm">
                    {eventLocation}
                  </span>
                ) : null}
              </div>
            ) : null}
            <p className="text-sm leading-relaxed text-muted-foreground">{teaser(product.description)}</p>

            <div className="flex flex-wrap gap-3">
              <div className="w-full sm:w-auto sm:min-w-[280px]">
                <ProductPurchaseControls product={product} className="w-full" />
              </div>
              <Link href="/cart" className="inline-flex items-center text-sm font-medium no-underline">
                Go to cart
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-muted/30 p-4 sm:p-6">
        <h2 className="mb-4 text-2xl font-semibold text-foreground">Related Gear</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {related.map((item) => (
            <Card key={item.id}>
              <CardHeader className="space-y-2">
                <CardTitle className="text-base text-foreground">
                  <Link href={`/shop/${item.handle}`} className="no-underline">
                    {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductPurchaseControls product={item} className="w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
