import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'api.maknauang.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/posts',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      },
      {
        source: '/api/trending',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/trending-posts`,
      },
      {
        source: '/api/posts-by-tag/:tag',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/posts-by-tag/:tag`,
      },
      {
        source: '/api/detail/:slug',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/detail/:slug`,
      },
      {
        source: '/api/tags',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      },
    ];
  },
};

export default nextConfig;
