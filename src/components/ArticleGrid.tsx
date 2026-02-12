import { ArticleCard } from "@/components/ArticleCard";

import { Article } from "@/lib/api";

interface ArticleGridProps {
    articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
    return (
        <section className="py-12 border-t border-border">
            <div className="container mx-auto px-4 md:px-8">
                <h2 className="mb-8 text-2xl font-bold tracking-tighter uppercase text-neon">
                    Hot News
                </h2>
                <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={article.id}
                            id={article.slug}
                            category={article.category}
                            title={article.title}
                            excerpt={article.excerpt}
                            author={article.author}
                            date={article.date}
                            imageUrl={article.imageUrl}
                            priority={index < 3}
                            variant="vertical"
                        />
                    ))}
                </div>
                {/* <div className="mt-12 flex justify-center">
                    <button className="bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors w-full md:w-auto">
                        Load More Stories
                    </button>
                </div> */}
            </div>
        </section>
    );
}
