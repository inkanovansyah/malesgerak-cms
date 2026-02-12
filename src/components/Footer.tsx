import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-border bg-background pt-16 pb-8">
            <div className="container mx-auto max-w-screen-2xl px-4 md:px-8">
                {/* <div className="grid gap-12 lg:grid-cols-12 mb-16">
                    <div className="lg:col-span-8">
                        <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl text-foreground">
                            Unparalleled access to hidden worlds both online and IRL.
                        </h2>
                    </div>
                    <div className="lg:col-span-4 flex flex-col justify-end">
                        <div className="space-y-4">
                            <label htmlFor="email" className="text-lg font-bold text-foreground">
                                Join the newsletter to get the latest updates.
                            </label>
                            <form className="flex w-full gap-0">
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex h-12 w-full rounded-none border-y border-l border-border bg-transparent px-4 py-2 text-base text-foreground placeholder:text-muted-foreground focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="h-12 border border-border bg-neon px-6 text-black hover:bg-neon/90 hover:border-neon transition-colors"
                                >
                                    <span className="sr-only">Subscribe</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-6 w-6"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div> */}

                <div className="grid gap-8 grid-cols-1 md:grid-cols-12 py-12 border-t border-border">
                    <div className="md:col-span-6 lg:col-span-5 pr-8">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            MalesGerak is an independent media company founded by technology journalists Jason Koebler, Emanuel Maiberg, Samantha Cole, and Joseph Cox.
                        </p>
                    </div>
                    <div className="md:col-span-3 lg:col-span-5 md:col-start-8">
                    </div>



                    {/* <div className="md:col-span-2 lg:col-span-2">
                        <h3 className="mb-4 font-bold text-foreground uppercase tracking-wider text-xs">Terms</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="/about" className="hover:text-neon transition-colors">About Us</Link></li>
                            <li><Link href="/terms" className="hover:text-neon transition-colors">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-neon transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-neon transition-colors">Disclaimer</Link></li>
                            <li><Link href="/redaksi" className="hover:text-neon transition-colors">Redaksi</Link></li>
                            <li><Link href="/contact" className="hover:text-neon transition-colors">Contact</Link></li>
                        </ul>
                    </div> */}
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row text-xs text-muted-foreground uppercase tracking-wider">
                    <p>© 2026 MalesGerak. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="https://malesgerak.my.id/" className="hover:text-neon">Powered by MalesGerak</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
