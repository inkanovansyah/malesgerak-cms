import Link from "next/link";

export function AdBanner() {
    return (
        <section className="bg-background py-8 border-t border-border">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-center mb-4 text-[10px] font-bold uppercase tracking-widest gap-2">
                    <span className="text-muted-foreground">ADVERTISEMENT</span>
                    <span className="text-muted-foreground">•</span>
                    <Link href="#" className="text-neon hover:underline">GO AD FREE</Link>
                </div>
                <div className="bg-white text-black p-4 flex flex-col items-center justify-center max-w-5xl mx-auto border border-border min-h-[150px]">
                    {/* Label Kecil Penanda Iklan */}
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Advertisement
                    </p>

                    {/* Google AdSense Code */}
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block', width: '100%' }}
                        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                        data-ad-slot="XXXXXXXXXX"
                        data-ad-format="horizontal" // Menggunakan format horizontal agar pas dengan layout lebar
                        data-full-width-responsive="true"
                    ></ins>
                </div>
            </div>
        </section>
    )
}
