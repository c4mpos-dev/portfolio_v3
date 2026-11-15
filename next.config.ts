import type { NextConfig } from "next";

// Revision shown in the title block and footer: the year and month of the build (YY.MM).
const rev = new Date().toISOString().slice(2, 7).replace("-", ".");

const nextConfig: NextConfig = {
  /* config options here */
  env: { NEXT_PUBLIC_REV: rev },
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
      // The CV was renamed; links to the old file get the current one.
      { source: "/cv-caua.pdf", destination: "/cv_CauaCampos.pdf", permanent: false },
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
