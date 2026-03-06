"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  coverUrl?: string | null;
  quantity: number;
};

type AddItemInput = Omit<CartItem, "quantity"> & { quantity?: number };

type CartState = {
  items: CartItem[];
  add: (item: AddItemInput) => void;
  remove: (productId: string) => void;
  clear: () => void;
  setQuantity: (productId: string, quantity: number) => void;
  totalQuantity: () => number;
  totalAmount: () => number;
};

function clampQuantity(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.max(1, Math.floor(qty));
}

// SSR-safe storage: no-ops on server, uses localStorage on client
const safeStorage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    // Server: return a dummy storage that does nothing
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return window.localStorage;
});

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (input) => {
        const quantityToAdd = clampQuantity(input.quantity ?? 1);
        set((state) => {
          const existing = state.items.find((i) => i.productId === input.productId);
          if (!existing) {
            const next: CartItem = {
              productId: input.productId,
              name: input.name,
              price: input.price,
              coverUrl: input.coverUrl ?? null,
              quantity: quantityToAdd,
            };
            return { items: [...state.items, next] };
          }
          return {
            items: state.items.map((i) =>
              i.productId === input.productId
                ? { ...i, quantity: i.quantity + quantityToAdd }
                : i,
            ),
          };
        });
      },

      remove: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      clear: () => set({ items: [] }),

      setQuantity: (productId, quantity) => {
        const nextQty = clampQuantity(quantity);
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: nextQty } : i,
          ),
        }));
      },

      totalQuantity: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalAmount: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "cart",
      version: 1,
      storage: safeStorage,
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
