"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify";
import type { CartItem } from "@/lib/cart-types";

type CartContextValue = {
  items: CartItem[];
  addItem: (
    product: ShopifyProduct,
    selection?: { variantId: string; variantTitle?: string; price?: string },
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "goldtrails-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (
    product: ShopifyProduct,
    selection?: { variantId: string; variantTitle?: string; price?: string },
  ) => {
    const variantId = selection?.variantId ?? product.variantId;
    if (!variantId) return;
    const variant = product.variants.find((item) => item.id === variantId);
    if (variant && !variant.availableForSale) return;
    const variantTitle = selection?.variantTitle ?? product.variantTitle ?? undefined;
    const price = selection?.price ?? product.price;
    const lineTitle =
      variantTitle && variantTitle !== "Default Title"
        ? `${product.title} - ${variantTitle}`
        : product.title;

    setItems((prev) => {
      const existing = prev.find((item) => item.variantId === variantId);
      if (existing) {
        return prev.map((item) =>
          item.variantId === variantId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          id: variantId,
          variantId,
          variantTitle,
          handle: product.handle,
          title: lineTitle,
          price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
