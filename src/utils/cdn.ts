const IMAGEKIT_URL = import.meta.env.PUBLIC_IMAGEKIT_URL || process.env.PUBLIC_IMAGEKIT_URL;
const CLOUDFLARE_URL = import.meta.env.PUBLIC_CLOUDFLARE_URL || process.env.PUBLIC_CLOUDFLARE_URL;
const IMAGEKIT_BANDWIDTH_LIMIT_GB = 25;

let imageKitBandwidthUsedGB = 0; // This should be updated via API or webhook in production

export function getImageUrl(path: string): string {
  if (imageKitBandwidthUsedGB < IMAGEKIT_BANDWIDTH_LIMIT_GB) {
    return `${IMAGEKIT_URL}/${path}`;
  } else {
    return `${CLOUDFLARE_URL}/${path}`;
  }
}

// Example function to update bandwidth usage dynamically
export function updateImageKitBandwidthUsage(gbUsed: number) {
  imageKitBandwidthUsedGB = gbUsed;
}