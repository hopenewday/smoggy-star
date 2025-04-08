import ImageKit from "imagekit";
import { isFailoverActive } from './cdnFailoverState.js';

const ASSET_VERSION = process.env.ASSET_VERSION || Date.now();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

/**
 * Generate an optimized image URL with transformations.
 * Falls back to Cloudflare CDN if failover is active.
 * @param {string} path - The image path relative to the endpoint.
 * @param {object} options - Transformation options.
 * @returns {string} - The CDN URL.
 */
export function getOptimizedImageUrl(path, options = {}) {
  if (!isFailoverActive()) {
    return imagekit.url({
      path,
      transformation: [
        {
          format: "avif",
          ...options,
        },
      ],
      transformationPosition: "path",
    });
  } else {
    console.warn(`[Failover] Using Cloudflare CDN for image: ${path}`);
    const cloudflareBase = process.env.CLOUDFLARE_CDN_URL || "";
    const versionSuffix = `?v=${ASSET_VERSION}`;
    return `${cloudflareBase}/${path}${versionSuffix}`;
  }
}