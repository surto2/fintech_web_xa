import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.ub.edu" },
      { protocol: "https", hostname: "ub.edu" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/public/uploads/**",
          "**/.git/**",
          "**/.next/**",
        ],
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: "/alumni",
        destination: "https://app-master-ia-fintech.ub.edu/",
        permanent: false,
      },
      {
        source: "/alumni/:path*",
        destination: "https://app-master-ia-fintech.ub.edu/",
        permanent: false,
      },
      {
        source: "/club-alumni",
        destination: "https://app-master-ia-fintech.ub.edu/",
        permanent: false,
      },
      {
        source: "/membership-login",
        destination: "https://app-master-ia-fintech.ub.edu/",
        permanent: false,
      },
      {
        source: "/membership-registration",
        destination: "https://app-master-ia-fintech.ub.edu/",
        permanent: false,
      },
      {
        source: "/membership-join",
        destination: "https://app-master-ia-fintech.ub.edu/",
        permanent: false,
      },
      {
        source: "/login",
        destination: "https://app-master-ia-fintech.ub.edu/",
        permanent: false,
      },
      {
        source: "/inicio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mundo-fintech",
        destination: "/noticias-master",
        permanent: true,
      },
      {
        source: "/plan-de-estudios",
        destination: "/plan-de-estudio",
        permanent: true,
      },
      {
        source: "/inscripciones-y-ub",
        destination: "/inscripciones-y-becas",
        permanent: true,
      },
      {
        source: "/tfms-e-investigacion",
        destination: "/investigacion-y-emprendimiento",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
