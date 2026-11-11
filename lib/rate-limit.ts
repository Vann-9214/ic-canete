const WINDOW_MS = 10 * 60 * 1000; // 10 minutes (600,000 ms)
const MAX_REQUESTS = 3;

// Map of IP address -> array of request timestamps (epoch ms)
const ipRequests = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

/**
 * Checks if a given IP address is allowed to submit a request under the sliding-window rate limit.
 * Limits each IP to a maximum of 3 requests per 10-minute window (600,000 ms).
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Retrieve existing timestamps and keep only those within the active 10-minute window
  const timestamps = (ipRequests.get(ip) ?? []).filter((timestamp) => timestamp > windowStart);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldestTimestamp = timestamps[0];
    const retryAfterMs = oldestTimestamp + WINDOW_MS - now;
    const retryAfterSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));

    // Persist filtered timestamps
    ipRequests.set(ip, timestamps);

    return {
      allowed: false,
      retryAfterSeconds,
    };
  }

  // Record this request
  timestamps.push(now);
  ipRequests.set(ip, timestamps);

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

/**
 * Clears all stored rate limit history. Intended for test suites and debugging.
 */
export function resetRateLimits(): void {
  ipRequests.clear();
}
