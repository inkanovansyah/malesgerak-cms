import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrendingNews } from "@/components/TrendingNews";
import { LatestNews } from "@/components/LatestNews";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { getLatestArticles, getTags, getTrendingArticles, getCategoryIdBySlug } from "@/lib/api";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const tagSlug = typeof params.tag === 'string' ? params.tag : undefined;

  let selectedTagId: string | number = "ALL";
  if (tagSlug) {
    const resolvedId = await getCategoryIdBySlug(tagSlug);
    if (resolvedId) {
      selectedTagId = resolvedId;
    }
  }

  const [trendingArticles, latestArticles, tags] = await Promise.all([
    getTrendingArticles(),
    getLatestArticles(selectedTagId, 1), // Fetch based on tag or ALL
    getTags()
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
      <Navbar />
      <AdBanner />
      <Hero />
      <TrendingNews articles={trendingArticles} />
      <AdBanner />
      <LatestNews
        initialArticles={latestArticles}
        tags={tags}
        trendingArticles={trendingArticles}
        defaultTag={selectedTagId}
      />
      <Footer />
    </main>
  );
}
