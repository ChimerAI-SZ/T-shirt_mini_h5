/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "creamoda.oss-us-west-1.aliyuncs.com"
      },
      {
        protocol: "https",
        hostname: "www.creamoda.ai"
      },
      {
        protocol: "https",
        hostname: "**.aliyuncs.com"
      }
    ]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  generateEtags: true,
  compress: true,
  swcMinify: true,
  staticPageGenerationTimeout: 90,
  pageExtensions: ['tsx', 'ts'],
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  }
}
