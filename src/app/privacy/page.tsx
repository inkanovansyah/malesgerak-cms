import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
                <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-foreground">
                        Privacy <span className="text-neon">Policy</span>
                    </h1>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest mb-8">Last Updated: February 9, 2026</p>

                    <p>
                        Your privacy is important to us. It is maknauang' policy to respect your privacy regarding any information we may collect from you across our website.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">Information We Collect</h2>
                    <p>
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">Log Data</h2>
                    <p>
                        When you visit our website, our servers may automatically log the standard data provided by your web browser. This data is considered "non-identifying information", as it does not personally identify you on its own.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">Cookies</h2>
                    <p>
                        We use "cookies" to collect information about you and your activity across our site. A cookie is a small piece of data that our website stores on your computer, and accesses each time you visit, so we can understand how you use our site.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">Security</h2>
                    <p>
                        We take security seriously and take reasonable steps to protect your personal information from loss, theft, and unauthorized access, disclosure, copying, use, or modification.
                    </p>

                    <h2 className="text-xl font-bold uppercase tracking-wide text-neon mt-8 mb-4">Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this privacy policy, please contact us via our Contact page.
                    </p>
                </article>
            </div>
            <Footer />
        </main>
    );
}
