import { ArticleGrid } from "@/components/ArticleGrid";
import { Article } from "@/lib/api";

interface TrendingNewsProps {
    articles: Article[];
}

export function TrendingNews({ articles }: TrendingNewsProps) {
    if (articles.length === 0) {
        return (
            <section className="py-12 border-t border-border text-center text-muted-foreground">
                No trending news found.
            </section>
        );
    }

    return <ArticleGrid articles={articles} />;
}
