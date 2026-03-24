import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaf, Sprout, Cpu, Building2, TrendingUp, Shield, Users, Zap } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAKNAUANG | Apps - mahlukhidup AgriTech Platform",
  description: "mahlukhidup - Platform intelijen pertanian futuristik yang menghubungkan alam dengan teknologi data IoT dan AI untuk memaksimalkan hasil panen secara berkelanjutan. Kelola pertanian skala enterprise dengan monitoring real-time, prediksi panen cerdas, dan analisis ROI.",
  keywords: ["agritech", "pertanian cerdas", "IoT pertanian", "AI pertanian", "monitoring tanaman", "prediksi panen", "precision farming", "smart farming Indonesia", "mahlukhidup", "agriculture technology"],
  openGraph: {
    title: "mahlukhidup - Platform AgriTech Futuristik",
    description: "Platform intelijen pertanian dengan IoT dan AI untuk maksimalkan hasil panen secara berkelanjutan.",
    type: "website",
    url: "https://www.maknauang.com/apps",
  },
  twitter: {
    card: "summary_large_image",
    title: "mahlukhidup - Platform AgriTech Futuristik",
    description: "Platform intelijen pertanian dengan IoT dan AI untuk maksimalkan hasil panen secara berkelanjutan.",
  },
};

export default function AppsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neon/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-neon/30 blur-2xl rounded-full"></div>
                <Leaf className="w-16 h-16 text-neon relative z-10" />
              </div>
              <span className="text-neon font-bold tracking-[0.3em] text-sm uppercase">AgriTech Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter mb-6">
              mahluk<span className="text-neon">hidup</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              Platform intelijen pertanian futuristik yang menghubungkan <span className="text-neon font-semibold">alam</span> dengan <span className="text-neon font-semibold">teknologi data</span> untuk memaksimalkan hasil panen secara berkelanjutan.
            </p>

            <div className="mt-12 flex gap-4">
              <div className="inline-flex items-center gap-3 px-8 py-4 bg-neon/10 border-2 border-neon/50 rounded-full">
                <div className="w-3 h-3 bg-neon rounded-full animate-pulse"></div>
                <span className="text-neon font-bold tracking-widest uppercase">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-neon font-bold tracking-[0.2em] text-sm uppercase">🏛️ Core Infrastructure</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">3 Pilar Utama Platform</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Teknologi terintegrasi untuk revolusi pertanian modern</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="group relative bg-background border border-border rounded-2xl p-8 hover:border-neon/50 hover:shadow-xl hover:shadow-neon/10 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon/5 rounded-full blur-3xl group-hover:bg-neon/10 transition-all"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 flex items-center justify-center mb-6">
                  <Sprout className="w-8 h-8 text-green-500" />
                </div>

                <h3 className="text-2xl font-bold mb-4">Data-Driven IoT Ecosystem</h3>
                <p className="text-muted-foreground mb-6">Sensor fisik di lapangan yang memantau vitalitas tanaman 24/7</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Tanah</p>
                      <p className="text-sm text-muted-foreground">pH, Kelembapan, NPK (Nutrisi)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Atmosfer</p>
                      <p className="text-sm text-muted-foreground">Suhu, Kelembapan, Cahaya (Lux), Angin</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Visi Masa Depan</p>
                      <p className="text-sm text-muted-foreground">Pemindaian kamera untuk deteksi hama otomatis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="group relative bg-background border border-border rounded-2xl p-8 hover:border-neon/50 hover:shadow-xl hover:shadow-neon/10 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon/5 rounded-full blur-3xl group-hover:bg-neon/10 transition-all"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30 flex items-center justify-center mb-6">
                  <Cpu className="w-8 h-8 text-blue-500" />
                </div>

                <h3 className="text-2xl font-bold mb-4">Artificial Intelligence Engine</h3>
                <p className="text-muted-foreground mb-6">Otak pusat yang memproses miliaran titik data menjadi instruksi logis</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Prediksi Panen</p>
                      <p className="text-sm text-muted-foreground">Estimasi tonase berdasarkan tren pertumbuhan</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Diagnostik Dini</p>
                      <p className="text-sm text-muted-foreground">Mendeteksi stres tanaman sebelum terlihat</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">ROI Intelligence</p>
                      <p className="text-sm text-muted-foreground">Analisis biaya vs hasil panen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="group relative bg-background border border-border rounded-2xl p-8 hover:border-neon/50 hover:shadow-xl hover:shadow-neon/10 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon/5 rounded-full blur-3xl group-hover:bg-neon/10 transition-all"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-purple-500" />
                </div>

                <h3 className="text-2xl font-bold mb-4">Enterprise Management</h3>
                <p className="text-muted-foreground mb-6">Infrastruktur digital untuk mengelola bisnis pertanian skala besar</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Multi-Site</p>
                      <p className="text-sm text-muted-foreground">Kelola ribuan hektar dalam satu layar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Team Roles</p>
                      <p className="text-sm text-muted-foreground">Koordinasi Manager, Agronomis, Operator</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-neon mt-2"></div>
                    <div>
                      <p className="font-semibold">Open Connectivity</p>
                      <p className="text-sm text-muted-foreground">API siap integrasi dengan ERP pihak ketiga</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-neon font-bold tracking-[0.2em] text-sm uppercase">🔄 Smart Cycle</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">Siklus Kerja</h2>
            <p className="text-muted-foreground">Data IoT → AI Engine → Instruksi → Optimasi</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "📡", title: "Monitor", desc: "Sensor menangkap kondisi tanaman real-time" },
              { icon: "🧠", title: "Analyze", desc: "AI memproses anomali dan peluang" },
              { icon: "💡", title: "Decide", desc: "Sistem memberikan rekomendasi presisi" },
              { icon: "⚡", title: "Act", desc: "Eksekusi: manual atau otomatis" },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-background border border-border rounded-2xl p-6 hover:border-neon/30 transition-all group">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-neon/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IoT Dashboard Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-neon font-bold tracking-[0.2em] text-sm uppercase">📊 Real-Time Monitoring</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">Dashboard IoT</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Pantau kondisi lahan pertanian Anda secara real-time dari mana saja</p>
          </div>

          {/* Dashboard Mock */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video">
                <Image
                  src="/images/dashboard-mahlukhidup.png"
                  alt="mahlukhidup Dashboard Monitoring"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white font-bold">Live Dashboard</span>
                    <span className="text-white/70 text-sm">• Real-time IoT Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Value Section */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-neon font-bold tracking-[0.2em] text-sm uppercase">📈 Impact</span>
            <h2 className="text-4xl md:text-5xl font-black mt-4 mb-6">Nilai Bisnis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Transformasi pertanian dengan teknologi terukur</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-neon/10 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-neon" />
              </div>
              <h4 className="text-2xl font-bold mb-3">Efisiensi Biaya</h4>
              <p className="text-4xl font-black text-neon mb-2">-30%</p>
              <p className="text-muted-foreground">Penggunaan pupuk & air lebih optimal</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-neon/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-neon" />
              </div>
              <h4 className="text-2xl font-bold mb-3">Ketahanan Panen</h4>
              <p className="text-4xl font-black text-neon mb-2">+85%</p>
              <p className="text-muted-foreground">Reduksi risiko gagal panen & hama</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-neon/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-neon" />
              </div>
              <h4 className="text-2xl font-bold mb-3">Skalabilitas</h4>
              <p className="text-4xl font-black text-neon mb-2">10x</p>
              <p className="text-muted-foreground">Cakupan area per manajer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-r from-neon/10 via-neon/5 to-neon/10 border border-neon/30 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-neon/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-neon/10 border-2 border-neon/50 rounded-full mb-8">
                <div className="w-3 h-3 bg-neon rounded-full animate-pulse"></div>
                <span className="text-neon font-bold tracking-widest uppercase">Coming Soon</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-black mb-6">Platform Dalam Pengembangan</h2>
              <p className="text-xl text-muted-foreground mb-8">Kami sedang membangun masa depan pertanian Indonesia. Jadilah yang pertama tahu saat kami rilis.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-3 px-6 py-4 bg-background border border-border rounded-lg w-full sm:w-auto min-w-[300px]">
                  <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-muted-foreground">notify@mahlukhidup.com</span>
                </div>
                <a href="mailto:notify@mahlukhidup.com" className="px-8 py-4 bg-neon text-black font-bold rounded-lg hover:bg-neon/90 transition-colors whitespace-nowrap">
                  Notify Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Copyright */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2026 mahlukhidup – Menghubungkan Teknologi dengan Kehidupan</p>
        </div>
      </footer>
    </main>
  );
}
