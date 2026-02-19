/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    // Turbopack expects an absolute path for `root` — use the current working directory.
    root: process.cwd(),
  },
}

export default nextConfig
