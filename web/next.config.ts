import type { NextConfig } from "next";

// Baseline security headers (OWASP Secure Headers). img-src allows https so
// Google avatars and chapter images load; frame-ancestors 'none' blocks
// clickjacking of the POST forms (logout, account deletion, role).
const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-src https://accounts.google.com",
      "form-action 'self' https://accounts.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
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
