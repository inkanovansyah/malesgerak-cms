"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "@/components/ArticleCard";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Article, Tag, getLatestArticles, getAllTags } from "@/lib/api";

interface LatestNewsProps {
    initialArticles: Article[];
    categories: Tag[];
    allTags: Tag[];
    trendingArticles: Article[];
    defaultTag?: string | number;
}

export function LatestNews({ initialArticles, categories, allTags, trendingArticles, defaultTag = "ALL" }: LatestNewsProps) {
    const [selectedTag, setSelectedTag] = useState<string | number>(defaultTag);
    const [allArticles, setAllArticles] = useState<Article[]>(initialArticles);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Hero shows 8 articles, so ALL tab starts from offset 8
    const INITIAL_OFFSET_ALL = 8;
    const PER_PAGE = 8;

    // Fetch articles when tag changes (non-ALL tabs)
    const { data: articles, isLoading, isFetching } = useQuery({
        queryKey: ['latest-news', selectedTag],
        queryFn: () => getLatestArticles(selectedTag, 1, PER_PAGE, 0), // No offset for filtered categories
        enabled: selectedTag !== defaultTag,
    });

    // Update articles when tag changes and data is fetched
    useEffect(() => {
        if (selectedTag !== defaultTag && articles) {
            setAllArticles(articles);
            setCurrentPage(1);
        } else if (selectedTag === defaultTag) {
            setAllArticles(initialArticles);
            setCurrentPage(1);
        }
    }, [selectedTag, articles, initialArticles, defaultTag]);

    const displayedArticles = selectedTag === defaultTag ? allArticles : (articles || []);

    const handleLoadMore = useCallback(async () => {
        if (isLoadingMore) return;

        setIsLoadingMore(true);
        try {
            const nextPage = currentPage + 1;

            // Calculate offset based on current articles count
            // For ALL tab: we already have INITIAL_OFFSET_ALL (8) from Hero + current articles
            // For other tabs: just use current articles count
            const currentCount = displayedArticles.length;
            const offset = selectedTag === "ALL"
                ? INITIAL_OFFSET_ALL + currentCount
                : currentCount;

            const moreArticles = await getLatestArticles(selectedTag, nextPage, PER_PAGE, offset);

            if (moreArticles.length > 0) {
                setAllArticles(prev => [...prev, ...moreArticles]);
                setCurrentPage(nextPage);
            }
        } catch (error) {
            console.error("Failed to load more articles:", error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [currentPage, selectedTag, isLoadingMore, displayedArticles.length]);

    const handleTagClick = (tag: Tag | "ALL") => {
        const tagIdentifier = tag === "ALL" ? "ALL" : tag.id;
        setSelectedTag(tagIdentifier);
    };

    const displayedTags = [
        { id: -1, name: "ALL", slug: "ALL", count: 0 },
        ...(categories || [])
    ];

    const hasMore = displayedArticles.length >= PER_PAGE && displayedArticles.length % PER_PAGE === 0;

    return (
        <section className="py-12 border-t border-border bg-background">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content: Latest Stories */}
                    <div className="lg:col-span-9">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-border gap-4">
                            <h2 className="text-3xl font-black uppercase text-foreground tracking-tighter">
                                Paling Mutakhir
                            </h2>
                            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full md:w-auto max-w-full md:max-w-[70%] mask-fade-right">
                                {displayedTags.map((tag) => (
                                    <button
                                        key={tag.id}
                                        onClick={() => handleTagClick(tag.slug === "ALL" ? "ALL" : tag)}
                                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-sm whitespace-nowrap flex-shrink-0 ${selectedTag === (tag.slug === "ALL" ? "ALL" : tag.id)
                                            ? "bg-neon text-black"
                                            : "text-muted-foreground hover:text-foreground"
                                            }`}
                                    >
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-0 min-h-[400px]">
                            {isLoading || isFetching ? (
                                // Loading Skeletons
                                Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex gap-4 py-4 border-b border-border/50 animate-pulse">
                                        <Skeleton className="w-1/3 aspect-video rounded-sm" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-1/4" />
                                            <Skeleton className="h-6 w-3/4" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </div>
                                ))
                            ) : displayedArticles.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    No articles found for "{selectedTag}".
                                </div>
                            ) : (
                                <>
                                    {displayedArticles.map((article, index) => (
                                        <ArticleCard
                                            key={`${article.id}-${index}`}
                                            id={article.slug}
                                            category={article.category}
                                            title={article.title}
                                            excerpt={article.excerpt}
                                            author={article.author}
                                            authorSlug={article.authorSlug}
                                            date={article.date}
                                            imageUrl={article.imageUrl}
                                            priority={index < 2}
                                            variant="horizontal"
                                            views={article.views}
                                        />
                                    ))}
                                    {isLoadingMore && (
                                        <>
                                            {Array.from({ length: 4 }).map((_, i) => (
                                                <div key={`loading-${i}`} className="flex gap-4 py-4 border-b border-border/50 animate-pulse">
                                                    <Skeleton className="w-1/3 aspect-video rounded-sm" />
                                                    <div className="flex-1 space-y-2">
                                                        <Skeleton className="h-4 w-1/4" />
                                                        <Skeleton className="h-6 w-3/4" />
                                                        <Skeleton className="h-4 w-full" />
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="mt-12 flex justify-center">
                            {hasMore ? (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={isLoadingMore}
                                    className="bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors w-full md:w-auto inline-block text-center rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoadingMore ? "Loading..." : "Load More Stories"}
                                </button>
                            ) : displayedArticles.length > 0 ? (
                                <Link href="/hotnews" className="bg-muted text-muted-foreground px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-muted/80 transition-colors w-full md:w-auto inline-block text-center rounded-sm">
                                    View All Stories
                                </Link>
                            ) : null}
                        </div>
                    </div>

                    {/* Sidebar: Trending & Ads */}
                    <div className="lg:col-span-3 space-y-12">
                        {/* Trending Section */}
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-neon/50">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                    TRENDING
                                </h3>
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex flex-col gap-4">
                                {trendingArticles.map((item, index) => (
                                    <Link key={item.id} href={`/news/${item.slug}`} className="group flex items-center gap-4 hover:bg-muted p-2 rounded-sm transition-colors">
                                        <span className="flex items-center justify-center w-8 h-8 font-mono font-bold text-lg text-muted-foreground border border-border rounded-sm group-hover:border-neon group-hover:text-neon transition-colors">
                                            {index + 1}
                                        </span>
                                        <span className="font-bold text-foreground group-hover:text-neon transition-colors line-clamp-1">
                                            {item.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Advertisement Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                                    ADVERTISEMENT
                                </h3>
                            </div>
                            <div className="w-full aspect-[3/4] bg-muted border border-border flex flex-col items-center justify-center text-center p-8">
                                <span className="text-gray-600 text-xs uppercase tracking-widest mb-4">Space Available</span>
                                <div className="text-neon font-mono text-xl font-bold">YOUR AD HERE</div>
                                <button className="mt-6 text-xs text-foreground underline decoration-neon underline-offset-4 hover:text-neon">Contact Us</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
}
