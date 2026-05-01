import type { NextConfig } from "next";
import postsData from "./src/data/posts.json";

// Generate redirects for old WordPress blog URLs (root-level) to /blog/slug
const blogRedirects = (postsData as { slug: string }[]).map((post) => ({
  source: `/${post.slug}`,
  destination: `/blog/${post.slug}`,
  permanent: true,
}));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/15-minute-daily-soccer-routine',
        destination: '/blog/the-15-minute-daily-soccer-routine-i-used-to-train-my-sons-rec-to-academy',
        permanent: true,
      },
      {
        source: '/blog/free-7-day-soccer-skills-challenge',
        destination: '/free-soccer-drills-for-kids',
        permanent: true,
      },
      {
        source: '/free-7-day-soccer-skills-challenge',
        destination: '/free-soccer-drills-for-kids',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: 'https://media.anytime-soccer.com/wp-login.php',
        permanent: false,
      },
      {
        source: '/wp-admin/:path*',
        destination: 'https://media.anytime-soccer.com/wp-admin/:path*',
        permanent: false,
      },
      ...blogRedirects,
    ];
  },
};

export default nextConfig;
