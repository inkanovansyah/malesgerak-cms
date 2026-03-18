"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useEmblaCarousel from "embla-carousel-react";
import { getTrendingArticles, type Article } from "@/lib/api";

export function Hero() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 1 }
        }
    });

    const [posts, setPosts] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await getTrendingArticles();
                setPosts(data.slice(0, 8)); // Take first 8 posts
                setHasLoaded(true);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError("Failed to load content");
                setHasLoaded(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadPosts();
    }, []);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // Show loading skeleton if loading OR if we haven't loaded yet
    const showLoading = isLoading || !hasLoaded;

    if (error) {
        return <div className="text-center text-red-500 py-10">Failed to load content.</div>;
    }

    return (
        <section className="relative border-b border-border py-4 bg-background overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative group">
                {/* Navigation Buttons - Hidden on Mobile to prevent overflow/clutter */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-neon text-black hidden md:flex items-center justify-center -ml-4 md:-ml-6 shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 md:h-12 md:w-12 rounded-full bg-neon text-black hidden md:flex items-center justify-center -mr-4 md:-mr-6 shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Carousel Container */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-6">
                        {showLoading ? (
                            // Generating 4 skeleton items
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6">
                                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm mb-4">
                                        <Skeleton className="absolute inset-0 z-10" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <Skeleton className="h-6 w-3/4 mx-auto" />
                                        <Skeleton className="h-4 w-1/2 mx-auto" />
                                    </div>
                                </div>
                            ))
                        ) : posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] pl-6 group/card cursor-pointer select-none">
                                    {/* Image Container */}
                                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm mb-4">
                                        <Image
                                            src={post.imageUrl}
                                            alt={post.title}
                                            fill
                                            draggable={false}
                                            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                        />
                                        {/* Tag */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neon px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black whitespace-nowrap">
                                            {post.category || "NEWS"}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center space-y-2">
                                        <h3 className="text-lg font-bold leading-tight group-hover/card:text-neon text-foreground transition-colors line-clamp-2">
                                            <Link href={`/news/${post.slug}`}>{post.title}</Link>
                                        </h3>
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <span className="w-3 h-3 rounded-full border border-muted-foreground flex items-center justify-center">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground"></span>
                                                </span>
                                                {post.author ? `BY ${post.author.toUpperCase()}` : "BY ADMIN"}
                                            </span>
                                            <span className="text-muted-foreground">|</span>
                                            <span>
                                                {post.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-10 text-muted-foreground">
                                No posts found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
