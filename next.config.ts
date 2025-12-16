import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "photos.fife.usercontent.google.com",
      "udemy-certificate.s3.amazonaws.com",
    ],
  },
};

export default nextConfig;
