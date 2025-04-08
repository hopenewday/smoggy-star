/**
 * Global CDN failover state manager.
 * Maintains whether failover to Cloudflare is active.
 */

let failoverActive = false;
let failoverListeners = [];

/**
 * Get current failover status.
 * @returns {boolean}
 */
export function isFailoverActive() {
  return failoverActive;
}

/**
 * Set failover status.
 * @param {boolean} status
 */
export function setFailoverActive(status) {
  failoverActive = status;
  console.log(`[CDN Failover] Failover is now ${status ? 'ACTIVE' : 'INACTIVE'}`);
  failoverListeners.forEach(listener => listener(status));
}
export function addFailoverListener(listener) {
  failoverListeners.push(listener);
}

export function removeFailoverListener(listener) {
  failoverListeners = failoverListeners.filter(l => l !== listener);
}