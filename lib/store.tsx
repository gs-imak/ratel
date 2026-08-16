"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PRODUCTS,
  fmt,
  productById,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FLAT,
  type Product,
} from "./products";

/* ----------------------------- Cart ------------------------------ */
export type CartLine = Product & { qty: number; lineLabel: string };

type CartState = Record<string, number>;
type CartCtx = {
  items: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  subtotalLabel: string;
  shippingLabel: string;
  totalLabel: string;
  shipNote: string;
  add: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};
const CartContext = createContext<CartCtx | null>(null);

/* Empty. A seeded cart would put products in a first-time visitor's basket that
   they never chose, and the header would read "Panier 3" before they clicked
   anything. */
const INITIAL_CART: CartState = {};

export function Providers({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(INITIAL_CART);

  useEffect(() => {
    const saved = localStorage.getItem("ratel.cart");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as CartState;
      /* Drop ids the catalogue no longer contains, which is what happens the day
         the real products replace the placeholders. The render path already skips
         them, but pruning here stops them living in storage forever and keeps the
         saved cart honest. */
      const pruned: CartState = {};
      for (const [id, qty] of Object.entries(parsed)) {
        const p = productById(id);
        if (!p || typeof qty !== "number" || qty <= 0) continue;
        /* Clamp to current availability: a product can sell out while a cart sits in
           storage, and a basket must never restore more units than exist. */
        const clamped = Math.min(p.stock, qty);
        if (clamped > 0) pruned[id] = clamped;
      }
      setCart(pruned);
    } catch {
      /* ignore corrupt cart */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ratel.cart", JSON.stringify(cart));
  }, [cart]);

  /* Availability is enforced here, not only in the buttons. The UI disables ordering
     an out-of-stock product, but a saved cart or an old link must not be able to
     smuggle one through, and quantity can never exceed what is actually available. */
  const add = (id: string) =>
    setCart((c) => {
      const p = productById(id);
      if (!p || !p.inStock) return c;
      return { ...c, [id]: Math.min(p.stock, (c[id] || 0) + 1) };
    });

  const changeQty = (id: string, delta: number) =>
    setCart((c) => {
      const p = productById(id);
      if (!p) return c;
      const q = Math.min(p.stock, Math.max(0, (c[id] || 0) + delta));
      const next = { ...c };
      if (q === 0) delete next[id];
      else next[id] = q;
      return next;
    });

  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });

  const clear = () => setCart({});

  const value = useMemo<CartCtx>(() => {
    /* Resolve ids defensively. The cart is restored from localStorage, so it can
       hold an id that no longer exists in the catalogue — which is exactly what
       happens the day the real product list replaces the placeholder one. Casting
       the lookup to Product and reading .price off undefined would throw inside a
       provider that wraps every route, permanently breaking the whole site for
       that visitor until they cleared their browser storage. Unknown ids are
       dropped instead. */
    const items: CartLine[] = Object.keys(cart)
      .filter((id) => cart[id] > 0)
      .map((id) => {
        const p = productById(id);
        if (!p) return null;
        return { ...p, qty: cart[id], lineLabel: fmt(p.price * cart[id]) };
      })
      .filter((line): line is CartLine => line !== null);
    const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
    const shipping =
      items.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const total = subtotal + shipping;
    const count = items.reduce((a, i) => a + i.qty, 0);
    return {
      items,
      count,
      subtotal,
      shipping,
      total,
      subtotalLabel: fmt(subtotal),
      shippingLabel: shipping === 0 ? "Offerte" : fmt(shipping),
      totalLabel: fmt(total),
      shipNote:
        subtotal >= FREE_SHIPPING_THRESHOLD
          ? `Livraison offerte, votre panier dépasse ${fmt(FREE_SHIPPING_THRESHOLD)}.`
          : `Livraison offerte dès ${fmt(FREE_SHIPPING_THRESHOLD)} d’achat.`,
      add,
      changeQty,
      remove,
      clear,
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within Providers");
  return ctx;
}

export { PRODUCTS };
