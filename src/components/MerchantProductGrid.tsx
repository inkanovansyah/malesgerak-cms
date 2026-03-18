'use client';

import { AddToCartButton } from './Cart';
import type { CartProduct } from '@/store/useCartStore';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

// Helper to convert Product to CartProduct
function toCartProduct(product: Product): CartProduct {
    return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        stock: product.stock
    };
}

interface MerchantProductGridProps {
    products: Product[];
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID').format(price);
}

export function MerchantProductGrid({ products }: MerchantProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
                <Link key={product.id} href={`/merchant/${product.slug}`} className="group block">
                    <div className="bg-muted/20 border border-border hover:border-neon rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-neon/10 h-full">
                        {/* Image */}
                        <div className="aspect-video w-full bg-muted relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3">
                                <span className="bg-neon text-black text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                                    {product.power}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Brand Badge */}
                            <div className="mb-2">
                                <span className="text-[10px] font-black text-neon uppercase tracking-widest">
                                    {product.brand}
                                </span>
                            </div>
                            <h3 className="font-bold text-lg uppercase tracking-tight mb-2 group-hover:text-neon transition-colors line-clamp-1">
                                {product.name}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {product.description}
                            </p>

                            {/* Specs */}
                            <div className="space-y-2 mb-4 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Tipe:</span>
                                    <span className="font-medium">{product.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Efisiensi:</span>
                                    <span className="font-medium">{product.efficiency}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Garansi:</span>
                                    <span className="font-medium text-neon">{product.warranty}</span>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {product.features.slice(0, 2).map((feature, i) => (
                                    <span key={i} className="text-[10px] bg-background border border-border px-2 py-0.5 rounded-sm">
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Price & CTA */}
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                                <div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Harga</div>
                                    <div className="text-xl font-black text-neon">
                                        Rp {formatPrice(product.price)}
                                    </div>
                                </div>
                                <AddToCartButton
                                    product={toCartProduct(product)}
                                    className="bg-neon text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors inline-flex items-center gap-2"
                                />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
