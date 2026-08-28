/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "image.tmdb.org",
                port: "",
                pathname: "/**",
            },
        ],
    },
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
};
module.exports = nextConfig;