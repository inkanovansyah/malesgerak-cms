import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        // Call WordPress API to increment views
        // Assuming you have a custom endpoint or use post meta
        const wpApiUrl = `${process.env.WORDPRESS_API_URL || 'https://api.maknauang.com'}/wp-json/wp/v2/posts?slug=${slug}`;

        const response = await fetch(wpApiUrl);
        const posts = await response.json();

        if (!Array.isArray(posts) || posts.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const post = posts[0];

        // For now, return the current view count
        // In a real implementation, you would need a custom endpoint to increment views
        // or use a plugin like Post Views Counter

        return NextResponse.json({
            success: true,
            views: post.view_count || 0,
            postId: post.id
        });

    } catch (error) {
        console.error('Error incrementing views:', error);
        return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
    }
}
