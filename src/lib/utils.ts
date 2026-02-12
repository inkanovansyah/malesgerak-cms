import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function cleanArticleContent(html: string): string {
    if (typeof window === 'undefined') return html;

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Try to find the specific content wrapper from the "scraped" structure
        const specificWrapper = doc.querySelector('.markdown.prose');
        if (specificWrapper) {
            return specificWrapper.innerHTML;
        }

        // Fallback: Check for other common wrappers or return original if not found
        // Removing specific unrelated wrappers if needed
        const article = doc.querySelector('article');
        if (article) {
            // If we found an article tag but no .markdown.prose, maybe the article tag itself contains the content directly (less likely based on inspection but good fallback)
            // But based on inspection, the article tag wraps the garbage divs too.
            // So we stick to the specific wrapper.
        }

        return html;
    } catch (e) {
        console.error("Error cleaning content:", e);
        return html;
    }
}
