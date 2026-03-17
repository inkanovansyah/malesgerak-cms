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
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    count: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Helper Functions

export async function getTrendingArticles(): Promise<Article[]> {
    try {
        const response = await axios.get(`${API_URL}/trending-posts`);

        let rawArticles: any[] = [];
        if (Array.isArray(response.data)) {
            rawArticles = response.data;
        } else if (response.data && Array.isArray(response.data.value)) {
            rawArticles = response.data.value;
        } else if (response.data && Array.isArray(response.data.data)) {
            rawArticles = response.data.data;
        }

        return rawArticles.map((item: any) => ({
            id: item.id?.toString() || item.slug,
            slug: item.slug,
            category: (item.category && (Array.isArray(item.category) ? item.category[0] : item.category)) || "News",
            title: item.title,
            excerpt: item.excerpt || "",
            author: item.author || "Admin",
            date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }) : 'Recent',
            imageUrl: item.image,
            categorySlug: "news"
        }));
    } catch (error) {
        console.error("Failed to fetch trending articles:", error);
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
        console.error("Failed to fetch article:", error);
        return null;
    }
}
