"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Sun } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavbarProps {
    cartTrigger?: React.ReactNode;
}

export function Navbar({ cartTrigger }: NavbarProps) {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Check if current page is merchant or merchant product detail
    const isMerchantPage = pathname?.startsWith('/merchant') || false;

    // ... scroll effect ...
    useEffect(() => {
        const handleScroll = () => {
            // ... existing logic ...
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // For now, simpler redirection or just console log as requested is UI only. 
            // But let's verify if we should redirect. User asked for "ui ... bisa input data". 
            // We'll redirect to /search?q=... for completeness.
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
            setIsSearchOpen(false);
        }
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full border-b transition-all duration-300",
                scrolled
                    ? "bg-background/70 backdrop-blur-md border-border/50 support-[backdrop-filter]:bg-background/60"
                    : "bg-background border-border"
            )}
        >
            {/* Top Banner - Hidden when scrolled */}
            <div
                className={cn(
                    "flex items-center justify-center border-b border-border bg-background text-[10px] font-bold tracking-widest uppercase text-foreground transition-all duration-300 overflow-hidden",
                    scrolled ? "h-0 border-none opacity-0" : "h-8 opacity-100"
                )}
            >
                <span>
                    LISTEN TO THE <Link href="#" className="underline decoration-neon underline-offset-4 hover:text-neon">MAKNAUANG MEDIA YOUTUBE</Link>
                </span>
            </div>

            {/* Main Header */}
            <div className={cn("transition-all duration-300 relative", scrolled ? "bg-transparent" : "bg-background border-b border-border")}>
                <div className={cn("container mx-auto flex w-full items-center justify-between px-8 transition-all duration-300", scrolled ? "h-14" : "h-20")}>

                    {/* Search Overlay */}
                    <div className={cn(
                        "absolute inset-0 bg-background z-20 flex items-center px-8 transition-all duration-300 ease-in-out",
                        isSearchOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-full invisible pointer-events-none"
                    )}>
                        <form onSubmit={handleSearchSubmit} className="w-full flex items-center gap-4">
                            <Search className="h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="flex-1 bg-transparent border-none outline-none text-xl font-bold uppercase tracking-wider placeholder:text-muted-foreground/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus={isSearchOpen}
                            />
                            <button
                                type="button"
                                onClick={() => setIsSearchOpen(false)}
                                className="text-muted-foreground hover:text-foreground font-bold uppercase text-xs tracking-widest"
                            >
                                Close
                            </button>
                        </form>
                    </div>

                    {/* Left: Icons */}
                    <div className={cn("flex items-center gap-6 text-foreground transition-opacity duration-300", isSearchOpen ? "opacity-0" : "opacity-100")}>
                        <button onClick={() => setIsSearchOpen(true)}>
                            <Search className="h-5 w-5 hover:text-neon transition-colors" />
                            <span className="sr-only">Search</span>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <div className={cn("flex-1 flex justify-center items-center transition-opacity duration-300", isSearchOpen ? "opacity-0" : "opacity-100")}>
                        <Link href="/" className="relative group flex items-center justify-center">
                            <span className={cn("font-mono font-black italic tracking-tighter text-foreground z-10 transition-all duration-300", scrolled ? "text-2xl" : "text-4xl")}>
                                MAKNAUANG
                            </span>
                            {/* Green Scribble/Underline effect - Simplified with SVG */}
                            <svg
                                className={cn("absolute w-[120%] pointer-events-none overflow-visible top-0 left-[-10%] transition-all duration-300", scrolled ? "h-full opacity-0" : "h-full opacity-100")}
                                viewBox="0 0 100 40"
                            >
                                <path d="M 0 30 Q 50 20 100 25" fill="none" stroke="#ccff00" strokeWidth="6" className="opacity-90" strokeLinecap="round" />
                            </svg>
                        </Link>
                    </div>

                    <div className={cn("flex items-center gap-6 text-foreground transition-opacity duration-300", isSearchOpen ? "opacity-0" : "opacity-100")}>
                        {cartTrigger}
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Navigation Links - Compact when scrolled */}
            <nav className={cn("bg-transparent transition-all duration-300", scrolled ? "py-2 border-b-0" : "py-3 border-b border-border")}>
                {/* ... existing nav content ... */}
                <div className="container mx-auto flex w-full items-center justify-start md:justify-center px-4 md:px-8 overflow-x-auto no-scrollbar">
                    <div className="flex gap-6 md:gap-8 text-[10px] font-bold tracking-widest text-muted-foreground whitespace-nowrap">
                        {[
                            { name: "NEWS", href: "/news" },
                            { name: "HOT NEWS", href: "/hotnews" },
                            { name: "MERCHANT SOLAR", href: "/merchant", icon: Sun },
                            // { name: "ADVERTISE", href: "/contact" },
                            { name: "ABOUT", href: "/about" },
                            { name: "SUPPORT/FAQ", href: "/contact" },
                            { name: "PRIVACY", href: "/privacy" },
                        ].map((item) => {
                            const isActive = item.name === "MERCHANT SOLAR" ? isMerchantPage : pathname === item.href;
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-1.5 hover:text-neon transition-colors",
                                        isActive && "text-neon"
                                    )}
                                >
                                    {Icon && (
                                        <Icon
                                            className={cn(
                                                "w-3.5 h-3.5 transition-colors",
                                                // Yellow sun when merchant page is active
                                                item.name === "MERCHANT SOLAR" && isMerchantPage && "text-yellow-400 fill-yellow-400"
                                            )}
                                        />
                                    )}
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </header>
    );
}
