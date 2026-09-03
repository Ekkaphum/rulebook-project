import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Thai edition used to live at /thai; it is now the full /th section.
      { source: "/thai", destination: "/th/ebook", permanent: true },
    ];
  },
};

export default nextConfig;
