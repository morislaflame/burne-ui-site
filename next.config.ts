import type { NextConfig } from "next";

const extraDevOrigins =
  process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const nextConfig: NextConfig = {
  /*
   * Dev-only: allow tuna (and custom) tunnel hosts to load /_next/* + HMR.
   * Without this, the page opens but client JS stays blocked → eternal loader.
   */
  allowedDevOrigins: ["drus.ru.tuna.am", "*.ru.tuna.am", "*.tuna.am", ...extraDevOrigins],
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
