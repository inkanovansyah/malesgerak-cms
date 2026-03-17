import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllTags } from "@/lib/api";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, Tag } from "lucide-react";

export const metadata: Metadata = {
    title: "Tags - MaknaUang",
    description: "Browse all news tags on MaknaUang.",
};

export default async function TagsPage() {
    const tags = await getAllTags();

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-neon">Tags</span>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        Tags
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Browse news by topic ({tags.length} tags)
                    </p>
                </div>

                {/* Tags Cloud/Grid */}
                {tags.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <Tag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No tags found.</p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => {
                            // Calculate size based on count (more articles = bigger)
                            const maxCount = Math.max(...tags.map(t => t.count));
                            const sizePercent = Math.max(60, (tag.count / maxCount) * 100);
                            const fontSize = Math.min(24, Math.max(12, sizePercent / 8));

                            return (
                                <Link
                                    key={tag.id}
                                    href={`/tag/${tag.slug}`}
                                    className="group"
                                >
                                    <div
                                        className="px-4 py-2 bg-muted/30 border border-border hover:border-neon hover:bg-neon hover:text-black rounded-full transition-all duration-300 cursor-pointer"
                                        style={{ fontSize: `${fontSize}px` }}
                                    >
                                        <span className="font-bold uppercase tracking-wide">
                                            #{tag.name}
                                        </span>
                                        <span className="text-xs opacity-60 ml-2">
                                            ({tag.count})
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
