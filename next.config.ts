import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
  // Old addresses keep working: v3's own /info, and the pages of the previous site (v2),
  // which already lived on this domain.
  async redirects() {
    return [
      { source: "/info", destination: "/#sobre", permanent: true },
      { source: "/en/info", destination: "/en#sobre", permanent: true },
      { source: "/achievements", destination: "/robotica#linha-do-tempo", permanent: true },
      { source: "/teams", destination: "/robotica/equipes", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
