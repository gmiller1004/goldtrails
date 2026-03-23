import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutUrl } from "@/lib/shopify";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        variantId: z.string().min(1),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart items." }, { status: 400 });
  }

  const checkoutUrl = await createCheckoutUrl(parsed.data.items);
  if (!checkoutUrl) {
    return NextResponse.json({ error: "Could not create checkout URL." }, { status: 502 });
  }

  return NextResponse.json({ checkoutUrl }, { status: 200 });
}
