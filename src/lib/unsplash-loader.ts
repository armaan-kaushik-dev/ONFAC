'use client';

import type { ImageLoaderProps } from 'next/image';

/**
 * Unsplash is already an imgix-backed CDN, so hand the resizing to it instead
 * of pulling 1600px originals through Next's optimizer and re-encoding them.
 * The dev optimizer was returning 500s under the load of ~26 concurrent images.
 *
 * Anything not on images.unsplash.com passes through untouched.
 */
export default function unsplashLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith('https://images.unsplash.com/')) return src;

  const url = new URL(src);
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', String(quality ?? 75));
  return url.toString();
}
