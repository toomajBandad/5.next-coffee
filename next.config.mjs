/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  // swcMinify: false,   I remove it because of Next warning in 28/9
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
  // turbopack: {                   //comment for deploy
  //   root: "C:/Users/Toomaj/Desktop/Proyectos/5.next-coffee", // absolute path
  // },

  // experimental: {
  //     appDir: true,
  //     serverComponentsExternalPackages: ["mongoose"],
  // },
};

export default nextConfig;
