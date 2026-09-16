/**
 * Server-side helpers for the Google Maps Platform.
 *
 * The booking form deliberately talks to these through our own route
 * handlers instead of loading the Maps JavaScript SDK in the browser:
 *  - the API key stays on the server (a `NEXT_PUBLIC_` key is readable by
 *    anyone and has to be protected with referrer restrictions alone),
 *  - and the homepage ships no third-party JS, which is what keeps the
 *    hero's LCP and TBT budgets intact.
 */

// Prefer a server-only key; fall back to the pre-existing public one so the
// Places/Reviews setup that already ships keeps working.
export const MAPS_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY ||
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
  "";

export const hasMapsKey = Boolean(MAPS_API_KEY);

// Bias suggestions around Coimbatore — the company's operating base.
export const SEARCH_BIAS = {
  latitude: 11.0168,
  longitude: 76.9558,
  radiusMeters: 300000,
  regionCode: "in",
};

/**
 * Small fixed-window limiter. These endpoints proxy a metered Google API
 * from an unauthenticated page, so an open proxy would be billable abuse.
 * Per-instance only, which is enough to blunt casual scripted hammering.
 */
const buckets = new Map();

export function rateLimit(key, { limit = 30, windowMs = 60_000 } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now > entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

// Keep the Map from growing without bound on a long-lived server.
if (typeof setInterval === "function") {
  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of buckets) {
      if (now > entry.resetAt) buckets.delete(key);
    }
  }, 300_000);
  sweep.unref?.();
}

export function clientKeyFrom(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}
