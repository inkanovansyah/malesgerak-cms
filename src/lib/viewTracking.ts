// View tracking library
// This handles article view counting using localStorage for demo purposes
// In production, you would want to integrate this with a backend API

const STORAGE_KEY = 'article_views';
const SESSION_KEY = 'viewed_articles_session';

export interface ViewData {
    slug: string;
    count: number;
    lastViewed: string;
}

// Get all viewed articles from localStorage
export function getViewedArticles(): Record<string, ViewData> {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

// Check if article was viewed in current session (prevent duplicate counts on refresh)
export function wasViewedThisSession(slug: string): boolean {
    if (typeof window === 'undefined') return false;
    const session = sessionStorage.getItem(SESSION_KEY) || '';
    return session.split(',').includes(slug);
}

// Mark article as viewed in current session
export function markAsViewed(slug: string): void {
    if (typeof window === 'undefined') return;
    const session = sessionStorage.getItem(SESSION_KEY) || '';
    const viewed = session.split(',').filter(Boolean);
    viewed.push(slug);
    sessionStorage.setItem(SESSION_KEY, viewed.join(','));
}

// Increment view count for an article
export function incrementView(slug: string): number {
    if (typeof window === 'undefined') return 0;

    // Don't count if already viewed in this session
    if (wasViewedThisSession(slug)) {
        const views = getViewedArticles();
        return views[slug]?.count || 0;
    }

    const views = getViewedArticles();
    const current = views[slug]?.count || 0;

    const updated: Record<string, ViewData> = {
        ...views,
        [slug]: {
            slug,
            count: current + 1,
            lastViewed: new Date().toISOString(),
        },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    markAsViewed(slug);

    // Optional: Send to backend API
    // fetch('/api/views', { method: 'POST', body: JSON.stringify({ slug }) })
    //     .then(res => res.json())
    //     .then(data => console.log('View tracked:', data))
    //     .catch(err => console.error('Failed to track view:', err));

    return current + 1;
}

// Get view count for a specific article
export function getViewCount(slug: string): number {
    const views = getViewedArticles();
    return views[slug]?.count || 0;
}

// Format view count for display
export function formatViewCount(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
}
