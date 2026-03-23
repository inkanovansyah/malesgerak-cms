import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
                <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-foreground">
                        Terms <span className="text-neon">&</span> Conditions
                    </h1>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-8">Last Updated: February 9, 2026</p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">1. Introduction</h2>
                    <p>
                        Welcome to maknauang. By accessing our website, you agree to be bound by these Terms and Conditions. Please read them carefully.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">2. Intellectual Property</h2>
                    <p>
                        The content on this website, including text, graphics, logos, and images, is the property of maknauang or its content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">3. User Conduct</h2>
                    <p>
                        You agree to use our website only for lawful purposes. You must not use our site to transmit any unsolicited commercial communications or to engage in any malicious activity.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">4. Limitation of Liability</h2>
                    <p>
                        maknauang shall not be liable for any direct, indirect, incidental, or consequential damages arising out of your use of or inability to use this website.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">5. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Your continued use of the website following any changes constitutes your acceptance of the new terms.
                    </p>
                </article>
            </div>
            <Footer />
        </main>
    );
}
