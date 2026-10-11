import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Thai edition used to live at /thai; it is now the full /th section.
      { source: "/thai", destination: "/th/ebook", permanent: true },
      // lifebugs.dev is the primary domain; send the old vercel.app address there.
      {
        source: "/:path*",
        has: [{ type: "host", value: "rulebook-project.vercel.app" }],
        destination: "https://rulebook-project.lifebugs.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
