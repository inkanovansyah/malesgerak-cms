'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Metadata } from 'next';
import { ShoppingBag, Truck, CreditCard, User, MapPin, Phone, Mail, Check } from 'lucide-react';
import { createOrder, type OrderRequest, type ShippingMethod, type Order } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getSubtotal, getTotalItems, clearCart, getCartItems } = useCartStore();
    const [isLoading, setIsLoading] = useState(false);
    const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
    const [selectedShipping, setSelectedShipping] = useState<string>('');
    const [order, setOrder] = useState<Order | null>(null);

    const subtotal = getSubtotal();
    const totalItems = getTotalItems();
    const shippingCost = shippingMethods.find(m => m.id === selectedShipping)?.cost || 0;
    const total = subtotal + shippingCost;

    // Form state
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address_1: '',
        address_2: '',
        city: '',
        state: '',
        postcode: '',
        country: 'Indonesia',
        notes: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load shipping methods on mount
    useEffect(() => {
        const loadShippingMethods = async () => {
            try {
                const methods = await fetch('https://api.maknauang.com/wp-json/myapi/v1/shipping/methods')
                    .then(res => res.json());
                if (Array.isArray(methods)) {
                    setShippingMethods(methods);
                    if (methods.length > 0 && methods[0].enabled) {
                        setSelectedShipping(methods[0].id);
                    }
                }
            } catch (error) {
                console.error('Failed to load shipping methods:', error);
            }
        };
        loadShippingMethods();
    }, []);

    // Redirect if cart is empty
    useEffect(() => {
        if (items.length === 0 && !order) {
            router.push('/merchant');
        }
    }, [items.length, order, router]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.first_name.trim()) newErrors.first_name = 'Nama depan wajib diisi';
        if (!formData.last_name.trim()) newErrors.last_name = 'Nama belakang wajib diisi';
        if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email tidak valid';
        if (!formData.phone.trim()) newErrors.phone = 'Nomor telepon wajib diisi';
        if (!formData.address_1.trim()) newErrors.address_1 = 'Alamat wajib diisi';
        if (!formData.city.trim()) newErrors.city = 'Kota wajib diisi';
        if (!formData.state.trim()) newErrors.state = 'Provinsi wajib diisi';
        if (!formData.postcode.trim()) newErrors.postcode = 'Kode pos wajib diisi';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const orderData: OrderRequest = {
                customer: {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone: formData.phone,
                    address_1: formData.address_1,
                    address_2: formData.address_2,
                    city: formData.city,
                    state: formData.state,
                    postcode: formData.postcode,
                    country: formData.country
                },
                shipping_method: selectedShipping,
                payment_method: 'xendit',
                notes: formData.notes
            };

            const createdOrder = await createOrder(orderData);
            setOrder(createdOrder);

            // Clear cart after successful order
            clearCart();

            // Redirect to payment if payment URL is available
            if (createdOrder.payment_url) {
                window.location.href = createdOrder.payment_url;
            }
        } catch (error) {
            console.error('Failed to create order:', error);
            alert('Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('id-ID').format(price);
    };

    // Order Success View
    if (order) {
        return (
            <main className="min-h-screen bg-background text-foreground">
                <Navbar />

                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="w-20 h-20 bg-neon/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-neon" />
                            </div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter mb-4">
                                Pesanan Berhasil Dibuat!
                            </h1>
                            <p className="text-muted-foreground mb-2">
                                Nomor Pesanan: <span className="font-bold text-neon">#{order.id}</span>
                            </p>
                            <p className="text-muted-foreground mb-8">
                                Kami telah mengirimkan detail pesanan ke email Anda.
                            </p>

                            {order.payment_url && (
                                <div className="bg-muted/20 border border-border rounded-lg p-6 mb-8">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Silakan selesaikan pembayaran untuk mengkonfirmasi pesanan Anda.
                                    </p>
                                    <a
                                        href={order.payment_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors"
                                    >
                                        Bayar Sekarang
                                    </a>
                                </div>
                            )}

                            <div className="flex flex-wrap justify-center gap-4">
                                <a
                                    href="/merchant"
                                    className="bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors inline-flex items-center gap-2"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Lanjut Belanja
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="py-12">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
                                Checkout
                            </h1>
                            <p className="text-muted-foreground">
                                Lengkapi formulir di bawah ini untuk menyelesaikan pesanan Anda.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form Section */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Customer Information */}
                                <div className="bg-muted/20 border border-border rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <User className="w-5 h-5 text-neon" />
                                        <h2 className="text-lg font-bold uppercase tracking-wider">
                                            Informasi Pelanggan
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Nama Depan *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.first_name}
                                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                                className={`w-full px-4 py-2 bg-background border ${errors.first_name ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                            />
                                            {errors.first_name && (
                                                <p className="text-destructive text-xs mt-1">{errors.first_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Nama Belakang *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.last_name}
                                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                                className={`w-full px-4 py-2 bg-background border ${errors.last_name ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                            />
                                            {errors.last_name && (
                                                <p className="text-destructive text-xs mt-1">{errors.last_name}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                <Mail className="w-3 h-3 inline mr-1" />
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className={`w-full px-4 py-2 bg-background border ${errors.email ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                            />
                                            {errors.email && (
                                                <p className="text-destructive text-xs mt-1">{errors.email}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                <Phone className="w-3 h-3 inline mr-1" />
                                                Telepon *
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className={`w-full px-4 py-2 bg-background border ${errors.phone ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                            />
                                            {errors.phone && (
                                                <p className="text-destructive text-xs mt-1">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-muted/20 border border-border rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <MapPin className="w-5 h-5 text-neon" />
                                        <h2 className="text-lg font-bold uppercase tracking-wider">
                                            Alamat Pengiriman
                                        </h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                               Alamat *
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.address_1}
                                                onChange={(e) => setFormData({ ...formData, address_1: e.target.value })}
                                                className={`w-full px-4 py-2 bg-background border ${errors.address_1 ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                            />
                                            {errors.address_1 && (
                                                <p className="text-destructive text-xs mt-1">{errors.address_1}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Apartemen, Suite, dll. (opsional)
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.address_2}
                                                onChange={(e) => setFormData({ ...formData, address_2: e.target.value })}
                                                className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-neon transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Kota *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    className={`w-full px-4 py-2 bg-background border ${errors.city ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                                />
                                                {errors.city && (
                                                    <p className="text-destructive text-xs mt-1">{errors.city}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Provinsi *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.state}
                                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                    className={`w-full px-4 py-2 bg-background border ${errors.state ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                                />
                                                {errors.state && (
                                                    <p className="text-destructive text-xs mt-1">{errors.state}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Kode Pos *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.postcode}
                                                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                                                    className={`w-full px-4 py-2 bg-background border ${errors.postcode ? 'border-destructive' : 'border-border'} rounded focus:outline-none focus:border-neon transition-colors`}
                                                />
                                                {errors.postcode && (
                                                    <p className="text-destructive text-xs mt-1">{errors.postcode}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Negara
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.country}
                                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                    className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-neon transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Method */}
                                <div className="bg-muted/20 border border-border rounded-lg p-6">
                                    <div className="flex items-center gap-2 mb-6">
                                        <Truck className="w-5 h-5 text-neon" />
                                        <h2 className="text-lg font-bold uppercase tracking-wider">
                                            Metode Pengiriman
                                        </h2>
                                    </div>

                                    <div className="space-y-3">
                                        {shippingMethods.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">
                                                Memuat metode pengiriman...
                                            </p>
                                        ) : (
                                            shippingMethods.map((method) => (
                                                <label
                                                    key={method.id}
                                                    className={`flex items-center justify-between p-4 border ${selectedShipping === method.id ? 'border-neon bg-neon/5' : 'border-border'} rounded cursor-pointer hover:border-neon/50 transition-colors`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name="shipping"
                                                            value={method.id}
                                                            checked={selectedShipping === method.id}
                                                            onChange={() => setSelectedShipping(method.id)}
                                                            className="w-4 h-4 accent-neon"
                                                        />
                                                        <div>
                                                            <p className="font-bold text-sm">{method.title}</p>
                                                            <p className="text-xs text-muted-foreground">{method.description}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-bold text-neon text-sm">
                                                        Rp {formatPrice(method.cost)}
                                                    </p>
                                                </label>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="bg-muted/20 border border-border rounded-lg p-6">
                                    <label className="block text-sm font-medium mb-2">
                                        Catatan Pesanan (Opsional)
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-background border border-border rounded focus:outline-none focus:border-neon transition-colors resize-none"
                                        placeholder="Tambahkan catatan untuk pesanan Anda..."
                                    />
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-muted/20 border border-border rounded-lg p-6 sticky top-4">
                                    <div className="flex items-center gap-2 mb-6">
                                        <ShoppingBag className="w-5 h-5 text-neon" />
                                        <h2 className="text-lg font-bold uppercase tracking-wider">
                                            Ringkasan Pesanan
                                        </h2>
                                    </div>

                                    {/* Products */}
                                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                        {items.map((item) => (
                                            <div key={item.key} className="flex gap-3">
                                                <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium line-clamp-2">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mb-1">
                                                        Jumlah: {item.quantity}
                                                    </p>
                                                    <p className="text-sm font-bold text-neon">
                                                        Rp {formatPrice(item.product.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-3 border-t border-border pt-4">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>Rp {formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Pengiriman</span>
                                            <span>Rp {formatPrice(shippingCost)}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-border">
                                            <span>Total</span>
                                            <span className="text-neon">Rp {formatPrice(total)}</span>
                                        </div>
                                    </div>

                                    {/* Payment Method */}
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <div className="flex items-center gap-2 mb-3">
                                            <CreditCard className="w-4 h-4 text-neon" />
                                            <p className="text-sm font-medium">Metode Pembayaran</p>
                                        </div>
                                        <div className="bg-background border border-border rounded p-3">
                                            <p className="text-sm font-medium">Xendit Payment Gateway</p>
                                            <p className="text-xs text-muted-foreground">
                                                Transfer bank, e-wallet, dan lainnya
                                            </p>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="w-full mt-6 bg-neon text-black py-3 text-sm font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            'Memproses...'
                                        ) : (
                                            <>
                                                <CreditCard className="w-4 h-4" />
                                                Buat Pesanan
                                            </>
                                        )}
                                    </button>

                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        Dengan memesan, Anda menyetujui Syarat & Ketentuan kami.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
