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

/* ----------------------------- Theme ----------------------------- */
export type ThemeName = "caserne" | "serenite";

type ThemeCtx = { theme: ThemeName; setTheme: (t: ThemeName) => void };
const ThemeContext = createContext<ThemeCtx | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("caserne");

  useEffect(() => {
    const saved = localStorage.getItem("ratel.theme") as ThemeName | null;
    if (saved === "caserne" || saved === "serenite") setTheme(saved);
  }, []);

  useEffect(() => {
    document.body.classList.remove("theme-caserne", "theme-serenite");
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem("ratel.theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within Providers");
  return ctx;
}

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
};
const CartContext = createContext<CartCtx | null>(null);

const INITIAL_CART: CartState = { p2: 1, p7: 2 };

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartState>(INITIAL_CART);

  useEffect(() => {
    const saved = localStorage.getItem("ratel.cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        /* ignore corrupt cart */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ratel.cart", JSON.stringify(cart));
  }, [cart]);

  const add = (id: string) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const changeQty = (id: string, delta: number) =>
    setCart((c) => {
      const q = Math.max(0, (c[id] || 0) + delta);
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

  const value = useMemo<CartCtx>(() => {
    const items: CartLine[] = Object.keys(cart)
      .filter((id) => cart[id] > 0)
      .map((id) => {
        const p = productById(id) as Product;
        return { ...p, qty: cart[id], lineLabel: fmt(p.price * cart[id]) };
      });
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
          ? "Livraison offerte dès 79 € — acquise."
          : "Livraison offerte dès 79 € d’achat.",
      add,
      changeQty,
      remove,
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within Providers");
  return ctx;
}

/* --------------------------- Providers --------------------------- */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>{children}</CartProvider>
    </ThemeProvider>
  );
}

export { PRODUCTS };
