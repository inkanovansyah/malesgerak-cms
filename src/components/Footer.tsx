import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-border bg-background pt-16 pb-8">
            <div className="container mx-auto max-w-screen-2xl px-4 md:px-8">
                <div className="grid gap-8 grid-cols-1 md:grid-cols-12 py-12 border-t border-border">
                    <div className="md:col-span-6 lg:col-span-5 pr-8">
                        <h3 className="text-2xl font-bold tracking-tighter text-foreground mb-4">
                            MAKNAUANG
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Dari pergolakan dunia menuju stabilitas financial. Berita dan analisis mendalam tentang ekonomi dan stabilitas finansial.
                        </p>
                    </div>
                   
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row text-xs text-muted-foreground uppercase tracking-wider">
                    <p>© 2026 MAKNAUANG. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-neon transition-colors">Privacy</Link>
                        <Link href="/contact" className="hover:text-neon transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
