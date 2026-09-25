import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This project sits beside the Expo app rather than inside it. Pinning the trace
  // root keeps Next from walking up into the sibling trees if it ever finds another
  // lockfile above this directory.
  outputFileTracingRoot: __dirname,
  // three/drei ship ESM that older bundler defaults choke on; Next handles it when told.
  transpilePackages: ['three'],
  async headers() {
    return [
      {
        // The APK is immutable once published — let the CDN keep it, and make the
        // browser download it rather than trying to render it.
        source: '/drikr.apk',
        headers: [
          { key: 'Content-Type', value: 'application/vnd.android.package-archive' },
          { key: 'Content-Disposition', value: 'attachment; filename="drikr.apk"' },
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
