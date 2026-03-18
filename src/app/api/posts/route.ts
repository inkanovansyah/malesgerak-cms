import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get('page') || '1';
        const perPage = searchParams.get('per_page') || '8';

        // Try trending endpoint first
        let wpApiUrl = `https://api.maknauang.com/wp-json/myapi/v1/trending-by-views?per_page=${perPage}&_embed`;

        const response = await fetch(wpApiUrl, {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            // Fallback to standard WP posts endpoint
            wpApiUrl = `https://api.maknauang.com/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed`;
            const fallbackResponse = await fetch(wpApiUrl, {
                next: { revalidate: 300 }
            });

            if (!fallbackResponse.ok) {
                return NextResponse.json(
                    { error: 'Failed to fetch posts' },
                    { status: fallbackResponse.status }
                );
            }

            const data = await fallbackResponse.json();
            return NextResponse.json({
                current_page: parseInt(page),
                per_page: parseInt(perPage),
                total_posts: parseInt(fallbackResponse.headers.get('x-wp-total') || '0'),
                total_pages: parseInt(fallbackResponse.headers.get('x-wp-totalpages') || '1'),
                data: data
            });
        }

        const data = await response.json();

        // Handle different response formats
        let articles = Array.isArray(data) ? data : (data.data || data.value || []);

        return NextResponse.json({
            current_page: 1,
            per_page: parseInt(perPage),
            total_posts: articles.length,
            total_pages: 1,
            data: articles
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error', data: [] },
            { status: 500 }
        );
    }
}
