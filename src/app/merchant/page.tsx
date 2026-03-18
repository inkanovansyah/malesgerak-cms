import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, ShoppingCart, Zap, Battery, Sun, CheckCircle, Award } from "lucide-react";

export const metadata: Metadata = {
    title: "Jual Panel Surya Makna Uang - Harga Terbaik 2026 | Merchant",
    description: "Jual panel surya Makna Uang berkualitas dengan harga terbaik mulai Rp 850.000. Tersedia panel 100WP - 550WP, paket off-grid lengkap. Garansi 25-30 tahun. Solusi energi terbarukan untuk rumah & komersial.",
    keywords: "panel surya, jual panel surya, harga panel surya, panel surya makna uang, energi terbarukan, solar panel, panel surya murah, makna uang solar",
    authors: [{ name: "MaknaUang" }],
    creator: "MaknaUang",
    publisher: "MaknaUang",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://www.maknauang.com'),
    alternates: {
        canonical: '/merchant',
    },
    openGraph: {
        type: 'website',
        locale: 'id_ID',
        url: 'https://www.maknauang.com/merchant',
        title: 'Jual Panel Surya Makna Uang - Harga Terbaik 2026',
        description: 'Jual panel surya Makna Uang berkualitas dengan harga terbaik. Tersedia panel 100WP - 550WP, paket off-grid lengkap. Garansi 25-30 tahun.',
        siteName: 'MaknaUang',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80',
                width: 1200,
                height: 630,
                alt: 'Panel Surya Makna Uang'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jual Panel Surya Makna Uang - Harga Terbaik 2026',
        description: 'Jual panel surya Makna Uang berkualitas dengan harga terbaik. Tersedia panel 100WP - 550WP, paket off-grid lengkap.',
        images: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80'],
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
    }
};

// Hardcoded panel surya data - Produk Makna Uang
const PANEL_SURYA = [
    {
        id: 1,
        name: "Makna Uang Solar 100WP",
        brand: "MAKNA UANG",
        price: 850000,
        power: "100WP",
        type: "Monocrystalline",
        efficiency: "18%",
        dimensions: "1040 x 540 x 35mm",
        weight: "8.5 kg",
        warranty: "25 Tahun",
        features: ["Tahan Cuaca IP67", "Frame Aluminium", "Kaca Tempered"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        description: "Panel Surya Makna Uang 100WP ideal untuk rumah tangga kecil, lampu jalan, dan aplikasi off-grid."
    },
    {
        id: 2,
        name: "Makna Uang Solar 200WP",
        brand: "MAKNA UANG",
        price: 1500000,
        power: "200WP",
        type: "Polycrystalline",
        efficiency: "16%",
        dimensions: "1480 x 680 x 35mm",
        weight: "15 kg",
        warranty: "25 Tahun",
        features: ["Efisiensi Tinggi", "Tahan Karat", "Anti-Reflection"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        description: "Panel Surya Makna Uang 200WP cocok untuk rumah tangga menengah dan aplikasi komersial kecil."
    },
    {
        id: 3,
        name: "Makna Uang Solar 300WP Premium",
        brand: "MAKNA UANG",
        price: 2200000,
        power: "300WP",
        type: "Monocrystalline Premium",
        efficiency: "20%",
        dimensions: "1955 x 992 x 40mm",
        weight: "22 kg",
        warranty: "25 Tahun",
        features: ["PERC Technology", "PID Free", "High Output"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        description: "Panel Surya Makna Uang Premium 300WP untuk instalasi rumah tangga besar dan komersial."
    },
    {
        id: 4,
        name: "Makna Uang Solar 450WP Bifacial",
        brand: "MAKNA UANG",
        price: 3500000,
        power: "450WP",
        type: "Bifacial Monocrystalline",
        efficiency: "21%",
        dimensions: "2100 x 1040 x 35mm",
        weight: "28 kg",
        warranty: "30 Tahun",
        features: ["Bifacial Technology", "Dual Side Power", "Ultra Efficient"],
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
        description: "Panel Surya Makna Uang Bifacial 450WP menghasilkan energi dari kedua sisi, output hingga 30% lebih tinggi."
    },
    {
        id: 5,
        name: "Makna Uang Solar 550WP Half-Cut",
        brand: "MAKNA UANG",
        price: 4500000,
        power: "550WP",
        type: "Half-Cut Monocrystalline",
        efficiency: "22%",
        dimensions: "2278 x 1134 x 35mm",
        weight: "32 kg",
        warranty: "30 Tahun",
        features: ["Half-Cut Cell", "Low Irradiance", "Shadow Tolerant"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        description: "Panel Surya Makna Uang 550WP dengan teknologi half-cut untuk performa maksimal dalam kondisi bayangan."
    },
    {
        id: 6,
        name: "Makna Uang Solar Paket 1kWp Off-Grid",
        brand: "MAKNA UANG",
        price: 12000000,
        power: "1000WP (1kWp)",
        type: "Paket Lengkap",
        efficiency: "-",
        dimensions: "-",
        weight: "-",
        warranty: "25 Tahun Panel + 2 Tahun Komponen",
        features: ["4 Panel 250WP", "Inverter 1kW", "Baterai 200Ah", "Instalasi Lengkap"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        description: "Paket Lengkap Panel Surya Makna Uang Off-Grid untuk rumah mandiri. Termasuk panel, inverter, baterai, dan instalasi."
    }
];

// Hardcoded reviews
const REVIEWS = [
    {
        id: 1,
        name: "Ahmad Supriadi",
        location: "Jakarta",
        rating: 5,
        date: "15 Jan 2026",
        comment: "Panel Surya Makna Uang 300WP sangat berkualitas. Sudah 6 bulan dipakai, performa stabil dan penghematan listrik mencapai 60%. Sangat recommended!",
        avatar: "A"
    },
    {
        id: 2,
        name: "Siti Rahayu",
        location: "Surabaya",
        rating: 5,
        date: "10 Jan 2026",
        comment: "Paket Makna Uang Solar 1kWp off-grid sangat membantu rumah saya yang sering mati lampu. Pemasangan rapi dan teknisi sangat profesional.",
        avatar: "S"
    },
    {
        id: 3,
        name: "Budi Santoso",
        location: "Bandung",
        rating: 4,
        date: "5 Jan 2026",
        comment: "Makna Uang Solar 200WP cocok untuk kebutuhan rumah tangga saya. Harga terjangkau dengan kualitas yang baik. Pengiriman cepat.",
        avatar: "B"
    },
    {
        id: 4,
        name: "Dewi Lestari",
        location: "Yogyakarta",
        rating: 5,
        date: "28 Des 2025",
        comment: "Saya beli Panel Surya Makna Uang 450WP bifacial untuk usaha kopi saya. Output energi luar biasa, bahkan saat cuaca mendung tetap optimal.",
        avatar: "D"
    },
    {
        id: 5,
        name: "Rudi Hartono",
        location: "Medan",
        rating: 5,
        date: "20 Des 2025",
        comment: "Pemasangan Makna Uang Solar sangat memuaskan. After sales service juga responsif. Solusi energi terbaik untuk masa depan.",
        avatar: "R"
    },
    {
        id: 6,
        name: "Maya Putri",
        location: "Bali",
        rating: 5,
        date: "15 Des 2025",
        comment: "Panel Surya Makna Uang 550WP half-cut memberikan performa maksimal bahkan di lokasi yang sering berawan. Investasi yang sangat worth it!",
        avatar: "M"
    }
];

function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID').format(price);
}

export default function MerchantPage() {
    const totalReviews = REVIEWS.length;
    const averageRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

    // Structured Data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Panel Surya Makna Uang",
        "description": "Jual panel surya berkualitas dengan harga terbaik. Solusi energi terbarukan untuk kebutuhan rumah tangga dan komersial.",
        "url": "https://www.maknauang.com/merchant",
        "numberOfItems": PANEL_SURYA.length,
        "itemListElement": PANEL_SURYA.map((panel, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "name": panel.name,
                "brand": {
                    "@type": "Brand",
                    "name": panel.brand
                },
                "image": panel.image,
                "description": panel.description,
                "offers": {
                    "@type": "Offer",
                    "price": panel.price,
                    "priceCurrency": "IDR",
                    "availability": "https://schema.org/InStock",
                    "url": `https://www.maknauang.com/merchant#${panel.id}`
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": averageRating,
                    "reviewCount": totalReviews,
                    "bestRating": 5,
                    "worstRating": 1
                }
            }
        }))
    };

    const reviewData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Panel Surya Makna Uang",
        "image": "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        "description": "Jual panel surya berkualitas dengan harga terbaik. Solusi energi terbarukan untuk kebutuhan rumah tangga dan komersial.",
        "brand": {
            "@type": "Brand",
            "name": "MAKNA UANG"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": totalReviews,
            "bestRating": 5,
            "worstRating": 1
        },
        "review": REVIEWS.map(review => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": review.name
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": 5
            },
            "reviewBody": review.comment,
            "datePublished": review.date
        }))
    };

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            {/* Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(reviewData)
                }}
            />

            <Navbar />

            {/* Hero Section */}
            <section className="relative border-b border-border bg-gradient-to-br from-background via-background to-neon/5 py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Sun className="w-8 h-8 text-neon" />
                                <span className="text-neon font-bold uppercase tracking-widest text-sm">MAKNA UANG SOLAR</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                                Panel Surya<br />Berkualitas
                            </h1>
                            <p className="text-muted-foreground text-lg mb-8 max-w-xl">
                                Solusi energi bersih dan terbarukan dari Makna Uang untuk kebutuhan rumah tangga dan komersial.
                                Hemat tagihan listrik hingga 70% dengan teknologi panel surya terkini.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="#products" className="bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors inline-flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4" />
                                    Lihat Produk
                                </Link>
                                <Link href="#reviews" className="border border-border hover:border-neon px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon hover:text-black transition-colors inline-flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    Review Pelanggan
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                                <img
                                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                                    alt="Panel Surya"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="w-5 h-5 text-neon" />
                                        <span className="text-white font-bold">Terpercaya</span>
                                    </div>
                                    <p className="text-white/90 text-sm">Lebih dari 1000 pelanggan puas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="border-b border-border py-16 bg-muted/20">
                <div className="container mx-auto px-4 md:px-8">
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-12 text-center">
                        Mengapa Panel Surya Kami?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { icon: Zap, title: "Efisiensi Tinggi", desc: "Hingga 22% efisiensi konversi energi" },
                            { icon: Battery, title: "Tahan Lama", desc: "Garansi hingga 30 tahun" },
                            { icon: Sun, title: "Energi Bersih", desc: "Ramah lingkungan, bebas emisi" },
                            { icon: CheckCircle, title: "Premium Quality", desc: "Sertifikasi internasional" }
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-neon/10 rounded-full flex items-center justify-center">
                                    <item.icon className="w-8 h-8 text-neon" />
                                </div>
                                <h3 className="font-bold uppercase tracking-wider mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="py-16">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <div className="text-neon font-bold uppercase tracking-widest text-sm mb-2">MAKNA UANG SOLAR</div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter">
                                Daftar Panel Surya
                            </h2>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Tersedia</div>
                            <div className="text-2xl font-black text-neon">{PANEL_SURYA.length} Produk</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {PANEL_SURYA.map((panel) => (
                            <div key={panel.id} className="group bg-muted/20 border border-border hover:border-neon rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-neon/10">
                                {/* Image */}
                                <div className="aspect-video w-full bg-muted relative overflow-hidden">
                                    <img
                                        src={panel.image}
                                        alt={panel.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-neon text-black text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                                            {panel.power}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Brand Badge */}
                                    <div className="mb-2">
                                        <span className="text-[10px] font-black text-neon uppercase tracking-widest">
                                            {panel.brand}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg uppercase tracking-tight mb-2 group-hover:text-neon transition-colors line-clamp-1">
                                        {panel.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                        {panel.description}
                                    </p>

                                    {/* Specs */}
                                    <div className="space-y-2 mb-4 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Tipe:</span>
                                            <span className="font-medium">{panel.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Efisiensi:</span>
                                            <span className="font-medium">{panel.efficiency}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Garansi:</span>
                                            <span className="font-medium text-neon">{panel.warranty}</span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {panel.features.slice(0, 2).map((feature, i) => (
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
                                                Rp {formatPrice(panel.price)}
                                            </div>
                                        </div>
                                        <a
                                            href="https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20panel%20surya%20{encodeURIComponent(panel.name)}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-neon text-black px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-neon/90 transition-colors inline-flex items-center gap-2"
                                        >
                                            <ShoppingCart className="w-3 h-3" />
                                            Beli
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="py-16 border-t border-border bg-muted/20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Star className="w-6 h-6 text-neon fill-neon" />
                            <span className="text-4xl font-black">{averageRating.toFixed(1)}</span>
                            <span className="text-muted-foreground">/ 5.0</span>
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                            Review Pelanggan
                        </h2>
                        <p className="text-muted-foreground">Berdasarkan {totalReviews} ulasan verified</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {REVIEWS.map((review) => (
                            <div key={review.id} className="bg-background border border-border rounded-lg p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-neon text-black rounded-full flex items-center justify-center font-bold">
                                            {review.avatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{review.name}</div>
                                            <div className="text-xs text-muted-foreground">{review.location}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < review.rating ? 'text-neon fill-neon' : 'text-muted-foreground'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    "{review.comment}"
                                </p>
                                <div className="text-xs text-muted-foreground">
                                    {review.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-neon text-black">
                <div className="container mx-auto px-4 md:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                        Siap Beralih ke Energi Bersih?
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                        Konsultasikan kebutuhan panel surya Anda dengan tim ahli kami.
                        Dapatkan penawaran terbaik dan gratis konsultasi.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20konsultasi%20tentang%20panel%20surya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-neon px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-black/90 transition-colors inline-flex items-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Hubungi via WhatsApp
                        </a>
                        <a
                            href="mailto:info@maknauang.com?subject=Konsultasi Panel Surya"
                            className="bg-transparent border-2 border-black px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-black hover:text-neon transition-colors"
                        >
                            Email Kami
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
