import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/free-7-day-soccer-skills-challenge',
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
    ];
  },
};

export default nextConfig;
