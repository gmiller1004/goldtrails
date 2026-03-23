import { CartPageClient } from "@/components/cart/cart-page-client";

export default function CartPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-10 sm:px-6 sm:py-14">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Your Cart</p>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">Review Your Gear</h1>
      </header>
      <CartPageClient />
    </div>
  );
}
