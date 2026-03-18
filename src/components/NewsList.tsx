"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// Helper to fetch directly from Client side if needed, or re-use api.ts if possible.
// Since we need to use the same logic as server, and api.ts uses simple axios, we can use it.
// But valid imports in client components from lib/api are fine as long as they don't use node-only deps (axios is fine).
import { getLatestArticles } from "@/lib/api";

interface NewsListProps {
    initialArticles: Article[];
    title?: string;
}

export function NewsList({ initialArticles, title = "Latest News" }: NewsListProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['news-archive'],
        queryFn: async ({ pageParam = 0 }) => {
            // Initial load is 9 (handled by initialData).
            // Subsequent loads are +3. 
            // offset logic: Initial 9. pageParam 1 needs offset 9. pageParam 2 needs offset 12.
            // map pageParam to offset. 
            // pageParam starts at 1 for the first *fetched* page (which is technically the 2nd visual page).
            // offset = 9 + (pageParam - 1) * 3

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
            pageParams: [0], // Dummy param for initial page
        },
    });

    const articles = data ? data.pages.flat() : [];

    return (
        <div className="container mx-auto px-4 md:px-8 py-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                <span>/</span>
                <span className="text-neon">{title}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-12">
                {title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
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
                        variant="vertical"
                        className="h-full"
                        views={article.views}
                    />
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isFetchingNextPage ? "Loading..." : "Load More Stories"}
                </button>
            </div>
        </div>
    );
}
