import Link from "next/link";
import { getAllCategories, getAllTags, getTrendingArticles } from "@/lib/api";
import { ArticleCard } from "@/components/ArticleCard";
import { Tag as TagIcon, Eye, TrendingUp, Calendar, FolderOpen } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hot News - MaknaUang",
    description: "Trending articles and popular topics.",
};

export default async function HotNewsPage() {
    const [categories, tags, trendingArticles] = await Promise.all([
        getAllCategories(),
        getAllTags(),
        getTrendingArticles()
    ]);

    // Calculate date range (this week)
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    };

    // Get top tags by count
    const topTags = tags.sort((a, b) => b.count - a.count).slice(0, 12);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            {/* Navbar */}
            <div className="border-b border-border bg-background">
                <div className="container mx-auto px-4 md:px-8 py-4">
                    <Link href="/" className="text-xl font-black uppercase tracking-tighter hover:text-neon transition-colors">
                        MAKNAUANG
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-neon">Hot News</span>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                                    Hot News
                                </h1>
                                <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neon text-black rounded-full">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="font-bold uppercase tracking-widest text-xs">
                                        Trending
                                    </span>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-lg">
                                Trending articles and popular topics
                            </p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-muted/30 border border-border rounded-lg">
                            <Calendar className="w-5 h-5 text-neon" />
                            <div className="text-sm">
                                <div className="font-bold uppercase tracking-widest text-foreground">
                                    {formatDate(weekAgo)} - {formatDate(today)}
                                </div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Past 7 Days
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Trending Articles */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                                <h2 className="text-xl font-black uppercase text-foreground tracking-tighter">
                                    Trending Articles
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-bold uppercase tracking-widest">
                                        {trendingArticles.length} Stories
                                    </span>
                                </div>
                            </div>

                            {trendingArticles.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No trending articles found.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {trendingArticles.slice(0, 9).map((article, index) => (
                                            <Link
                                                key={`${article.id}-${index}`}
                                                href={`/news/${article.slug}`}
                                                className="group"
                                            >
                                                <div className="bg-muted/20 border border-border hover:border-neon rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-neon/10 h-full">
                                                    <div className="aspect-video w-full bg-muted relative">
                                                        {article.imageUrl && (
                                                            <img
                                                                src={article.imageUrl}
                                                                alt={article.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        )}
                                                        <div className="absolute top-3 left-3">
                                                            <span className="px-2 py-1 bg-neon text-black text-xs font-bold uppercase tracking-widest rounded-sm">
                                                                #{index + 1}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="p-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="px-2 py-0.5 bg-neon/10 text-neon text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                                                {article.category}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground">
                                                                {article.date}
                                                            </span>
                                                        </div>
                                                        <h3 className="font-bold text-foreground uppercase tracking-tight mb-2 group-hover:text-neon transition-colors line-clamp-2">
                                                            {article.title}
                                                        </h3>
                                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                            <span>By {article.author}</span>
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="w-3 h-3" />
                                                                <span className="font-bold uppercase tracking-wider">
                                                                    {Math.floor(Math.random() * 10 + 1)}K
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {trendingArticles.length > 9 && (
                                        <div className="mt-8 flex justify-center">
                                            <Link
                                                href="/tags"
                                                className="inline-flex items-center gap-2 bg-neon text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-neon/90 transition-colors rounded-sm"
                                            >
                                                View More
                                                <TrendingUp className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* All Categories */}
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                                <h2 className="text-xl font-black uppercase text-foreground tracking-tighter">
                                    All Categories
                                </h2>
                                <FolderOpen className="w-5 h-5 text-neon" />
                            </div>

                            {categories.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <FolderOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No categories found.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/category/${category.slug}`}
                                            className="group"
                                        >
                                            <div className="bg-muted/30 border border-border hover:border-neon hover:bg-neon hover:text-black rounded-lg p-4 text-center transition-all duration-300">
                                                <div className="text-base font-black uppercase tracking-tight mb-2 group-hover:text-neon transition-colors">
                                                    {category.name}
                                                </div>
                                                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-black/70">
                                                    {category.count} {category.count === 1 ? 'article' : 'articles'}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Hot Topics */}
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                                <h2 className="text-lg font-black uppercase text-foreground tracking-tighter">
                                    Hot Topics
                                </h2>
                                <TrendingUp className="w-5 h-5 text-neon" />
                            </div>

                            {topTags.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <TagIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>No tags found.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2 mb-6">
                                        {topTags.map((tag) => (
                                            <Link
                                                key={tag.id}
                                                href={`/tag/${tag.slug}`}
                                                className="group block px-3 py-2 bg-muted/30 border border-border hover:border-neon hover:bg-neon hover:text-black rounded-lg transition-all duration-300"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold uppercase tracking-tight text-sm group-hover:text-neon transition-colors">
                                                        #{tag.name}
                                                    </span>
                                                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-black/70">
                                                        {tag.count}
                                                    </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <Link
                                        href="/tags"
                                        className="w-full flex items-center justify-center gap-2 bg-muted text-foreground px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-neon hover:text-black transition-colors rounded-sm"
                                    >
                                        View All Tags
                                        <TagIcon className="w-3 h-3" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Weekly Stats */}
                        <div className="bg-muted/20 border border-border rounded-lg p-5">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                                This Week's Stats
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs">Total Articles</span>
                                    <span className="font-mono font-bold text-neon text-sm">{trendingArticles.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs">Total Views</span>
                                    <span className="font-mono font-bold text-neon text-sm">124.5K</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs">Categories</span>
                                    <span className="font-mono font-bold text-neon text-sm">{categories.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs">Tags</span>
                                    <span className="font-mono font-bold text-neon text-sm">{tags.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-border bg-muted/30">
                <div className="container mx-auto px-4 md:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">MAKNAUANG</h4>
                            <p className="text-muted-foreground text-sm">Berita dan analisis mendalam tentang ekonomi dan stabilitas finansial.</p>
                        </div>
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/" className="text-muted-foreground hover:text-neon transition-colors">Home</Link></li>
                                <li><Link href="/categories" className="text-muted-foreground hover:text-neon transition-colors">Categories</Link></li>
                                <li><Link href="/tags" className="text-muted-foreground hover:text-neon transition-colors">Tags</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/privacy" className="text-muted-foreground hover:text-neon transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="text-muted-foreground hover:text-neon transition-colors">Terms of Service</Link></li>
                                <li><Link href="/disclaimer" className="text-muted-foreground hover:text-neon transition-colors">Disclaimer</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} MaknaUang. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}
