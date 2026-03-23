import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
                <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-foreground">
                        Tentang <span className="text-neon">Kami</span>
                    </h1>
                    <p className="lead text-xl text-muted-foreground mb-8">
                        maknauang adalah platform media independen yang menghadirkan wawasan mendalam tentang ekonomi, teknologi, dan stabilitas finansial. Kami percaya pada jurnalisme yang berani, mendetail, dan mudah diakses.
                    </p>
                    <p>
                        Berdiri sejak 2026, kami berkomitmen untuk menyajikan informasi yang akurat dan relevan. Dari perkembangan teknologi terbaru hingga isu-isu finansial yang mempengaruhi kehidupan sehari-hari, tim redaksi kami bekerja tanpa henti untuk memverifikasi fakta dan menyajikannya dengan cara yang menghargai kecerdasan pembaca.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-wide text-neon mt-12 mb-6">Misi Kami</h2>
                    <p>
                        Memberikan akses informasi yang tak tertandingi tentang dunia ekonomi dan teknologi. Kami berdiri untuk transparansi, integritas, dan pengejaran kebenaran.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-wide text-neon mt-12 mb-6">Nilai-Nilai Kami</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Integritas:</strong> Kami memegang standar etika jurnalisme tertinggi.</li>
                        <li><strong>Independensi:</strong> Kami tidak terikat dengan kepentingan korporat.</li>
                        <li><strong>Inovasi:</strong> Kami mengadopsi teknologi terbaru untuk menyampaikan cerita dengan lebih baik.</li>
                    </ul>

                    <h2 className="text-2xl font-bold uppercase tracking-wide text-neon mt-12 mb-6">Inovasi Berkelanjutan</h2>
                    <p>
                        Kami tidak hanya merangkul teknologi terbaru untuk menyampaikan cerita dengan lebih baik, tetapi juga mengembangkan teknologi tersebut untuk menciptakan masa depan bumi yang lebih hijau dan ramah lingkungan.
                    </p>

                    <h2 className="text-2xl font-bold uppercase tracking-wide text-neon mt-12 mb-6">Kolaborasi</h2>
                    <p>
                        Terbuka untuk peluang kerjasama dalam berbagai bentuk - sponsorship, partnership, content creation, dan project bersama. Mari bersama menciptakan dampak positif.
                    </p>

                    <div className="bg-accent/5 border border-border rounded-xl p-6 md:p-8 mt-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">WhatsApp</p>
                                    <a href="https://wa.me/62895358584578" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-neon transition-colors">
                                        +62 895-3585-84578
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email</p>
                                    <a href="mailto:koleb@maknauang.com" className="text-lg font-semibold hover:text-neon transition-colors block">
                                        koleb@maknauang.com
                                    </a>
                                    <a href="mailto:inka@maknauang.com" className="text-lg font-semibold hover:text-neon transition-colors block">
                                        inka@maknauang.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <Footer />
        </main>
    );
}
