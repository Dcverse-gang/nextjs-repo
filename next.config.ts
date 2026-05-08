import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "d0.awsstatic.com" },
      { protocol: "https", hostname: "www.gstatic.com" },
      { protocol: "https", hostname: "in.usembassy.gov" },
      { protocol: "https", hostname: "mib.gov.in" },
      { protocol: "https", hostname: "logo.svgcdn.com" },
      { protocol: "https", hostname: "toppng.com" },
      { protocol: "https", hostname: "www.logo.wine" },
      { protocol: "https", hostname: "purepng.com" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "wavex.wavesbazaar.com" },
    ],
  },
};

export default nextConfig;
