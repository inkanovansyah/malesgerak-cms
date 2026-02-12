import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RedaksiPage() {
    // Mock team data
    const team = [
        { name: "Jason Koebler", role: "Editor-in-Chief", bio: "Co-founder of SAKUNEWS. Previously at Motherboard.", image: "https://ui-avatars.com/api/?name=Jason+Koebler&background=random" },
        { name: "Samantha Cole", role: "Senior Editor", bio: "Co-founder. Writes about the internet, labor, and sex tech.", image: "https://ui-avatars.com/api/?name=Samantha+Cole&background=random" },
        { name: "Emanuel Maiberg", role: "Executive Editor", bio: "Co-founder. Covers gaming, politics, and culture.", image: "https://ui-avatars.com/api/?name=Emanuel+Maiberg&background=random" },
        { name: "Joseph Cox", role: "Verification Lead", bio: "Co-founder. Investigative journalism on security and hacking.", image: "https://ui-avatars.com/api/?name=Joseph+Cox&background=random" },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-foreground">
                        Redaksi / <span className="text-neon">Editorial Team</span>
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {team.map((member) => (
                            <div key={member.name} className="flex gap-6 items-start group">
                                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-full bg-muted border-2 border-transparent group-hover:border-neon transition-colors">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-neon transition-colors">{member.name}</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{member.role}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-12 border-t border-border">
                        <h2 className="text-2xl font-bold uppercase tracking-wide text-foreground mb-6">Contact the Editors</h2>
                        <p className="text-muted-foreground mb-6">
                            Have a tip, correction, or inquiry? You can reach out to our editorial team directly or use our general contact form.
                        </p>
                        <Link href="/contact" className="inline-block bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors rounded-sm">
                            Go to Contact Form
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
