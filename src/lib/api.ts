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
        categorySlug: categorySlug,
        views: 0
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

// ============================================================================
// MERCHANT / E-COMMERCE API
// ============================================================================

// Product Category Type
export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    description?: string;
    count?: number;
    image?: string;
}

// Products Response with Pagination
export interface ProductsResponse {
    products: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
}

// Fallback hardcoded products for when API is not available
const FALLBACK_PRODUCTS_MAP: Record<string, Product> = {
    "makna-uang-solar-100wp": {
        id: "1",
        name: "Makna Uang Solar 100WP",
        slug: "makna-uang-solar-100wp",
        brand: "MAKNA UANG",
        price: 850000,
        power: "100WP",
        type: "Monocrystalline",
        efficiency: "18%",
        dimensions: "1040 x 540 x 35mm",
        weight: "8.5 kg",
        warranty: "25 Tahun",
        features: ["Tahan Cuaca IP67", "Frame Aluminium", "Kaca Tempered"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        description: "Panel Surya Makna Uang 100WP ideal untuk rumah tangga kecil, lampu jalan, dan aplikasi off-grid.",
        stock: 10,
        status: "available"
    },
    "makna-uang-solar-200wp": {
        id: "2",
        name: "Makna Uang Solar 200WP",
        slug: "makna-uang-solar-200wp",
        brand: "MAKNA UANG",
        price: 1500000,
        power: "200WP",
        type: "Polycrystalline",
        efficiency: "16%",
        dimensions: "1480 x 680 x 35mm",
        weight: "15 kg",
        warranty: "25 Tahun",
        features: ["Efisiensi Tinggi", "Tahan Karat", "Anti-Reflection"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        description: "Panel Surya Makna Uang 200WP cocok untuk rumah tangga menengah dan aplikasi komersial kecil.",
        stock: 10,
        status: "available"
    },
    "makna-uang-solar-300wp-premium": {
        id: "3",
        name: "Makna Uang Solar 300WP Premium",
        slug: "makna-uang-solar-300wp-premium",
        brand: "MAKNA UANG",
        price: 2200000,
        power: "300WP",
        type: "Monocrystalline Premium",
        efficiency: "20%",
        dimensions: "1955 x 992 x 40mm",
        weight: "22 kg",
        warranty: "25 Tahun",
        features: ["PERC Technology", "PID Free", "High Output"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        description: "Panel Surya Makna Uang Premium 300WP untuk instalasi rumah tangga besar dan komersial.",
        stock: 10,
        status: "available"
    },
    "makna-uang-solar-450wp-bifacial": {
        id: "4",
        name: "Makna Uang Solar 450WP Bifacial",
        slug: "makna-uang-solar-450wp-bifacial",
        brand: "MAKNA UANG",
        price: 3500000,
        power: "450WP",
        type: "Bifacial Monocrystalline",
        efficiency: "21%",
        dimensions: "2100 x 1040 x 35mm",
        weight: "28 kg",
        warranty: "30 Tahun",
        features: ["Bifacial Technology", "Dual Side Power", "Ultra Efficient"],
        image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&q=80",
        description: "Panel Surya Makna Uang Bifacial 450WP menghasilkan energi dari kedua sisi, output hingga 30% lebih tinggi.",
        stock: 10,
        status: "available"
    },
    "makna-uang-solar-550wp-halfcut": {
        id: "5",
        name: "Makna Uang Solar 550WP Half-Cut",
        slug: "makna-uang-solar-550wp-halfcut",
        brand: "MAKNA UANG",
        price: 4500000,
        power: "550WP",
        type: "Half-Cut Monocrystalline",
        efficiency: "22%",
        dimensions: "2278 x 1134 x 35mm",
        weight: "32 kg",
        warranty: "30 Tahun",
        features: ["Half-Cut Cell", "Low Irradiance", "Shadow Tolerant"],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80",
        description: "Panel Surya Makna Uang 550WP dengan teknologi half-cut untuk performa maksimal dalam kondisi bayangan.",
        stock: 10,
        status: "available"
    },
    "makna-uang-solar-paket-1kwp-offgrid": {
        id: "6",
        name: "Makna Uang Solar Paket 1kWp Off-Grid",
        slug: "makna-uang-solar-paket-1kwp-offgrid",
        brand: "MAKNA UANG",
        price: 12000000,
        power: "1000WP (1kWp)",
        type: "Paket Lengkap",
        efficiency: "-",
        dimensions: "-",
        weight: "-",
        warranty: "25 Tahun Panel + 2 Tahun Komponen",
        features: ["4 Panel 250WP", "Inverter 1kW", "Baterai 200Ah", "Instalasi Lengkap"],
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
        description: "Paket Lengkap Panel Surya Makna Uang Off-Grid untuk rumah mandiri. Termasuk panel, inverter, baterai, dan instalasi.",
        stock: 5,
        status: "available"
    }
};

// Get all products with pagination
export async function getProducts(page: number = 1, perPage: number = 12, category?: string): Promise<ProductsResponse> {
    try {
        let url = `https://api.maknauang.com/wp-json/myapi/v1/products?page=${page}&per_page=${perPage}`;
        if (category) {
            url += `&category=${category}`;
        }

        const response = await axios.get(url);

        // Handle different response formats
        let products: any[] = [];
        let total = 0;
        let totalPages = 1;

        if (Array.isArray(response.data)) {
            products = response.data;
            total = response.headers?.['x-wp-total'] ? parseInt(response.headers['x-wp-total']) : products.length;
            totalPages = response.headers?.['x-wp-totalpages'] ? parseInt(response.headers['x-wp-totalpages']) : 1;
        } else if (response.data?.data && Array.isArray(response.data.data)) {
            products = response.data.data;
            total = response.data.total || products.length;
            totalPages = response.data.total_pages || 1;
        } else if (response.data?.products && Array.isArray(response.data.products)) {
            products = response.data.products;
            total = response.data.total || products.length;
            totalPages = response.data.total_pages || 1;
        }

        return {
            products: products.map((item: any) => ({
                id: item.id?.toString() || '',
                name: item.name || item.title?.rendered || '',
                slug: item.slug || '',
                brand: item.brand || 'MAKNA UANG',
                price: parseInt(item.price) || 0,
                power: item.power || item.attributes?.power || '-',
                type: item.type || item.attributes?.type || '-',
                efficiency: item.efficiency || item.attributes?.efficiency || '-',
                dimensions: item.dimensions || item.attributes?.dimensions || '-',
                weight: item.weight || item.attributes?.weight || '-',
                warranty: item.warranty || item.attributes?.warranty || '-',
                features: item.features || item.attributes?.features || [],
                image: item.image || item.featured_media?.source_url || item.images?.[0] || '',
                description: item.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
                stock: item.stock ?? item.stock_status === 'instock' ? 10 : 0,
                status: item.stock_status === 'instock' ? 'available' as const : 'out-of-stock' as const
            })),
            total,
            totalPages,
            currentPage: page
        };
    } catch (error) {
        console.error('Failed to fetch products:', error);
        // Return fallback hardcoded products
        const fallbackProducts = Object.values(FALLBACK_PRODUCTS_MAP);
        return {
            products: fallbackProducts,
            total: fallbackProducts.length,
            totalPages: 1,
            currentPage: 1
        };
    }
}

// Get single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
    try {
        const response = await axios.get(`https://api.maknauang.com/wp-json/myapi/v1/products/${slug}`);

        if (response.data && (response.data.id || response.data.name)) {
            const item = response.data;
            return {
                id: item.id?.toString() || '',
                name: item.name || item.title?.rendered || '',
                slug: item.slug || slug,
                brand: item.brand || 'MAKNA UANG',
                price: parseInt(item.price) || 0,
                power: item.power || item.attributes?.power || '-',
                type: item.type || item.attributes?.type || '-',
                efficiency: item.efficiency || item.attributes?.efficiency || '-',
                dimensions: item.dimensions || item.attributes?.dimensions || '-',
                weight: item.weight || item.attributes?.weight || '-',
                warranty: item.warranty || item.attributes?.warranty || '-',
                features: item.features || item.attributes?.features || [],
                image: item.image || item.featured_media?.source_url || item.images?.[0] || '',
                description: item.description || item.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '',
                stock: item.stock ?? item.stock_status === 'instock' ? 10 : 0,
                status: item.stock_status === 'instock' ? 'available' as const : 'out-of-stock' as const
            };
        }

        // API returned no data, try fallback
        const fallbackProduct = FALLBACK_PRODUCTS_MAP[slug];
        if (fallbackProduct) {
            console.log(`Using fallback product for slug: ${slug}`);
            return fallbackProduct;
        }

        return null;
    } catch (error) {
        console.error(`Failed to fetch product ${slug}:`, error);
        // Try fallback on error
        const fallbackProduct = FALLBACK_PRODUCTS_MAP[slug];
        if (fallbackProduct) {
            console.log(`Using fallback product for slug: ${slug}`);
            return fallbackProduct;
        }
        return null;
    }
}

// Get product categories
export async function getProductCategories(): Promise<ProductCategory[]> {
    try {
        const response = await axios.get('https://api.maknauang.com/wp-json/myapi/v1/product-categories');

        if (Array.isArray(response.data)) {
            return response.data.map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                count: cat.count,
                image: cat.image
            }));
        }

        return [];
    } catch (error) {
        console.error('Failed to fetch product categories:', error);
        return [];
    }
}

// ============================================================================
// CART API TYPES
// ============================================================================

export interface CartItem {
    key: string;
    product_id: string;
    quantity: number;
    variation_id?: string;
    product: {
        id: string;
        name: string;
        slug: string;
        price: number;
        image: string;
        stock?: number;
    };
}

export interface CartResponse {
    items: CartItem[];
    subtotal: number;
    total: number;
    currency: string;
}

// ============================================================================
// CART API FUNCTIONS
// ============================================================================

// Get cart items
export async function getCart(): Promise<CartResponse> {
    try {
        const response = await axios.get('https://api.maknauang.com/wp-json/myapi/v1/cart', {
            withCredentials: true
        });

        if (response.data) {
            return {
                items: response.data.items || [],
                subtotal: response.data.subtotal || 0,
                total: response.data.total || 0,
                currency: response.data.currency || 'IDR'
            };
        }

        return { items: [], subtotal: 0, total: 0, currency: 'IDR' };
    } catch (error) {
        console.error('Failed to fetch cart:', error);
        return { items: [], subtotal: 0, total: 0, currency: 'IDR' };
    }
}

// Add item to cart
export async function addToCart(productId: string, quantity: number = 1, variationId?: string): Promise<CartResponse> {
    try {
        const response = await axios.post(
            'https://api.maknauang.com/wp-json/myapi/v1/cart/add',
            {
                product_id: productId,
                quantity,
                variation_id: variationId
            },
            { withCredentials: true }
        );

        if (response.data) {
            return {
                items: response.data.items || [],
                subtotal: response.data.subtotal || 0,
                total: response.data.total || 0,
                currency: response.data.currency || 'IDR'
            };
        }

        return { items: [], subtotal: 0, total: 0, currency: 'IDR' };
    } catch (error) {
        console.error('Failed to add to cart:', error);
        throw error;
    }
}

// Update cart item quantity
export async function updateCartItem(cartItemKey: string, quantity: number): Promise<CartResponse> {
    try {
        const response = await axios.post(
            'https://api.maknauang.com/wp-json/myapi/v1/cart/update',
            {
                cart_item_key: cartItemKey,
                quantity
            },
            { withCredentials: true }
        );

        if (response.data) {
            return {
                items: response.data.items || [],
                subtotal: response.data.subtotal || 0,
                total: response.data.total || 0,
                currency: response.data.currency || 'IDR'
            };
        }

        return { items: [], subtotal: 0, total: 0, currency: 'IDR' };
    } catch (error) {
        console.error('Failed to update cart:', error);
        throw error;
    }
}

// Remove item from cart
export async function removeFromCart(cartItemKey: string): Promise<CartResponse> {
    try {
        const response = await axios.post(
            'https://api.maknauang.com/wp-json/myapi/v1/cart/remove',
            { cart_item_key: cartItemKey },
            { withCredentials: true }
        );

        if (response.data) {
            return {
                items: response.data.items || [],
                subtotal: response.data.subtotal || 0,
                total: response.data.total || 0,
                currency: response.data.currency || 'IDR'
            };
        }

        return { items: [], subtotal: 0, total: 0, currency: 'IDR' };
    } catch (error) {
        console.error('Failed to remove from cart:', error);
        throw error;
    }
}

// Clear cart
export async function clearCart(): Promise<{ success: boolean }> {
    try {
        await axios.post('https://api.maknauang.com/wp-json/myapi/v1/cart/clear', {}, { withCredentials: true });
        return { success: true };
    } catch (error) {
        console.error('Failed to clear cart:', error);
        return { success: false };
    }
}

// ============================================================================
// SHIPPING & PAYMENT TYPES
// ============================================================================

export interface ShippingMethod {
    id: string;
    title: string;
    description: string;
    cost: number;
    enabled: boolean;
}

export interface PaymentRequest {
    order_id: string;
    success_url: string;
    failure_url: string;
}

export interface PaymentResponse {
    payment_url: string;
    invoice_id: string;
    amount: number;
    currency: string;
    status: string;
}

export interface PaymentStatus {
    order_id: string;
    status: 'pending' | 'paid' | 'failed' | 'expired';
    payment_url?: string;
    invoice_id?: string;
}

// ============================================================================
// SHIPPING & PAYMENT API FUNCTIONS
// ============================================================================

// Get shipping methods
export async function getShippingMethods(): Promise<ShippingMethod[]> {
    try {
        const response = await axios.get('https://api.maknauang.com/wp-json/myapi/v1/shipping/methods');

        if (Array.isArray(response.data)) {
            return response.data.map((method: any) => ({
                id: method.id,
                title: method.title,
                description: method.description,
                cost: parseInt(method.cost) || 0,
                enabled: method.enabled !== false
            }));
        }

        return [];
    } catch (error) {
        console.error('Failed to fetch shipping methods:', error);
        return [];
    }
}

// Create payment (Xendit invoice)
export async function createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
        const response = await axios.post(
            'https://api.maknauang.com/wp-json/myapi/v1/payment/create',
            request,
            { withCredentials: true }
        );

        return {
            payment_url: response.data.payment_url || '',
            invoice_id: response.data.invoice_id || '',
            amount: response.data.amount || 0,
            currency: response.data.currency || 'IDR',
            status: response.data.status || 'pending'
        };
    } catch (error) {
        console.error('Failed to create payment:', error);
        throw error;
    }
}

// Check payment status
export async function getPaymentStatus(orderId: string): Promise<PaymentStatus> {
    try {
        const response = await axios.get(`https://api.maknauang.com/wp-json/myapi/v1/payment/status/${orderId}`);

        return {
            order_id: response.data.order_id || orderId,
            status: response.data.status || 'pending',
            payment_url: response.data.payment_url,
            invoice_id: response.data.invoice_id
        };
    } catch (error) {
        console.error('Failed to check payment status:', error);
        return { order_id: orderId, status: 'pending' };
    }
}

// ============================================================================
// ORDER TYPES
// ============================================================================

export interface OrderCustomer {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
}

export interface OrderRequest {
    customer: OrderCustomer;
    shipping_method: string;
    payment_method: string;
    notes?: string;
}

export interface Order {
    id: string;
    order_key: string;
    status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
    total: number;
    currency: string;
    customer: OrderCustomer;
    items: CartItem[];
    shipping_method: string;
    payment_method: string;
    payment_url?: string;
    created_at: string;
}

// ============================================================================
// ORDER API FUNCTIONS
// ============================================================================

// Create order
export async function createOrder(orderData: OrderRequest): Promise<Order> {
    try {
        const response = await axios.post(
            'https://api.maknauang.com/wp-json/myapi/v1/orders',
            orderData,
            { withCredentials: true }
        );

        return {
            id: response.data.id?.toString() || '',
            order_key: response.data.order_key || '',
            status: response.data.status || 'pending',
            total: response.data.total || 0,
            currency: response.data.currency || 'IDR',
            customer: response.data.customer,
            items: response.data.items || [],
            shipping_method: response.data.shipping_method || '',
            payment_method: response.data.payment_method || '',
            payment_url: response.data.payment_url,
            created_at: response.data.created_at || new Date().toISOString()
        };
    } catch (error) {
        console.error('Failed to create order:', error);
        throw error;
    }
}

// Get order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
    try {
        const response = await axios.get(`https://api.maknauang.com/wp-json/myapi/v1/orders/${orderId}`, {
            withCredentials: true
        });

        if (response.data) {
            return {
                id: response.data.id?.toString() || '',
                order_key: response.data.order_key || '',
                status: response.data.status || 'pending',
                total: response.data.total || 0,
                currency: response.data.currency || 'IDR',
                customer: response.data.customer,
                items: response.data.items || [],
                shipping_method: response.data.shipping_method || '',
                payment_method: response.data.payment_method || '',
                payment_url: response.data.payment_url,
                created_at: response.data.created_at || new Date().toISOString()
            };
        }

        return null;
    } catch (error) {
        console.error(`Failed to fetch order ${orderId}:`, error);
        return null;
    }
}

// Get orders by customer email
export async function getOrdersByEmail(email: string): Promise<Order[]> {
    try {
        const response = await axios.get(`https://api.maknauang.com/wp-json/myapi/v1/orders/customer/${email}`, {
            withCredentials: true
        });

        if (Array.isArray(response.data)) {
            return response.data.map((order: any) => ({
                id: order.id?.toString() || '',
                order_key: order.order_key || '',
                status: order.status || 'pending',
                total: order.total || 0,
                currency: order.currency || 'IDR',
                customer: order.customer,
                items: order.items || [],
                shipping_method: order.shipping_method || '',
                payment_method: order.payment_method || '',
                payment_url: order.payment_url,
                created_at: order.created_at || new Date().toISOString()
            }));
        }

        return [];
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return [];
    }
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
    try {
        const response = await axios.post(
            `https://api.maknauang.com/wp-json/myapi/v1/orders/${orderId}/status`,
            { status },
            { withCredentials: true }
        );

        if (response.data) {
            return {
                id: response.data.id?.toString() || '',
                order_key: response.data.order_key || '',
                status: response.data.status || status,
                total: response.data.total || 0,
                currency: response.data.currency || 'IDR',
                customer: response.data.customer,
                items: response.data.items || [],
                shipping_method: response.data.shipping_method || '',
                payment_method: response.data.payment_method || '',
                payment_url: response.data.payment_url,
                created_at: response.data.created_at || new Date().toISOString()
            };
        }

        return null;
    } catch (error) {
        console.error(`Failed to update order status for ${orderId}:`, error);
        return null;
    }
}
