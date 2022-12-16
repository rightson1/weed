/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
});

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
});
module.exports = nextConfig;