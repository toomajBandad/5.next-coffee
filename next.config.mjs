/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
    },
    images: {
        domains: ["images.unsplash.com", "plus.unsplash.com"],
    },
    // experimental: {
    //     appDir: true,
    //     serverComponentsExternalPackages: ["mongoose"],
    // },
};

export default nextConfig;
