import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/blog/free-7-day-soccer-skills-challenge',
        destination: '/free-soccer-drills-for-kids',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
