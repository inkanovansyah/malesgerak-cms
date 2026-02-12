import * as cheerio from 'cheerio';

export function cleanArticleContentServer(html: string): string {
    if (!html) return "";

    try {
        const $ = cheerio.load(html);
        const SpecificWrapper = $('.markdown.prose');
        if (SpecificWrapper.length > 0) {
            return SpecificWrapper.html() || html;
        }

        return html;
    } catch (e) {
        console.error("Error cleaning content server-side:", e);
        return html;
    }
}
