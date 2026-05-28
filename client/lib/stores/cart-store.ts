"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/mock-data";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (dressId: string) => void;
  updateItem: (dressId: string, updates: Partial<CartItem>) => void;
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
            (i) =>
              i.dressId === item.dressId &&
              i.size === item.size &&
              i.color === item.color &&
              i.startDate === item.startDate &&
              i.endDate === item.endDate
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (dressId) =>
        set((state) => ({
          items: state.items.filter((i) => i.dressId !== dressId),
        })),

      updateItem: (dressId, updates) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.dressId === dressId ? { ...i, ...updates } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => {
          const days = Math.max(
            1,
            Math.ceil(
              (new Date(i.endDate).getTime() - new Date(i.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          );
          return sum + i.price * days * i.quantity;
        }, 0),
    }),
    { name: "dress-cart" }
  )
);
