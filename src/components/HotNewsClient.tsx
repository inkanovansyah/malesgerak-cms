"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { getLatestArticles } from "@/lib/api";

interface HotNewsClientProps {
    initialArticles: Article[];
    trendingArticles: Article[];
}

export function HotNewsClient({ initialArticles, trendingArticles }: HotNewsClientProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['hot-news'],
        queryFn: async ({ pageParam = 0 }) => {
            const offset = 9 + (pageParam - 1) * 3;
            return getLatestArticles("ALL", 1, 3, offset);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 3) return undefined;
            return allPages.length + 1;
        },
        initialData: {
            pages: [initialArticles],
            pageParams: [0],
        },
    });

    const articles = data ? data.pages.flat() : [];

    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                <span>/</span>
                <span className="text-neon">Hot News</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-9">
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
                        Hot News
                    </h1>

                    <div className="flex flex-col gap-0">
                        {articles.map((article, index) => (
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
                                priority={index < 3}
                                variant="horizontal"
                                className="h-full"
                                views={article.views}
                            />
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                        >
                            {isFetchingNextPage ? "Loading..." : "Load More Stories"}
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
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
    );
}
