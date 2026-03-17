import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAllCategories } from "@/lib/api";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, FolderOpen } from "lucide-react";

export const metadata: Metadata = {
    title: "Categories - MaknaUang",
    description: "Browse all news categories on MaknaUang.",
};

export default async function CategoriesPage() {
    const categories = await getAllCategories();

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-neon">Categories</span>
                </div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                        Categories
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Browse news by category ({categories.length} categories)
                    </p>
                </div>

                {/* Categories Grid */}
                {categories.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <FolderOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>No categories found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="group relative bg-muted/30 border border-border hover:border-neon rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neon/10"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold uppercase tracking-tight group-hover:text-neon transition-colors mb-2">
                                            {category.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            {category.count} {category.count === 1 ? 'article' : 'articles'}
                                        </p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-neon group-hover:translate-x-1 transition-all" />
                                </div>

                                {/* Progress bar based on article count */}
                                <div className="w-full bg-border rounded-full h-1 overflow-hidden">
                                    <div
                                        className="bg-neon h-full rounded-full transition-all duration-500 group-hover:w-full"
                                        style={{ width: `${Math.min(100, (category.count / Math.max(...categories.map(c => c.count))) * 100)}%` }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
