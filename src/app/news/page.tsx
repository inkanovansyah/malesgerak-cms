import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NewsList } from "@/components/NewsList";
import { getLatestArticles } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News Archive - MaknaUang",
    description: "Read the latest news and updates.",
};

export default async function NewsPage() {
    // Fetch initial 9 articles
    const initialArticles = await getLatestArticles("ALL", 1, 9);

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
            <Navbar />
            <NewsList initialArticles={initialArticles} />
            <Footer />
        </main>
    );
}
