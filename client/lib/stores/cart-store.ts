"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  dressId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (dressId: string) => void;
  updateQuantity: (dressId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.dressId === item.dressId && i.size === item.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.dressId === item.dressId && i.size === item.size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeItem: (dressId) =>
        set((state) => ({
          items: state.items.filter((i) => i.dressId !== dressId),
        })),

      updateQuantity: (dressId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.dressId !== dressId)
              : state.items.map((i) =>
                  i.dressId === dressId ? { ...i, quantity } : i
                ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "dress-cart" }
  )
);
