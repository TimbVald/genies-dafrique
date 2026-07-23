import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires explicit qualities allowlist
    qualities: [25, 50, 75, 85, 100],
    formats: ["image/webp"],
  },
};

export default withNextIntl(nextConfig);
