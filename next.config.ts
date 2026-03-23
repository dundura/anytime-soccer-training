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
        source: '/best-soccer-coaching-apps-2025',
        destination: '/blog/7-best-soccer-coaching-apps',
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
