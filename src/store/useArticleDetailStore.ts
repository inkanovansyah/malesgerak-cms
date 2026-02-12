import { create } from 'zustand';
import axios from 'axios';

export interface ArticleDetail {
    id: number;
    title: string;
    slug: string;
    content: string;
    author: string;
    category: string[];
    tags: string[];
    publishedAt: string;
    views: number;
    image: string;
    url: string;
    authorSlug?: string;
    // Add other fields as needed based on API response
}

interface ArticleDetailState {
    article: ArticleDetail | null;
    isLoading: boolean;
    error: string | null;
    fetchArticle: (slug: string) => Promise<void>;
}

export const useArticleDetailStore = create<ArticleDetailState>((set) => ({
    article: null,
    isLoading: false,
    error: null,
    fetchArticle: async (slug: string) => {
        set({ isLoading: true, error: null, article: null });
        try {
            const response = await axios.get<ArticleDetail>(`/api/detail/${slug}`);
            console.log("Article Detail API Response:", response.data);
            set({ article: response.data, isLoading: false });
        } catch (error) {
            console.error("Failed to fetch article detail:", error);
            set({ error: 'Failed to fetch article', isLoading: false });
        }
    },
}));
