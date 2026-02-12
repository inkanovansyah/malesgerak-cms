import { create } from 'zustand';
import api from '@/lib/axios'; // Import the axios instance

// Define the Article type (adjust based on your actual data structure)
export interface Article {
    id: number;
    title: string;
    subtitle?: string;
    author: string;
    date: string;
    category: string;
    imageUrl: string;
    content?: string;
    views?: string;
}

interface NewsState {
    articles: Article[];
    featuredArticle: Article | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    setArticles: (articles: Article[]) => void;
    setFeaturedArticle: (article: Article) => void;
    fetchArticles: () => Promise<void>;
    fetchArticleById: (id: string) => Promise<void>;
}

export const useNewsStore = create<NewsState>((set) => ({
    articles: [],
    featuredArticle: null,
    isLoading: false,
    error: null,

    setArticles: (articles) => set({ articles }),
    setFeaturedArticle: (article) => set({ featuredArticle: article }),

    fetchArticles: async () => {
        set({ isLoading: true, error: null });
        try {
            // Logic to fetch articles from API
            // const response = await api.get('/articles');
            // set({ articles: response.data });

            // For now, we simulate a delay or leave it empty as per request
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Fetching articles...");

            set({ isLoading: false });
        } catch (error: any) {
            set({ isLoading: false, error: error.message || 'Failed to fetch articles' });
        }
    },

    fetchArticleById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // Logic to fetch a single article
            // const response = await api.get(`/articles/${id}`);
            // set({ featuredArticle: response.data });

            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`Fetching article with id: ${id}...`);

            set({ isLoading: false });
        } catch (error: any) {
            set({ isLoading: false, error: error.message || 'Failed to fetch article' });
        }
    }
}));
