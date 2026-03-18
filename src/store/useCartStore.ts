import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/lib/api';

interface CartStoreItem {
    key: string;
    product: Product;
    quantity: number;
    variation_id?: string;
}

interface CartState {
    items: CartStoreItem[];
    isOpen: boolean;
    isLoading: boolean;

    // Actions
    addItem: (product: Product, quantity?: number, variationId?: string) => void;
    removeItem: (key: string) => void;
    updateQuantity: (key: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    // Getters
    getSubtotal: () => number;
    getTotalItems: () => number;
    getCartItems: () => CartItem[];
}

const generateCartKey = (productId: string, variationId?: string): string => {
    return variationId ? `${productId}-${variationId}` : productId;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            isLoading: false,

            addItem: (product, quantity = 1, variationId) => {
                const key = generateCartKey(product.id, variationId);
                const existingItem = get().items.find(item => item.key === key);

                if (existingItem) {
                    set({
                        items: get().items.map(item =>
                            item.key === key
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    });
                } else {
                    set({
                        items: [...get().items, { key, product, quantity, variation_id: variationId }]
                    });
                }

                // Open cart when item is added
                get().openCart();
            },

            removeItem: (key) => {
                set({
                    items: get().items.filter(item => item.key !== key)
                });
            },

            updateQuantity: (key, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(key);
                    return;
                }

                set({
                    items: get().items.map(item =>
                        item.key === key ? { ...item, quantity } : item
                    )
                });
            },

            clearCart: () => {
                set({ items: [] });
            },

            toggleCart: () => {
                set({ isOpen: !get().isOpen });
            },

            openCart: () => {
                set({ isOpen: true });
            },

            closeCart: () => {
                set({ isOpen: false });
            },

            getSubtotal: () => {
                return get().items.reduce((total, item) => {
                    return total + (item.product.price * item.quantity);
                }, 0);
            },

            getTotalItems: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getCartItems: () => {
                return get().items.map(item => ({
                    key: item.key,
                    product_id: item.product.id,
                    quantity: item.quantity,
                    variation_id: item.variation_id,
                    product: {
                        id: item.product.id,
                        name: item.product.name,
                        slug: item.product.slug,
                        price: item.product.price,
                        image: item.product.image,
                        stock: item.product.stock
                    }
                }));
            }
        }),
        {
            name: 'maknauang-cart',
            partialize: (state) => ({ items: state.items })
        }
    )
);
