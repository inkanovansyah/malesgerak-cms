import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPostsByCategory } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, FolderOpen } from "lucide-react";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const { category } = await getPostsByCategory(slug);

    if (!category) {
        return {
            title: "Category Not Found",
        };
    }

    return {
        title: `${category.name} - MaknaUang`,
        description: `Browse all ${category.name} news and articles.`,
    };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { slug } = await params;
    const resolvedParams = await searchParams;
    const page = parseInt(resolvedParams.page || "1", 10);

    const { articles, category, total } = await getPostsByCategory(slug, page);

    if (!category) {
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
                    <Link href="/categories" className="hover:text-neon transition-colors">Categories</Link>
                    <span>/</span>
                    <span className="text-neon">{category.name}</span>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        {category.name}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        {total} {total === 1 ? 'article' : 'articles'} in this category
                    </p>
                </div>

                {/* Articles Grid */}
                {articles.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No articles found in this category.</p>
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
                                    href={`/category/${slug}?page=${page - 1}`}
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
                                    href={`/category/${slug}?page=${page + 1}`}
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
