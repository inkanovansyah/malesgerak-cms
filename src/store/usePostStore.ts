import { create } from 'zustand';
import axios from 'axios';

export interface Post {
    id: number;
    title: string;
    slug: string;
    author: string;
    category: string[];
    tags: string[];
    views: number;
    image: string;
    url: string;
    publishedAt: string;
}

interface ApiResponse {
    current_page: number;
    per_page: number;
    total_posts: number;
    total_pages: number;
    data: Post[];
}

interface PostState {
    posts: Post[];
    isLoading: boolean;
    error: string | null;
    hasLoaded: boolean;
    fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    isLoading: false,
    error: null,
    hasLoaded: false,
    fetchPosts: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get<ApiResponse>('/api/posts?page=1&per_page=8');
            console.log("API Response Data:", response.data);

            // Check if response.data.data exists and is an array (the API structure)
            if (response.data && Array.isArray(response.data.data)) {
                set({ posts: response.data.data, isLoading: false, hasLoaded: true });
            }
            // Fallback: check if the response itself is an array (in case API changes)
            else if (Array.isArray(response.data)) {
                set({ posts: response.data, isLoading: false, hasLoaded: true });
            }
            else {
                console.error("Unexpected API response format:", response.data);
                set({ posts: [], isLoading: false, error: "Invalid API response format", hasLoaded: true });
            }
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            set({ error: 'Failed to fetch posts', isLoading: false, hasLoaded: true });
        }
    },
}));
