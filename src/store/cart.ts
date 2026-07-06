import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  sellPrice: number;
  volumeMl: number | null;
  category: "BEER" | "ENERGY" | "OTHER" | "SNACKS" | "COFFEE_TEA" | "CANNED" | "GROCERY" | "PET_SUPPLIES" | "PRODUCE";
  caseSize: number;
  imageUrl: string | null;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  syncImages: (images: Record<string, string | null>) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, quantity: i.quantity + qty } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: qty }] };
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      setQuantity: (productId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
        })),
      syncImages: (images) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId in images && images[i.productId] !== i.imageUrl
              ? { ...i, imageUrl: images[i.productId] }
              : i,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: "yoshkar-shop-cart",
      storage: createJSONStorage(() => localStorage),
      version: 3,
      migrate: (persistedState) => {
        const state = persistedState as CartState;
        return {
          ...state,
          items: (state?.items ?? [])
            .filter((i) => typeof i.caseSize === "number" && i.caseSize > 0)
            .map((i) => ({ ...i, imageUrl: i.imageUrl ?? null })),
        };
      },
    },
  ),
);
