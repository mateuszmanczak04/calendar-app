/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  env: {
    MONGO_URI:
      'mongodb+srv://Mateusz:NGDxHuFvInb67G8N@cluster0.mr0mbnp.mongodb.net/calendar-app?retryWrites=true&w=majority',
    NEXTAUTH_SECRET: 'ZtFmg7tF2mbvhLj',
  },
};

module.exports = nextConfig;
