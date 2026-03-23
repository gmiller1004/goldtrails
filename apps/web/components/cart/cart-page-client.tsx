"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/components/cart/cart-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

function parsePrice(price: string) {
  const [currency, amount] = price.split(" ");
  return { currency: currency ?? "USD", amount: Number(amount ?? 0) };
}

export function CartPageClient() {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = useMemo(() => {
    const sum = items.reduce((acc, item) => {
      const { amount } = parsePrice(item.price);
      return acc + amount * item.quantity;
    }, 0);
    return sum.toFixed(2);
  }, [items]);

  const currency = items[0] ? parsePrice(items[0].price).currency : "USD";

  const checkout = async () => {
    if (!items.length) return;
    trackEvent("checkout_click", {
      item_count: items.reduce((count, item) => count + item.quantity, 0),
      value: Number(total),
      currency,
    });
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/cart/checkout-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
        }),
      });

      if (!response.ok) throw new Error("Checkout URL failed");
      const payload = (await response.json()) as { checkoutUrl?: string };
      if (!payload.checkoutUrl) throw new Error("Missing checkout URL");
      window.location.href = payload.checkoutUrl;
    } catch {
      toast.error("Could not start checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  if (!items.length) {
    return (
      <div className="rounded-xl border border-secondary bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-semibold text-foreground">Your cart is empty.</p>
        <p className="mt-2 text-sm text-muted-foreground">Add gear from the shop to begin checkout.</p>
        <Button className="mt-4" asChild>
          <Link href="/shop">Go to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{item.price}</p>
              <div className="inline-flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-6 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-foreground">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              {currency} {total}
            </span>
          </div>
          <Button className="w-full" disabled={isCheckingOut} onClick={checkout}>
            {isCheckingOut ? "Redirecting to checkout..." : "Checkout"}
          </Button>
          <Button variant="secondary" className="w-full" onClick={clearCart}>
            Clear Cart
          </Button>
          <p className="text-xs text-muted-foreground">
            Checkout is completed securely on our Shopify checkout page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
