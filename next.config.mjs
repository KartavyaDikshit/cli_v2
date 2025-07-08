/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.contentful.com', 'images.ctfassets.net'],
    formats: ['image/webp', 'image/avif'],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;