/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "e-comarce-website.vercel.app", // 👈 add this here
    ],
  },
};

module.exports = nextConfig;
