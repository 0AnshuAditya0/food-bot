/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.discordapp.com',  // ← Add this
      'www.themealdb.com'    // ← Keep existing
    ],
  }
}

export default nextConfig