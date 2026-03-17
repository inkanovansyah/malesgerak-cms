"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import axios from "axios";

interface ViewCounterWithTrackingProps {
    slug: string;
    initialViews?: number;
}

// Storage keys
const VIEW_STORAGE_KEY = 'article_views';
const VIEW_SESSION_KEY = 'viewed_articles_session';

// Helper: Get viewed articles from localStorage
function getViewedArticles(): Record<string, number> {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem(VIEW_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

// Helper: Check if article was viewed in current session
function wasViewedThisSession(slug: string): boolean {
    if (typeof window === 'undefined') return false;
    const session = sessionStorage.getItem(VIEW_SESSION_KEY) || '';
    return session.split(',').includes(slug);
}

// Helper: Mark article as viewed in current session
function markAsViewed(slug: string): void {
    if (typeof window === 'undefined') return;
    const session = sessionStorage.getItem(VIEW_SESSION_KEY) || '';
    const viewed = session.split(',').filter(Boolean);
    viewed.push(slug);
    sessionStorage.setItem(VIEW_SESSION_KEY, viewed.join(','));
}

// Helper: Check if can track view
function canTrackView(slug: string): boolean {
    return !wasViewedThisSession(slug);
}

// Helper: Mark view timestamp
function markViewTimestamp(slug: string): void {
    if (typeof window === 'undefined') return;

    const viewed = getViewedArticles();
    viewed[slug] = Date.now();
    localStorage.setItem(VIEW_STORAGE_KEY, JSON.stringify(viewed));

    markAsViewed(slug);
}

export function ViewCounterWithTracking({ slug, initialViews = 0 }: ViewCounterWithTrackingProps) {
    const [views, setViews] = useState(initialViews);

    useEffect(() => {
        // Only track if not viewed in this session
        if (slug && canTrackView(slug)) {
            trackView();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const trackView = async () => {
        try {
            // Call Next.js API route (proxy to WordPress)
            // This will increment views in WordPress
            const response = await axios.get(`/api/views/${slug}`);

            // Update views from response
            if (response.data?.views !== undefined) {
                setViews(response.data.views);
            }

            // Mark as viewed to prevent duplicate counts
            markViewTimestamp(slug);

        } catch (error) {
            console.error("Failed to track view:", error);
        }
    };

    return (
        <div className="flex items-center gap-1.5 text-muted-foreground">
            <Eye className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
                {views.toLocaleString()}
            </span>
        </div>
    );
}
