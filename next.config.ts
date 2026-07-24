import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* ── Images ─────────────────────────────────────────────── */
  images: {
    qualities: [25, 50, 75, 85, 100],
    formats: ["image/webp"],
    // Tailles de breakpoints optimisées (évite le téléchargement d'images trop grandes)
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ── Compression ─────────────────────────────────────────── */
  compress: true,

  /* ── En-têtes de sécurité & performances ────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Sécurité
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Performances : cache des assets statiques
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      // Cache long sur les assets immutables
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache images publiques
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/videos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/logo/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },

  /* ── Redirects canoniques ───────────────────────────────── */
  async redirects() {
    return [
      // Rediriger www → non-www (à activer si domaine configuré)
      // {
      //   source: "/(.*)",
      //   has: [{ type: "host", value: "www.lesgeniesdafrique.cm" }],
      //   destination: "https://lesgeniesdafrique.cm/:path*",
      //   permanent: true,
      // },
    ];
  },

  /* ── Experimental ───────────────────────────────────────── */
  experimental: {
    // Optimise le chargement du CSS critique
    optimizeCss: false, // requiert critters — désactivé par défaut
  },
};

export default withNextIntl(nextConfig);
