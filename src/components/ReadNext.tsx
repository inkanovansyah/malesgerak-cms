"use client";

import { useEffect, useState } from "react";
import { usePostStore } from "@/store/usePostStore";
import { ArticleCard } from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ReadNextProps {
    currentArticleId?: string;
}

export function ReadNext({ currentArticleId }: ReadNextProps) {
    const { posts, isLoading, fetchPosts } = usePostStore();
    const [randomPosts, setRandomPosts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch posts if they haven't been loaded or if we need fresh data
        // For simplicity, we just call fetchPosts, rely on store to handle dedupe if implemented, 
        // or just re-fetch to ensure we have data.
        if (posts.length === 0) {
            fetchPosts();
        }
    }, [fetchPosts, posts.length]);

    useEffect(() => {
        if (posts.length > 0) {
            // Filter out current article
            const availablePosts = posts.filter(post => post.slug !== currentArticleId && post.id.toString() !== currentArticleId);

            // Shuffle
            const shuffled = [...availablePosts].sort(() => 0.5 - Math.random());

            // Take 3
            setRandomPosts(shuffled.slice(0, 3));
        }
    }, [posts, currentArticleId]);

    if (isLoading && posts.length === 0) {
        return (
            <div className="flex flex-col gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <Skeleton className="aspect-video w-full rounded-sm" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    if (randomPosts.length === 0) {
        return <div className="text-muted-foreground text-sm">No other articles found.</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            {randomPosts.map((post) => (
                <ArticleCard
                    key={post.id}
                    id={post.slug}
                    category={post.category[0] || "News"}
                    title={post.title}
                    excerpt={""} // Helper text not needed for sidebars usually
                    author={post.author}
                    date={new Date(post.publishedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}
                    imageUrl={post.image}
                    variant="vertical" // Stacked vertically
                    className="mb-0" // Override default margin
                    views={post.views}
                />
            ))}
        </div>
    );
}
