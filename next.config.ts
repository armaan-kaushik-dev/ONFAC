import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';

// Without this, Turbopack walks up to C:\Users\DELL, finds a stray
// package-lock.json outside the repo, and warns on every start.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: projectRoot },
  // Dev double-invoke disposes R3F GPU resources while memoised values survive,
  // which renders the hero model black in dev only.
  reactStrictMode: false,
  // Lets `npm run build` and `next dev` coexist without clobbering .next chunks.
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  images: {
    // Unsplash resizes on its own CDN — see src/lib/unsplash-loader.ts.
    loader: 'custom',
    loaderFile: './src/lib/unsplash-loader.ts',
  },
};

export default nextConfig;
