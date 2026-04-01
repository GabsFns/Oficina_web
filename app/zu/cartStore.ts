// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addItem: (product: CartItem) => void;
  removeItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (product) => {
        const exists = get().cart.find((i) => i.id === product.id);

        if (exists) {
          set({
            cart: get().cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeItem: (id) => {
        set({ cart: get().cart.filter((item) => item.id !== id) });
      },

      increase: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decrease: (id) => {
        set({
          cart: get().cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },
    }),
    {
      name: "cart-storage", 
    }
  )
);