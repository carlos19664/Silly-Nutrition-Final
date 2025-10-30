import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Force @ to point at the repo root
    config.resolve.alias["@"] = path.resolve(process.cwd());
    return config;
  },
};

export default nextConfig;
