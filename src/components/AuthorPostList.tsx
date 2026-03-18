"use client";

import { Article } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsByAuthor } from "@/lib/api";

interface AuthorPostListProps {
    initialPosts: Article[];
    authorId: number;
}

export function AuthorPostList({ initialPosts, authorId }: AuthorPostListProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['author-posts', authorId],
        queryFn: ({ pageParam = 1 }) => getPostsByAuthor(authorId, pageParam as number),
        getNextPageParam: (lastPage: Article[], allPages: Article[][]) => {
            return lastPage.length === 0 ? undefined : allPages.length + 1;
        },
        initialPageParam: 1,
        initialData: {
            pages: [initialPosts],
            pageParams: [1],
        },
    });

    const posts = data?.pages.flat() || [];

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((article, index) => (
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
                        views={article.views}
                    />
                ))}
            </div>

            {hasNextPage && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className="bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isFetchingNextPage ? "Loading..." : "Load More Stories"}
                    </button>
                </div>
            )}

            {!hasNextPage && posts.length > 0 && (
                <div className="text-center text-muted-foreground text-sm uppercase tracking-widest pt-8">
                    No more stories to load
                </div>
            )}
        </div>
    );
}
