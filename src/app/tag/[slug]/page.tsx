import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPostsByTag } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, Tag as TagIcon } from "lucide-react";
import { notFound } from "next/navigation";

interface TagPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { tag } = await getPostsByTag(slug);

    if (!tag) {
        return {
            title: "Tag Not Found",
        };
    }

    return {
        title: `#${tag.name} - MaknaUang`,
        description: `Browse all articles tagged with "${tag.name}".`,
    };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
    const { slug } = await params;
    const resolvedParams = await searchParams;
    const page = parseInt(resolvedParams.page || "1", 10);

    const { articles, tag, total } = await getPostsByTag(slug, page);

    if (!tag) {
        notFound();
    }

    const totalPages = Math.ceil(total / 9);
    const hasMore = page < totalPages;

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/tags" className="hover:text-neon transition-colors">Tags</Link>
                    <span>/</span>
                    <span className="text-neon">#{tag.name}</span>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                            #{tag.name}
                        </h1>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full">
                            <TagIcon className="w-5 h-5 text-neon" />
                            <span className="font-bold uppercase tracking-widest text-sm">
                                {total} {total === 1 ? 'article' : 'articles'}
                            </span>
                        </div>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        All articles tagged with "{tag.name}"
                    </p>
                </div>

                {/* Articles Grid */}
                {articles.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <TagIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No articles found with this tag.</p>
                    </div>
                ) : (
                    <>
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
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-16 flex justify-center gap-2">
                            {page > 1 && (
                                <Link
                                    href={`/tag/${slug}?page=${page - 1}`}
                                    className="px-6 py-3 border border-border hover:border-neon hover:bg-neon hover:text-black rounded-sm transition-colors font-bold uppercase tracking-widest text-sm"
                                >
                                    Previous
                                </Link>
                            )}

                            <span className="px-6 py-3 bg-muted/30 rounded-sm font-bold uppercase tracking-widest text-sm text-muted-foreground">
                                Page {page} of {totalPages}
                            </span>

                            {hasMore && (
                                <Link
                                    href={`/tag/${slug}?page=${page + 1}`}
                                    className="px-6 py-3 border border-border hover:border-neon hover:bg-neon hover:text-black rounded-sm transition-colors font-bold uppercase tracking-widest text-sm"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </main>
    );
}
