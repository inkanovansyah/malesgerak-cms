'use client';

import { useCartStore } from '@/store/useCartStore';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export function Cart() {
    const {
        items,
        isOpen,
        getSubtotal,
        getTotalItems,
        updateQuantity,
        removeItem,
        clearCart,
        closeCart,
        getCartItems
    } = useCartStore();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const subtotal = getSubtotal();
    const totalItems = getTotalItems();

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('id-ID').format(price);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={closeCart}
            />

            {/* Cart Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-neon" />
                        <h2 className="text-lg font-bold uppercase tracking-wider">
                            Keranjang ({totalItems})
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        {items.length > 0 && (
                            <button
                                onClick={clearCart}
                                className="text-xs text-muted-foreground hover:text-destructive transition-colors uppercase tracking-wider"
                            >
                                Hapus Semua
                            </button>
                        )}
                        <button
                            onClick={closeCart}
                            className="p-1 hover:bg-muted rounded transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
                            <p className="text-muted-foreground mb-2">Keranjang Anda kosong</p>
                            <p className="text-sm text-muted-foreground/70 mb-6">
                                Mulai tambahkan produk untuk melanjutkan
                            </p>
                            <button
                                onClick={closeCart}
                                className="bg-neon text-black px-6 py-2 text-sm font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors"
                            >
                                Mulai Belanja
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.key}
                                    className="flex gap-4 p-4 bg-muted/20 border border-border rounded-lg"
                                >
                                    {/* Product Image */}
                                    <div className="w-20 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-sm uppercase tracking-tight mb-1 line-clamp-2">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-neon font-bold text-sm mb-2">
                                            Rp {formatPrice(item.product.price)}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 bg-background border border-border rounded">
                                                <button
                                                    onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                                    className="p-1 hover:bg-muted transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-sm font-medium w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                                    className="p-1 hover:bg-muted transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.key)}
                                                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-border p-6 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground uppercase tracking-wider">
                                Subtotal
                            </span>
                            <span className="text-xl font-black text-neon">
                                Rp {formatPrice(subtotal)}
                            </span>
                        </div>

                        {/* Checkout Button */}
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="w-full bg-neon text-black py-3 text-sm font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors flex items-center justify-center gap-2"
                        >
                            Lanjut ke Pembayaran
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <button
                            onClick={closeCart}
                            className="w-full border border-border py-3 text-sm font-bold uppercase tracking-wider hover:bg-muted transition-colors"
                        >
                            Lanjut Belanja
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

// Cart Trigger Button (to be placed in navbar)
export function CartTrigger() {
    const { items, openCart, getTotalItems } = useCartStore();
    const totalItems = getTotalItems();

    return (
        <button
            onClick={openCart}
            className="relative p-2 hover:bg-muted rounded transition-colors"
        >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-neon text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems > 9 ? '9+' : totalItems}
                </span>
            )}
        </button>
    );
}

// Add to Cart Button
interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        image: string;
        stock?: number;
    };
    quantity?: number;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function AddToCartButton({ product, quantity = 1, className = '', onClick }: AddToCartButtonProps) {
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product, quantity);
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`bg-neon text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors inline-flex items-center gap-2 ${className}`}
        >
            <ShoppingBag className="w-3 h-3" />
            Tambah ke Keranjang
        </button>
    );
}
