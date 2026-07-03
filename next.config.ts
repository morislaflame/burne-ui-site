import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.demo.tsx": [
        {
          condition: { query: "?raw" },
          loaders: ["raw-loader"],
          as: "*.js",
        },
      ],
    },
  },
  webpack(config) {
    config.module.rules.push({
      resourceQuery: /raw/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
