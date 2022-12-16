/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "avatars.dicebear.com",
            "res.cloudinary.com",
            "firebasestorage.googleapis.com",
        ],
    },
    pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
    },
});
module.exports = nextConfig;