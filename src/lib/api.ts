import axios from 'axios';

// Types
export interface Article {
    id: string;
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    imageUrl: string;
    authorSlug?: string;
    categorySlug?: string;
    views?: number;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    count: number;
}

// Merchant / Product Types
export interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    power: string;
    type: string;
    efficiency: string;
    dimensions: string;
    weight: string;
    warranty: string;
    features: string[];
    image: string;
    description: string;
    stock?: number;
    status?: 'available' | 'out-of-stock' | 'pre-order';
}

export interface ProductReview {
    id: string;
    productId: string;
    name: string;
    location: string;
    rating: number;
    date: string;
    comment: string;
    avatar?: string;
    verified?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Helper Functions

export async function getTrendingArticles(): Promise<Article[]> {
    try {
        // Call WordPress trending endpoint for most viewed posts
        const response = await axios.get(
            `https://api.maknauang.com/wp-json/myapi/v1/trending-by-views?per_page=6&_embed`
        );

        let rawArticles: any[] = [];
        if (Array.isArray(response.data)) {
            rawArticles = response.data;
        } else if (response.data && Array.isArray(response.data.value)) {
            rawArticles = response.data.value;
        } else if (response.data && Array.isArray(response.data.data)) {
            rawArticles = response.data.data;
        }

        return rawArticles.map((item: any) => {
            // If item has _embedded, it's standard WP API format - use helper
            if (item._embedded) {
                return mapWpPostToArticle(item);
            }

            // Helper function to extract category name safely
            const getCategoryName = (cat: any): string => {
                if (!cat) return "News";
                if (typeof cat === 'string') return cat;
                if (Array.isArray(cat)) {
                    if (cat.length === 0) return "News";
                    const first = cat[0];
                    return typeof first === 'string' ? first : (first?.name || "News");
                }
                if (typeof cat === 'object' && cat.name) return cat.name;
                return "News";
            };

            return {
                id: String(item.id || item.slug || ''),
                slug: item.slug || '',
                category: getCategoryName(item.category),
                title: item.title?.rendered || item.title?.raw || String(item.title || ""),
                excerpt: item.excerpt?.rendered
                    ? item.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 150)
                    : (String(item.excerpt || "")),
                author: item.author?.name || item.author?.slug || String(item.author || "Admin"),
                authorSlug: item.author?.slug || item.authorSlug || "admin",
                date: item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : (item.date
                        ? new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        : 'Recent'),
                imageUrl: item.image || (item.featured_media?.source_url || null),
                categorySlug: "news",
                views: item.views || 0
            };
        });
    } catch (error) {
        console.error("Failed to fetch trending articles:", error);

        // Fallback: get latest articles if trending fails
        try {
            const response = await axios.get(
                `https://api.maknauang.com/wp-json/wp/v2/posts?per_page=6&_embed`
            );
            if (Array.isArray(response.data)) {
                return response.data.map(mapWpPostToArticle);
            }
        } catch (fallbackError) {
            console.error("Failed to fetch fallback articles:", fallbackError);
        }

        return [];
    }
}

// Helper to map WP API post to Article
function mapWpPostToArticle(post: any): Article {
    const featuredMedia = post._embedded && post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : null;
    const authorObj = post._embedded && post._embedded['author'] ? post._embedded['author'][0] : null;
    const authorName = authorObj ? authorObj.name : "Admin";
    const authorSlug = authorObj ? authorObj.slug : "admin";

    let categoryName = "News";
    let categorySlug = "news";
    if (post._embedded && post._embedded['wp:term']) {
        const categories = post._embedded['wp:term'].flat().filter((t: any) => t.taxonomy === 'category');
        if (categories.length > 0) {
            categoryName = categories[0].name;
            categorySlug = categories[0].slug;
        }
    }

    return {
        id: post.id.toString(),
        slug: post.slug,
        category: categoryName,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered ? post.excerpt.rendered.replace(/<[^>]+>/g, '') : "",
        author: authorName,
        authorSlug: authorSlug,
        date: new Date(post.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }),
        imageUrl: featuredMedia || "",
        categorySlug: categorySlug
    };
}

export async function getLatestArticles(tag: string | number = "ALL", page: number = 1, perPage: number = 8, offset?: number): Promise<Article[]> {
    try {
        let wpApiUrl = `https://api.maknauang.com/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`;

        if (tag !== "ALL") {
            wpApiUrl += `&categories=${tag}`;
        }

        if (offset !== undefined) {
            wpApiUrl += `&offset=${offset}`;
        }

        const response = await axios.get(wpApiUrl);
        return response.data.map(mapWpPostToArticle);

    } catch (error) {
        console.error("Failed to fetch latest articles:", error);
        return [];
    }
}

export async function getTags(): Promise<Tag[]> {
    try {
        const response = await axios.get('https://api.maknauang.com/wp-json/wp/v2/categories?per_page=99&orderby=count&order=desc');
        if (Array.isArray(response.data)) {
            return response.data.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                count: cat.count
            }));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch tags:", error);
        return [];
    }
}

// Get all categories for categories page
export async function getAllCategories(): Promise<Tag[]> {
    try {
        const response = await axios.get('https://api.maknauang.com/wp-json/wp/v2/categories?per_page=99&orderby=count&order=desc&hide_empty=true');
        if (Array.isArray(response.data)) {
            return response.data.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                count: cat.count
            }));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return [];
    }
}

// Get all tags for tags page
export async function getAllTags(): Promise<Tag[]> {
    try {
        const response = await axios.get('https://api.maknauang.com/wp-json/wp/v2/tags?per_page=99&orderby=count&order=desc&hide_empty=true');
        if (Array.isArray(response.data)) {
            return response.data.map((tag: any) => ({
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
                count: tag.count
            }));
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch tags list:", error);
        return [];
    }
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string, page: number = 1, perPage: number = 9): Promise<{ articles: Article[]; category: Tag | null; total: number }> {
    try {
        // First get category by slug
        const catResponse = await axios.get(`https://api.maknauang.com/wp-json/wp/v2/categories?slug=${categorySlug}`);
        if (!Array.isArray(catResponse.data) || catResponse.data.length === 0) {
            return { articles: [], category: null, total: 0 };
        }
        const category = catResponse.data[0];

        // Get total posts
        const total = category.count || 0;

        // Then get posts by category
        const wpApiUrl = `https://api.maknauang.com/wp-json/wp/v2/posts?categories=${category.id}&page=${page}&per_page=${perPage}&_embed`;
        const response = await axios.get(wpApiUrl);
        const articles = response.data.map(mapWpPostToArticle);

        return {
            articles,
            category: {
                id: category.id,
                name: category.name,
                slug: category.slug,
                count: category.count
            },
            total
        };
    } catch (error) {
        console.error("Failed to fetch posts by category:", error);
        return { articles: [], category: null, total: 0 };
    }
}

// Get posts by tag
export async function getPostsByTag(tagSlug: string, page: number = 1, perPage: number = 9): Promise<{ articles: Article[]; tag: Tag | null; total: number }> {
    try {
        // First get tag by slug
        const tagResponse = await axios.get(`https://api.maknauang.com/wp-json/wp/v2/tags?slug=${tagSlug}`);
        if (!Array.isArray(tagResponse.data) || tagResponse.data.length === 0) {
            return { articles: [], tag: null, total: 0 };
        }
        const tag = tagResponse.data[0];

        // Get total posts
        const total = tag.count || 0;

        // Then get posts by tag
        const wpApiUrl = `https://api.maknauang.com/wp-json/wp/v2/posts?tags=${tag.id}&page=${page}&per_page=${perPage}&_embed`;
        const response = await axios.get(wpApiUrl);
        const articles = response.data.map(mapWpPostToArticle);

        return {
            articles,
            tag: {
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
                count: tag.count
            },
            total
        };
    } catch (error) {
        console.error("Failed to fetch posts by tag:", error);
        return { articles: [], tag: null, total: 0 };
    }
}

export async function getCategoryIdBySlug(slug: string): Promise<number | null> {
    try {
        const response = await axios.get(`https://api.maknauang.com/wp-json/wp/v2/categories?slug=${slug}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
            return response.data[0].id;
        }
        return null;
    } catch (error) {
        console.error(`Failed to fetch category ID for slug ${slug}:`, error);
        return null;
    }
}

// Author Types
export interface Author {
    id: number;
    name: string;
    slug: string;
    description: string;
    avatarUrl: string;
    link: string;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
    try {
        const response = await axios.get(`https://api.maknauang.com/wp-json/wp/v2/users?slug=${slug}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
            const user = response.data[0];
            return {
                id: user.id,
                name: user.name,
                slug: user.slug,
                description: user.description,
                avatarUrl: user.avatar_urls?.['96'] || "",
                link: user.link
            };
        }
        return null;
    } catch (error) {
        console.error("Failed to fetch author:", error);
        return null;
    }
}

export async function getPostsByAuthor(authorId: number, page: number = 1): Promise<Article[]> {
    try {
        const response = await axios.get(`https://api.maknauang.com/wp-json/wp/v2/posts?author=${authorId}&page=${page}&per_page=9&_embed`);
        return response.data.map(mapWpPostToArticle);
    } catch (error) {
        console.error("Failed to fetch author posts:", error);
        return [];
    }
}


// Detail Type
export interface ArticleDetail extends Article {
    content: string;
    views: number;
    tags: string[];
}

// Server-side: Fetch article WITH views from WordPress custom endpoint
export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
    try {
        // Use WordPress custom endpoint that includes views and increments them
        const response = await axios.get(`https://api.maknauang.com/wp-json/myapi/v1/detail/${slug}`);
        const data = response.data;

        // If custom endpoint works and returns data
        if (data && Object.keys(data).length > 0 && (data.title || data.id)) {
            return {
                id: data.id?.toString() || "",
                slug: data.slug || slug,
                category: (Array.isArray(data.category) ? data.category[0] : data.category) || "News",
                title: data.title,
                excerpt: data.excerpt || "",
                author: data.author || "Admin",
                authorSlug: data.authorSlug || "admin",
                date: data.publishedAt ? new Date(data.publishedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }) : "",
                imageUrl: data.image || "",
                content: data.content || "",
                views: data.views || 0,
                tags: data.tags || [],
                categorySlug: data.categorySlug || (data.category && data.category[0] ? data.category[0].toLowerCase().replace(/\s+/g, '-') : 'news')
            };
        }

        return null;
    } catch (error) {
        console.error("Failed to fetch article from custom endpoint, trying fallback:", error);

        // Fallback to WP API standard
        try {
            const wpApiUrl = `https://api.maknauang.com/wp-json/wp/v2/posts?slug=${slug}&_embed`;
            const wpResponse = await axios.get(wpApiUrl);

            if (Array.isArray(wpResponse.data) && wpResponse.data.length > 0) {
                const post = wpResponse.data[0];
                const basicArticle = mapWpPostToArticle(post);

                // Extract tags
                let tagNames: string[] = [];
                if (post._embedded && post._embedded['wp:term']) {
                    const terms = post._embedded['wp:term'].flat();
                    tagNames = terms
                        .filter((t: any) => t.taxonomy === 'post_tag')
                        .map((t: any) => t.name);
                }

                return {
                    ...basicArticle,
                    content: post.content.rendered,
                    views: 0, // WP API standard doesn't have views
                    tags: tagNames,
                    categorySlug: basicArticle.categorySlug
                };
            }

            return null;
        } catch (fallbackError) {
            console.error("Fallback fetch also failed:", fallbackError);
            return null;
        }
    }
}

// Get total views from all articles (for stats)
export async function getTotalViews(): Promise<number> {
    try {
        // Get all posts to calculate total views
        // Note: This might be slow for large sites, consider caching or a dedicated stats endpoint
        let page = 1;
        let totalViews = 0;
        let hasMore = true;

        while (hasMore) {
            const response = await axios.get(
                `https://api.maknauang.com/wp-json/wp/v2/posts?per_page=100&page=${page}`
            );

            if (!Array.isArray(response.data) || response.data.length === 0) {
                hasMore = false;
                break;
            }

            // For each post, we need to get views from the detail endpoint
            // This is expensive, so we'll batch the requests
            const postSlugs = response.data.map((post: any) => post.slug);

            // Batch fetch views (limit to 10 at a time to avoid overwhelming the server)
            for (let i = 0; i < postSlugs.length; i += 10) {
                const batch = postSlugs.slice(i, i + 10);
                const viewPromises = batch.map(slug =>
                    axios.get(`https://api.maknauang.com/wp-json/myapi/v1/detail/${slug}`)
                        .then(res => res.data.views || 0)
                        .catch(() => 0)
                );
                const batchViews = await Promise.all(viewPromises);
                totalViews += batchViews.reduce((sum, views) => sum + views, 0);
            }

            // Check if there are more pages
            const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1');
            hasMore = page < totalPages;
            page++;
        }

        return totalViews;
    } catch (error) {
        console.error("Failed to fetch total views:", error);
        return 0;
    }
}

// Get site statistics (more efficient than separate calls)
export async function getSiteStats(): Promise<{
    totalArticles: number;
    totalViews: number;
    totalCategories: number;
    totalTags: number;
}> {
    try {
        // Get total posts from headers
        const postsResponse = await axios.get('https://api.maknauang.com/wp-json/wp/v2/posts?per_page=1');
        const totalArticles = parseInt(postsResponse.headers['x-wp-total'] || '0');

        // Get total categories
        const categoriesResponse = await axios.get('https://api.maknauang.com/wp-json/wp/v2/categories?per_page=1');
        const totalCategories = parseInt(categoriesResponse.headers['x-wp-total'] || '0');

        // Get total tags
        const tagsResponse = await axios.get('https://api.maknauang.com/wp-json/wp/v2/tags?per_page=1');
        const totalTags = parseInt(tagsResponse.headers['x-wp-total'] || '0');

        // For views, we'll use a sample-based approach for performance
        // Get a sample of trending articles and estimate
        const trendingResponse = await axios.get(
            'https://api.maknauang.com/wp-json/myapi/v1/trending-by-views?per_page=20'
        );

        let sampleViews = 0;
        let sampleCount = 0;

        const processItem = (item: any) => {
            if (item.views) {
                sampleViews += item.views;
                sampleCount++;
            }
        };

        // Process trending response
        if (Array.isArray(trendingResponse.data)) {
            trendingResponse.data.forEach(processItem);
        } else if (trendingResponse.data && Array.isArray(trendingResponse.data.value)) {
            trendingResponse.data.value.forEach(processItem);
        } else if (trendingResponse.data && Array.isArray(trendingResponse.data.data)) {
            trendingResponse.data.data.forEach(processItem);
        }

        // Estimate total views based on sample average
        const avgViews = sampleCount > 0 ? sampleViews / sampleCount : 0;
        const estimatedTotalViews = Math.round(avgViews * totalArticles);

        return {
            totalArticles,
            totalViews: estimatedTotalViews,
            totalCategories,
            totalTags
        };
    } catch (error) {
        console.error("Failed to fetch site stats:", error);
        return {
            totalArticles: 0,
            totalViews: 0,
            totalCategories: 0,
            totalTags: 0
        };
    }
}
