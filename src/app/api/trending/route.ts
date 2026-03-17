import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Call WordPress trending endpoint (server-to-server, no CORS)
        const wpResponse = await fetch(
            'https://api.maknauang.com/wp-json/myapi/v1/trending-by-views?per_page=6'
        );

        if (!wpResponse.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch trending articles' },
                { status: wpResponse.status }
            );
        }

        const data = await wpResponse.json();

        // Return the data
        return NextResponse.json(data);

    } catch (error) {
        console.error('Error fetching trending:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
