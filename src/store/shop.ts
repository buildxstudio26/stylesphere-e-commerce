import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  qty: number;
};

export type OrderStatus = "Placed" | "Packed" | "Shipped" | "Out for Delivery" | "Delivered";
export const ORDER_FLOW: OrderStatus[] = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  placedAt: number;
  status: OrderStatus;
  address: string;
  tracking: { status: OrderStatus; at: number }[];
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addToCart: (i: Omit<CartItem,"id">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (address: string) => Order | null;
  advanceOrder: (orderId: string) => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      orders: [],
      addToCart: (item) => {
        const existing = get().cart.find(
          (c) => c.productId === item.productId && c.size === item.size && c.color === item.color
        );
        if (existing) {
          set({
            cart: get().cart.map((c) =>
              c.id === existing.id ? { ...c, qty: c.qty + item.qty } : c
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...item, id: crypto.randomUUID() }] });
        }
      },
      removeFromCart: (id) => set({ cart: get().cart.filter((c) => c.id !== id) }),
      updateQty: (id, qty) =>
        set({
          cart: get().cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c)),
        }),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (pid) => {
        const w = get().wishlist;
        set({ wishlist: w.includes(pid) ? w.filter((x) => x !== pid) : [...w, pid] });
      },
      placeOrder: (address) => {
        const cart = get().cart;
        if (!cart.length) return null;
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const now = Date.now();
        const order: Order = {
          id: "LUM-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
          items: cart,
          total,
          placedAt: now,
          status: "Placed",
          address,
          tracking: [{ status: "Placed", at: now }],
        };
        set({ orders: [order, ...get().orders], cart: [] });
        return order;
      },
      advanceOrder: (orderId) => {
        set({
          orders: get().orders.map((o) => {
            if (o.id !== orderId) return o;
            const idx = ORDER_FLOW.indexOf(o.status);
            if (idx >= ORDER_FLOW.length - 1) return o;
            const next = ORDER_FLOW[idx + 1];
            return { ...o, status: next, tracking: [...o.tracking, { status: next, at: Date.now() }] };
          }),
        });
      },
    }),
    { name: "lumiere-shop" }
  )
);
