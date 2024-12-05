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
        hostname: "ch-testing.oss-cn-beijing.aliyuncs.com"
      },
      {
        protocol: "https",
        hostname: "brain-testing.oss-cn-beijing.aliyuncs.com"
      },
      {
        protocol: "https",
        hostname: "mind-file.oss-cn-beijing.aliyuncs.com"
      },
    ],
    unoptimized: true,
    domains: ['your-image-domain.com'],
  },
  async rewrites() {
    return [
      // {
      //   source: '/api/proxy-image',
      //   destination: 'https://mind-file.oss-cn-beijing.aliyuncs.com/:path*'
      // }
    ]
  },
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
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
