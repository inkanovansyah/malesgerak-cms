import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrendingNews } from "@/components/TrendingNews";
import { LatestNews } from "@/components/LatestNews";
import { Footer } from "@/components/Footer";
import { AdBanner } from "@/components/AdBanner";
import { YouTubeShorts } from "@/components/YouTubeShorts";
import { getLatestArticles, getTags, getTrendingArticles, getCategoryIdBySlug, getAllTags } from "@/lib/api";

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

  // Hero shows first 8 articles, so LatestNews should start from article 9 (offset 8) for ALL tab
  // For filtered categories, start from beginning
  const initialOffset = selectedTagId === "ALL" ? 8 : 0;

  const [trendingArticles, latestArticles, categories, allTags] = await Promise.all([
    getTrendingArticles(),
    getLatestArticles(selectedTagId, 1, 8, initialOffset),
    getTags(),  // Categories for filtering
    getAllTags()  // All tags for display
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-neon selection:text-black">
      <Navbar />
      <AdBanner />
      <Hero />
      {/* <TrendingNews articles={trendingArticles} /> */}
      <YouTubeShorts />
      <AdBanner />
      <LatestNews
        initialArticles={latestArticles}
        categories={categories}
        allTags={allTags}
        trendingArticles={trendingArticles}
        defaultTag={selectedTagId}
      />
      <Footer />
    </main>
  );
}
