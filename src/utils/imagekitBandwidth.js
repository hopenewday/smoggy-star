import { setFailoverActive } from './cdnFailoverState.js';

/**
 * Fetch current ImageKit bandwidth usage via REST API.
 * Returns usage in bytes.
 * Implements caching and error fallback.
 */

let cachedBandwidth = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export async function getImageKitBandwidth() {
  const now = Date.now();
  if (cachedBandwidth !== null && (now - lastFetchTime) < CACHE_DURATION_MS) {
    return cachedBandwidth;
  }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const apiEndpoint = 'https://api.imagekit.io/v1/usage/bandwidth';

  try {
    const response = await fetch(apiEndpoint, {
      headers: {
        'Authorization': 'Basic ' + btoa(privateKey + ':'),
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch ImageKit bandwidth:', response.statusText);
      if (cachedBandwidth !== null) {
        console.warn('Using cached bandwidth value due to fetch failure.');
        return cachedBandwidth;
      }
      return 0;
    }

    const data = await response.json();
    const used = data?.bandwidth?.used || 0;
    console.log(`Current ImageKit bandwidth usage: ${(used / (1024 * 1024)).toFixed(2)} MB`);
    cachedBandwidth = used;
    lastFetchTime = now;
    return used;
  } catch (error) {
    console.error('Error fetching ImageKit bandwidth:', error);
    if (cachedBandwidth !== null) {
      console.warn('Using cached bandwidth value due to error.');
      return cachedBandwidth;
    }
    return 0;
  }
}

/**
 * Check if bandwidth is approaching 24GB limit (90% threshold).
 */
export async function isBandwidthLimitApproaching() {
  const usedBytes = await getImageKitBandwidth();
  const limitBytes = 24 * 1024 * 1024 * 1024; // 24GB
  const nearing = usedBytes >= 0.9 * limitBytes;
  if (nearing) {
    console.warn('ImageKit bandwidth nearing limit, failover may be triggered.');
  }
  return nearing;
}

/**
 * Start continuous bandwidth monitoring and update failover state.
 * Call this once during server startup.
 * @param {number} intervalMs - Polling interval in milliseconds (default 5 minutes)
 */
export function startBandwidthMonitor(intervalMs = 5 * 60 * 1000) {
  async function monitorLoop() {
    while (true) {
      try {
        const nearingLimit = await isBandwidthLimitApproaching();
        setFailoverActive(nearingLimit);
      } catch (err) {
        console.error('[BandwidthMonitor] Error during bandwidth check:', err);
      }
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
  }
  monitorLoop();
}