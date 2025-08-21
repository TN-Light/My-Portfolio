
import type {NextConfig} from 'next';

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || undefined;

const nextConfig: NextConfig = {
  assetPrefix,
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
