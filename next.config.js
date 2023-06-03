/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.resolve(__dirname, 'src/styles')],
    },
};

module.exports = nextConfig;
