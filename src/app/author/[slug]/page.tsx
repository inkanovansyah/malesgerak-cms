import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getAuthorBySlug, getPostsByAuthor } from "@/lib/api";
import { AuthorPostList } from "@/components/AuthorPostList";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const author = await getAuthorBySlug(slug);

    if (!author) {
        notFound();
    }

    const initialPosts = await getPostsByAuthor(author.id, 1);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />

            <div className="container mx-auto px-4 md:px-8 pt-6 pb-24">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-12">
                    <Link href="/" className="hover:text-neon transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-foreground">Author</span>
                    <span>/</span>
                    <span className="text-neon">{author.name}</span>
                </div>

                {/* Author Profile */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-border pb-12 mb-12">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-neon bg-muted flex-shrink-0">
                        <Image
                            src={author.avatarUrl || `https://ui-avatars.com/api/?name=${author.name}&background=random`}
                            alt={author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left space-y-4 max-w-2xl">
                        <h1 className="text-4xl font-black uppercase tracking-tighter">{author.name}</h1>
                        <p className="text-muted-foreground leading-relaxed">
                            {author.description || `Articles written by ${author.name}.`}
                        </p>
                    </div>
                </div>

                {/* Articles */}
                <h2 className="text-2xl font-bold uppercase tracking-wide mb-8">
                    Latest Articles by {author.name}
                </h2>

                <AuthorPostList initialPosts={initialPosts} authorId={author.id} />

            </div>

            <Footer />
        </main>
    );
}
