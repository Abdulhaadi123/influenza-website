import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A fully static site: `npm run build` writes plain files to out/, which any web server can host.
  output: "export",
  // /privacy/ is written as privacy/index.html, so any static host (Caddy's file_server,
  // S3, Netlify) serves it without a rewrite rule.
  trailingSlash: true,
};

export default nextConfig;
