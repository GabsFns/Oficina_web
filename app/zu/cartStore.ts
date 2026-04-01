// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
};

type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  cart: CartItem[];

  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  increase: (id: number) => void;
  decrease: (id: number) => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);

          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      removeItem: (id) =>
        set({
          cart: get().cart.filter((item) => item.id !== id),
        }),

      increase: (id) =>
        set({
          cart: get().cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }),

      decrease: (id) =>
        set({
          cart: get().cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        }),

      getTotalItems: () =>
        get().cart.reduce((acc, item) => acc + item.quantity, 0),

      getTotalPrice: () =>
        get().cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "cart-storage",
    }
  )
);