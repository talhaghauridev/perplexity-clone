import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  transpilePackages: ['@t3-oss/env-nextjs', '@t3-oss/env-core'],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
