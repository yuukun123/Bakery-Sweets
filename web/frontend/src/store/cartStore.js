import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, size, quantity = 1) => {
        const existing = get().items.find(
          (i) => i.product_id === product.product_id && i.size_id === size.size_id
        );
        if (existing) {
          set({ items: get().items.map((i) =>
            i.product_id === product.product_id && i.size_id === size.size_id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )});
        } else {
          set({ items: [...get().items, {
            cart_id: Date.now(),
            product_id: product.product_id,
            product_name: product.product_name,
            image: product.image,
            size_id: size.size_id,
            size_name: size.size_name,
            price: size.price,
            quantity,
          }]});
        }
      },
      removeItem: (product_id, size_id) =>
        set({ items: get().items.filter(
          (i) => !(i.product_id === product_id && i.size_id === size_id)
        )}),
      updateQty: (product_id, size_id, quantity) =>
        set({ items: get().items.map((i) =>
          i.product_id === product_id && i.size_id === size_id
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )}),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      totalCost: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
