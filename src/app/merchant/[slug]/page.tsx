import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Cart, CartTrigger } from '@/components/Cart';
import { AddToCartButton } from '@/components/Cart';
import { getProductBySlug, getProducts, type Product } from '@/lib/api';
import { Star, ShoppingCart, Truck, Shield, CheckCircle, ArrowLeft, Zap, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductDetailPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return {
            title: 'Produk Tidak Ditemukan | MaknaUang',
        };
    }

    const price = new Intl.NumberFormat('id-ID').format(product.price);
    const description = product.description || `${product.name} - Panel surya berkualitas dari Makna Uang. ${product.type} dengan efisiensi ${product.efficiency}. Garansi ${product.warranty}.`;

    return {
        title: `${product.name} - Harga Rp ${price} | MaknaUang Solar`,
        description: description,
        keywords: `${product.name}, ${product.brand}, panel surya, ${product.type}, ${product.power}, harga panel surya, energi terbarukan, makna uang solar`,
        authors: [{ name: 'MaknaUang' }],
        creator: 'MaknaUang',
        publisher: 'MaknaUang',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL('https://www.maknauang.com'),
        alternates: {
            canonical: `/merchant/${slug}`,
        },
        openGraph: {
            type: 'website',
            locale: 'id_ID',
            url: `https://www.maknauang.com/merchant/${slug}`,
            title: `${product.name} - Harga Rp ${price} | MaknaUang Solar`,
            description: description,
            siteName: 'MaknaUang',
            images: [
                {
                    url: product.image,
                    width: 1200,
                    height: 630,
                    alt: product.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} - Harga Rp ${price} | MaknaUang Solar`,
            description: description,
            images: [product.image],
            creator: '@maknauang',
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: 'your-google-verification-code',
        },
    };
}

// Generate static params for static generation
export async function generateStaticParams() {
    const { products } = await getProducts(1, 100);

    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Get related products (same power range or type)
    const { products: allProducts } = await getProducts(1, 12);
    const relatedProducts = allProducts
        .filter((p) => p.id !== product.id)
        .slice(0, 4);

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('id-ID').format(price);
    };

    // Structured Data for SEO - Product
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: [product.image],
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: product.brand,
        },
        offers: {
            '@type': 'Offer',
            url: `https://www.maknauang.com/merchant/${product.slug}`,
            priceCurrency: 'IDR',
            price: product.price,
            priceValidUntil: '2027-12-31',
            availability: product.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: 'MaknaUang',
            },
        },
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Power',
                value: product.power,
            },
            {
                '@type': 'PropertyValue',
                name: 'Type',
                value: product.type,
            },
            {
                '@type': 'PropertyValue',
                name: 'Efficiency',
                value: product.efficiency,
            },
            {
                '@type': 'PropertyValue',
                name: 'Warranty',
                value: product.warranty,
            },
        ],
    };

    // Breadcrumb Structured Data
    const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.maknauang.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Merchant',
                item: 'https://www.maknauang.com/merchant',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: product.name,
            },
        ],
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbData),
                }}
            />

            <Navbar cartTrigger={<CartTrigger />} />
            <Cart />

            {/* Breadcrumb */}
            <section className="border-b border-border py-4 bg-muted/20">
                <div className="container mx-auto px-4 md:px-8">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-muted-foreground hover:text-neon transition-colors">
                            Home
                        </Link>
                        <span className="text-muted-foreground">/</span>
                        <Link href="/merchant" className="text-muted-foreground hover:text-neon transition-colors">
                            Merchant
                        </Link>
                        <span className="text-muted-foreground">/</span>
                        <span className="text-foreground font-medium">{product.name}</span>
                    </nav>
                </div>
            </section>

            {/* Back Button */}
            <section className="border-b border-border bg-background py-4">
                <div className="container mx-auto px-4 md:px-8">
                    <Link
                        href="/merchant"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-neon transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Daftar Produk
                    </Link>
                </div>
            </section>

            {/* Product Detail Section */}
            <section className="py-12">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={800}
                                    height={800}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>

                            {/* Additional images placeholder */}
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="aspect-square bg-muted rounded-lg overflow-hidden border border-border cursor-pointer hover:border-neon transition-colors"
                                    >
                                        <Image
                                            src={product.image}
                                            alt={`${product.name} view ${i}`}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Brand & Badge */}
                            <div>
                                <span className="text-[10px] font-black text-neon uppercase tracking-widest">
                                    {product.brand}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-2">
                                    {product.name}
                                </h1>
                                {product.power && (
                                    <span className="inline-block mt-2 bg-neon text-black text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                                        {product.power}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            {/* Key Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="bg-muted/20 border border-border rounded-lg p-6">
                                    <h3 className="font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-neon" />
                                        Fitur Unggulan
                                    </h3>
                                    <ul className="space-y-2">
                                        {product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm">
                                                <CheckCircle className="w-4 h-4 text-neon flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Specifications */}
                            <div className="bg-muted/20 border border-border rounded-lg p-6">
                                <h3 className="font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-neon" />
                                    Spesifikasi Teknis
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Tipe Panel</span>
                                        <span className="font-medium">{product.type}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Daya Output</span>
                                        <span className="font-medium">{product.power}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Efisiensi</span>
                                        <span className="font-medium">{product.efficiency}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Dimensi</span>
                                        <span className="font-medium">{product.dimensions}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                                        <span className="text-muted-foreground">Berat</span>
                                        <span className="font-medium">{product.weight}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-muted-foreground">Garansi</span>
                                        <span className="font-bold text-neon">{product.warranty}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price & CTA */}
                            <div className="border-t border-border pt-6 space-y-4">
                                <div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                                        Harga Produk
                                    </div>
                                    <div className="text-4xl font-black text-neon">
                                        Rp {formatPrice(product.price)}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <AddToCartButton
                                        product={{
                                            id: product.id,
                                            name: product.name,
                                            slug: product.slug,
                                            price: product.price,
                                            image: product.image,
                                            stock: product.stock,
                                        }}
                                        className="flex-1 bg-neon text-black py-4 text-sm font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors justify-center"
                                    />
                                    <a
                                        href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20{encodeURIComponent(product.name)}"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 border border-border py-4 text-sm font-bold uppercase tracking-wider hover:bg-muted transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Tanya via WA
                                    </a>
                                </div>

                                {/* Trust Badges */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Shield className="w-4 h-4 text-neon" />
                                        <span>Garansi Resmi</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Truck className="w-4 h-4 text-neon" />
                                        <span>Pengiriman Aman</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CheckCircle className="w-4 h-4 text-neon" />
                                        <span>Produk Original</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Information Section */}
            <section className="py-12 border-t border-border bg-muted/20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-center">
                            Mengapa Memilih {product.brand}?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                {
                                    icon: Zap,
                                    title: 'Efisiensi Tinggi',
                                    description: `Teknologi ${product.type} dengan efisiensi hingga ${product.efficiency} untuk output energi maksimal.`,
                                },
                                {
                                    icon: Shield,
                                    title: 'Garansi Panjang',
                                    description: `Garansi resmi ${product.warranty} untuk ketenangan pikiran jangka panjang.`,
                                },
                                {
                                    icon: Award,
                                    title: 'Kualitas Premium',
                                    description: 'Sertifikasi internasional dan quality control ketat untuk produk terbaik.',
                                },
                            ].map((item, index) => (
                                <div key={index} className="bg-background border border-border rounded-lg p-6 text-center">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-neon/10 rounded-full flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-neon" />
                                    </div>
                                    <h3 className="font-bold uppercase tracking-wider mb-2">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-12 border-t border-border">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">
                                Produk Terkait
                            </h2>
                            <p className="text-muted-foreground">
                                Produk lain yang mungkin Anda sukai
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    href={`/merchant/${relatedProduct.slug}`}
                                    className="group"
                                >
                                    <div className="bg-muted/20 border border-border hover:border-neon rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-neon/10">
                                        <div className="aspect-square bg-muted relative overflow-hidden">
                                            <Image
                                                src={relatedProduct.image}
                                                alt={relatedProduct.name}
                                                width={400}
                                                height={400}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <span className="text-[10px] font-black text-neon uppercase tracking-widest">
                                                {relatedProduct.brand}
                                            </span>
                                            <h3 className="font-bold text-sm uppercase tracking-tight mt-1 mb-2 group-hover:text-neon transition-colors line-clamp-2">
                                                {relatedProduct.name}
                                            </h3>
                                            <p className="text-sm font-bold text-neon">
                                                Rp {formatPrice(relatedProduct.price)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-neon text-black">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">
                        Butuh Konsultasi?
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">
                        Tim ahli kami siap membantu Anda memilih panel surya yang tepat untuk kebutuhan Anda.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20{encodeURIComponent(product.name)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-neon px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-black/90 transition-colors inline-flex items-center gap-2"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Hubungi via WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
