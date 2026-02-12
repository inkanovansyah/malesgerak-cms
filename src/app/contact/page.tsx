import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-foreground">
                        Contact <span className="text-neon">Us</span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                        We'd love to hear from you. Whether you have a news tip, a question about your subscription, or just want to say hello, fill out the form below.
                    </p>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                            <select
                                id="subject"
                                className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors"
                            >
                                <option>General Inquiry</option>
                                <option>News Tip</option>
                                <option>Correction</option>
                                <option>Advertising / Sponsorship</option>
                                <option>Support</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                            <textarea
                                id="message"
                                rows={6}
                                className="w-full bg-muted/30 border border-border rounded-sm px-4 py-3 text-foreground focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-colors resize-none"
                                placeholder="How can we help?"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="bg-neon text-black px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neon/90 transition-colors w-full md:w-auto rounded-sm"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
}
