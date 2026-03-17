import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const decodedSlug = decodeURIComponent(slug);

        // Call WordPress API to increment views and get post details
        const wpResponse = await fetch(
            `https://api.maknauang.com/wp-json/myapi/v1/detail/${decodedSlug}`
        );

        if (!wpResponse.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch article' },
                { status: wpResponse.status }
            );
        }

        const data = await wpResponse.json();

        // Return only the views count
        return NextResponse.json({
            views: data.views || 0
        });

    } catch (error) {
        console.error('Error tracking views:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
