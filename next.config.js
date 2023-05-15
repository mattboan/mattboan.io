/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.resolve(__dirname, 'src/styles')],
    },
    images: {
        domains: ['xovjhtjkytzursvsbvbp.supabase.co'],
        formats: ['image/avif', 'image/webp'],
    },
};

module.exports = nextConfig;
