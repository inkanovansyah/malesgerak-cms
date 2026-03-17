import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Send } from "lucide-react";
import { ReadNext } from "@/components/ReadNext";
import { getArticleBySlug } from "@/lib/api";
import { cleanArticleContentServer } from "@/lib/server-utils";
import { ArticleActions } from "@/components/ArticleActions";
import { ViewCounter } from "@/components/ViewCounter";

// Disable caching for this page to ensure views are incremented on each visit
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const slug = decodeURIComponent(id);
    const article = await getArticleBySlug(slug);

    if (!article) {
        return {
            title: "Article Not Found",
        };
    }

    return {
        title: article.title,
        description: article.excerpt || `Read ${article.title} on MaknaUang.`,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: [article.imageUrl],
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const slug = decodeURIComponent(id);
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }



    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />

            <article className="container mx-auto px-4 md:px-8 pt-12 pb-24">
                {/* Header Section */}
                <header className="max-w-8xl mb-12">
                    <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                        <span>/</span>
                        <Link href={`/?tag=${article.categorySlug}`} className="text-neon hover:underline decoration-neon underline-offset-4">
                            {article.category || "News"}
                        </Link>
                        <span>/</span>
                        <span className="text-muted-foreground truncate max-w-[200px] md:max-w-[400px]">
                            {article.title}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-6">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-6 border-y border-border py-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-muted overflow-hidden relative">
                                <Image
                                    src={`https://ui-avatars.com/api/?name=${article.author}&background=random`}
                                    alt={article.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-bold text-sm text-foreground">
                                    {article.author}
                                </div>
                                <div className="text-xs text-muted-foreground font-mono uppercase">Author</div>
                            </div>
                        </div>

                        <div className="flex-1"></div>

                        <div className="flex gap-4 items-center">
                            <ViewCounter views={article.views} />
                            <ArticleActions
                                views={article.views || 0}
                                slug={slug}
                                title={article.title}
                            />
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        {/* Featured Image */}
                        {article.imageUrl && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-sm mb-12 bg-muted">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}

                        {/* Article Body */}
                        <div
                            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-neon prose-img:rounded-sm"
                            dangerouslySetInnerHTML={{ __html: cleanArticleContentServer(article.content) }}
                        />

                        {/* Tags Section */}
                        {article.tags && article.tags.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold uppercase tracking-widest rounded-sm">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Validated Comments Section (Placeholder for now) */}
                        <div id="comments-section" className="mt-16 pt-12 border-t border-border">
                            <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight mb-8">
                                Comments
                            </h3>
                            <div className="bg-muted/30 p-6 rounded-sm border border-border">
                                <h4 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Leave a Comment</h4>
                                <textarea
                                    className="w-full bg-background border border-border rounded-sm p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon min-h-[120px] mb-4 text-sm"
                                    placeholder="Join the discussion..."
                                ></textarea>
                                <div className="flex justify-end">
                                    <button className="bg-neon text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-neon/90 rounded-sm flex items-center gap-2">
                                        <Send className="w-3 h-3" />
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Read Next */}
                        <div className="sticky top-24">
                            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-neon/50">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                                    READ NEXT
                                </h3>
                            </div>
                            <div className="flex flex-col gap-6">
                                <ReadNext currentArticleId={slug} />
                            </div>

                            {/* Sidebar Ad */}
                            <div className="mt-12 w-full aspect-[3/4] bg-muted border border-border flex flex-col items-center justify-center text-center p-8">
                                <span className="text-gray-600 text-xs uppercase tracking-widest mb-4">Space Available</span>
                                <div className="text-neon font-mono text-xl font-bold">YOUR AD HERE</div>
                            </div>
                        </div>
                    </aside>
                </div>
            </article>

            <Footer />
        </main>
    );
}
