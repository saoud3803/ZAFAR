import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/data';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => 
              item.product.id === newItem.product.id && 
              item.selectedSize === newItem.selectedSize && 
              item.selectedColor === newItem.selectedColor
          );

          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += newItem.quantity;
            return { items: newItems };
          }
          
          // Add new item
          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) => 
              !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
          )
        }));
      },
      
      updateQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          items: state.items.map((item) => 
            (item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      
      getCartCount: () => {
        const items = get().items;
        return items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'zafar-cart-storage',
    }
  )
);
