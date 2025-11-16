/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

// Build environment-specific CSP:
const cspParts = [
  "default-src 'self';",
  "img-src 'self' data: https:;",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
  "font-src 'self' https://fonts.gstatic.com;",
  // Next dev needs eval + blob workers; prod does not
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval' blob:"};`,
  // HMR and API calls in dev
  `connect-src 'self'${isProd ? "" : " ws: http: https:"};`,
  // Workers used by Next dev
  `worker-src 'self'${isProd ? "" : " blob:"};`,
  // Prevent embedding
  "frame-ancestors 'none';",
];

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: cspParts.join(" ") },
];

const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
