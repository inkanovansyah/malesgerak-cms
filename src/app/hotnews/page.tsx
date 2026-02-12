import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HotNewsClient } from "@/components/HotNewsClient";
import { getLatestArticles, getTrendingArticles } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hot News - MaknaUang",
    description: "Read the hottest news and updates.",
};

export default async function HotNewsPage() {
    // Fetch initial data in parallel
    const [initialArticles, trendingArticles] = await Promise.all([
        getLatestArticles("ALL", 1, 9),
        getTrendingArticles()
    ]);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <HotNewsClient initialArticles={initialArticles} trendingArticles={trendingArticles} />
            <Footer />
        </main>
    );
}
