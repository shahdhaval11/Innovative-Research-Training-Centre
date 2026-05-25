import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home', // The new home page route
        permanent: true, // Use permanent: true for 308, or false for 307
      },
    ];
  },
};

export default nextConfig;
