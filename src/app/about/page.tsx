import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
                <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-foreground">
                        About <span className="text-neon">Us</span>
                    </h1>
                    <p className="lead text-xl text-muted-foreground mb-8">
                        SAKUNEWS is an independent media company dedicated to uncovering hidden worlds, both online and IRL. We believe in journalism that is fearless, detailed, and accessible.
                    </p>
                    <p>
                        Founded in 2026, we aim to bring you stories that matter, from the depths of the internet to the streets of your city. Our team of dedicated journalists works tirelessly to verify facts and present them in a way that respects your intelligence.
                    </p>
                    <h2 className="text-2xl font-bold uppercase tracking-wide text-neon mt-12 mb-6">Our Mission</h2>
                    <p>
                        To provide unparalleled access to information that shapes our world. We stand for transparency, integrity, and the pursuit of truth.
                    </p>
                    <h2 className="text-2xl font-bold uppercase tracking-wide text-neon mt-12 mb-6">Our Values</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Integrity:</strong> We adhere to the highest standards of journalistic ethics.</li>
                        <li><strong>Independence:</strong> We are not beholden to corporate interests.</li>
                        <li><strong>Innovation:</strong> We embrace new technologies to tell better stories.</li>
                    </ul>
                </article>
            </div>
            <Footer />
        </main>
    );
}
